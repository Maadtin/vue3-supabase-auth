<template>
  <h1 class="text-3xl mb-5">Dashboard</h1>
  <div class="flex flex-col space-y-5">
    <p class="text-xl">
      {{ user.email }}
    </p>
    <p class="text-xl">
      Last sign in at: {{ new Date(user.last_sign_in_at).toLocaleString() }}
    </p>
  </div>
</template>

<script>
import { useUser } from "@/hooks";

export default {
  setup() {
    const user = useUser();

    return {
      user,
    };
  },
};
</script>
