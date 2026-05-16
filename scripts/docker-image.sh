#!/usr/bin/env bash
set -euo pipefail

IMAGE_NAME="${IMAGE_NAME:-fujimiyashion/shining-english}"
PUSH=false

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

TAG="$(git describe --tags --exact-match 2>/dev/null || git describe --tags --always --dirty)"

if [[ -z "$TAG" ]]; then
  echo "Unable to resolve image tag from git describe" >&2
  exit 1
fi

echo "Building image: ${IMAGE_NAME}:${TAG}"
docker build -t "${IMAGE_NAME}:${TAG}" -t "${IMAGE_NAME}:latest" .

if [[ "$PUSH" == "true" ]]; then
  echo "Pushing image: ${IMAGE_NAME}:${TAG}"
  docker push "${IMAGE_NAME}:${TAG}"
  echo "Pushing image: ${IMAGE_NAME}:latest"
  docker push "${IMAGE_NAME}:latest"
fi

echo "Done."
