<template>
  <h1 class="text-2xl mb-5 text-center">Login page</h1>
  <form
    @submit.prevent="handleLogin()"
    class="flex flex-col space-y-3 w-[95%] max-w-[400px] mx-auto text-center"
  >
    <input
      autocomplete="off"
      class="py-2 px-3 border border-1"
      type="text"
      placeholder="Email"
      v-model="email"
    />
    <input
      autocomplete="off"
      class="py-2 px-3 border border-1"
      type="password"
      placeholder="Password"
      v-model="password"
    />
    <span v-if="errorMessage" class="text-md text-red-500">
      {{ errorMessage }}
    </span>
    <button class="py-2 px-3 bg-indigo-500 text-white" type="submit">
      Sign In
    </button>
    <span class="text-indigo-500">
      Don't have an account?
      <router-link to="/register" class="font-bold">Sign up</router-link>
    </span>
  </form>
</template>

<script>
import { onUnmounted, ref } from "vue";
import { useRouter } from "vue-router";
import { supabase } from "../supabase";

export default {
  setup() {
    const email = ref();
    const password = ref();
    const errorMessage = ref();
    const router = useRouter();
    let timeoutId;
    async function handleLogin() {
      const { error, user } = await supabase.auth.signIn({
        email: email.value,
        password: password.value,
      });

      if (error) {
        errorMessage.value = error.message;
      } else if (user) {
        router.push({ name: "dashboard" });
      }

      timeoutId = setTimeout(() => {
        errorMessage.value = undefined;
      }, 3000);
    }

    onUnmounted(() => {
      console.log("unmounting");
      clearTimeout(timeoutId);
    });

    return { handleLogin, email, password, errorMessage };
  },
};
</script>
