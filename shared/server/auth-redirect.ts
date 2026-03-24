import "server-only";

import { redirect } from "next/navigation";
import { getCurrentUser } from "@/shared/server/current-user";

export async function redirectIfAuthenticated(target = "/profile"): Promise<void> {
  const currentUser = await getCurrentUser();

  if (currentUser.authenticated) {
    redirect(target);
  }
}

export async function requireAuthenticatedUser(target = "/login") {
  const currentUser = await getCurrentUser();

  if (!currentUser.authenticated) {
    redirect(target);
  }

  return currentUser;
}
