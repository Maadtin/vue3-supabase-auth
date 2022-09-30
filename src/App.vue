<template>
  <nav v-on:suspend="test" class="text-center p-[30px]">
    <template v-if="!isLoggedIn">
      <router-link class="font-bold text-black" to="/register">
        Register
      </router-link>
      |
      <router-link class="font-bold text-black" to="/login">Login</router-link>
    </template>
    <button
      v-else
      class="bg-indigo-500 py-2 px-2 rounded-sm text-white"
      @click="handleLogout()"
    >
      Logout
    </button>
  </nav>
  <div class="p-5">
    <router-view />
  </div>
</template>

<script>
import { useIsLoggedIn } from "./hooks";
import { useRouter } from "vue-router";
import { auth } from "./auth";
import { supabase } from "./supabase";

export default {
  setup() {
    const router = useRouter();
    const isLoggedIn = useIsLoggedIn();

    supabase.auth.onAuthStateChange((_, session) => {
      auth.user = session ? session.user : null;
    });

    async function handleLogout() {
      await supabase.auth.signOut();
      router.push({ name: "login" });
    }

    return {
      handleLogout,
      isLoggedIn,
    };
  },
};
</script>

<style lang="postcss" scoped>
.router-link-exact-active {
  @apply text-indigo-500;
}
</style>
