<template>
  <h1 class="text-2xl mb-5 text-center">Register page</h1>
  <form
    @submit.prevent="handleRegister()"
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
      Have an account?
      <router-link to="/login" class="font-bold">Sign in</router-link>
    </span>
  </form>
</template>

<script>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { supabase } from "../supabase";

export default {
  setup() {
    const router = useRouter();
    const email = ref();
    const password = ref();
    const errorMessage = ref();
    async function handleRegister() {
      const { error, user } = await supabase.auth.signUp({
        email: email.value,
        password: password.value,
      });

      if (error) {
        errorMessage.value = error.message;
      } else if (user) {
        router.push({ name: "login" });
      }

      setTimeout(() => {
        errorMessage.value = undefined;
      }, 3000);
    }

    return { handleRegister, email, password, errorMessage };
  },
};
</script>
