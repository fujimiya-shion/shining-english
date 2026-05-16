#!/usr/bin/env bash
set -euo pipefail

IMAGE_NAME="${IMAGE_NAME:-fujimiyashion/shining-english}"
PUSH=false
ENV_FILE=".env.production"

for arg in "$@"; do
  case "$arg" in
    --push)
      PUSH=true
      ;;
    *)
      echo "Unknown argument: $arg" >&2
      echo "Usage: $0 [--push]" >&2
      exit 1
      ;;
  esac
done

if ! command -v git >/dev/null 2>&1; then
  echo "git is required" >&2
  exit 1
fi

if ! command -v docker >/dev/null 2>&1; then
  echo "docker is required" >&2
  exit 1
fi

if [[ ! -f "$ENV_FILE" ]]; then
  echo "${ENV_FILE} is required for build/run packaging" >&2
  exit 1
fi

# Load runtime/build environment from .env.production
set -a
# shellcheck disable=SC1090
source "$ENV_FILE"
set +a

TAG="$(git describe --tags --exact-match 2>/dev/null || git describe --tags --always --dirty)"

if [[ -z "$TAG" ]]; then
  echo "Unable to resolve image tag from git describe" >&2
  exit 1
fi

echo "Building image: ${IMAGE_NAME}:${TAG}"
BUILD_ARGS=(
  "APP_PORT"
  "BACKEND_API_URL"
  "BACKEND_AUTH_LOGIN_PATH"
  "BACKEND_AUTH_LOGOUT_PATH"
  "BACKEND_AUTH_ME_PATH"
  "ACCESS_TOKEN_EMAIL"
  "ACCESS_TOKEN_PASSWORD"
  "PROXY_GUARD_SECRET"
  "PROXY_GUARD_TTL_SECONDS"
  "PROXY_GUARD_REFRESH_THRESHOLD_SECONDS"
  "USER_ACCESS_TOKEN_COOKIE_NAME"
  "USER_ACCESS_TOKEN_COOKIE_TTL_SECONDS"
  "AUTH_ACCESS_TOKEN_MAX_AGE"
  "AUTH_REFRESH_TOKEN_MAX_AGE"
  "NEXT_PUBLIC_BACKEND_PORT"
  "NEXT_PUBLIC_BACKEND_BASE_URL"
  "NEXT_PUBLIC_GOOGLE_CLIENT_ID"
  "NEXT_PUBLIC_RECAPTCHA_SITE_KEY"
  "NEXT_PUBLIC_RECAPTCHA_REGISTER_ACTION"
  "NEXT_PUBLIC_RECAPTCHA_CONTACT_ACTION"
)

DOCKER_BUILD_ARG_FLAGS=()
for arg_name in "${BUILD_ARGS[@]}"; do
  arg_value="${!arg_name:-}"
  DOCKER_BUILD_ARG_FLAGS+=(--build-arg "${arg_name}=${arg_value}")
done

docker build "${DOCKER_BUILD_ARG_FLAGS[@]}" -t "${IMAGE_NAME}:${TAG}" -t "${IMAGE_NAME}:latest" .

if [[ "$PUSH" == "true" ]]; then
  echo "Pushing image: ${IMAGE_NAME}:${TAG}"
  docker push "${IMAGE_NAME}:${TAG}"
  echo "Pushing image: ${IMAGE_NAME}:latest"
  docker push "${IMAGE_NAME}:latest"
fi

echo "Done."
