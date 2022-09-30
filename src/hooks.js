import { computed } from "vue";
import { auth } from "./auth";

export function useIsLoggedIn() {
  const isLoggedIn = computed(() => Boolean(auth.user));
  return isLoggedIn;
}

export function useUser() {
  return auth.user;
}
