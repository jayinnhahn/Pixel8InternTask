<template>
  <q-card
    class="pt-mobile-card pt-border-radius-15 overflow-hidden q-pa-md q-mb-sm"
  >
    <q-card-section class="q-pa-none" @click="showActions = !showActions">
      <div class="text-20">{{ userData.full_name }}</div>
      <div class="flex justify-between">
        <div class="pt-text-accent-2">Level:</div>
        <div>{{ userData.level }}</div>
      </div>
      <div class="flex justify-between">
        <div class="pt-text-accent-2">Role:</div>
        <div>{{ userRole[userData.role] }}</div>
      </div>
      <div class="flex justify-between">
        <div class="pt-text-accent-2">Immediate Supervisor:</div>
        <div>{{ userData.supervisor_name }}</div>
      </div>
    </q-card-section>
    <transition>
      <div
        v-show="showActions"
        class="actions flex absolute-right full-height row"
      >
        <div
          class="col-6 pt-bg-accent-0 flex justify-center items-center"
          @click="$emit('deleteUser')"
        >
          <span class="q-ma-sm text-white text-18">Delete</span>
        </div>
        <div
          class="col-6 bg-teal flex justify-center items-center"
          @click="
            router.push({ name: 'add-user', params: { id: userData.id } })
          "
        >
          <span class="q-ma-sm text-white text-18">Edit</span>
        </div>
      </div>
    </transition>
  </q-card>
</template>
<script>
import { ref } from "vue";
import { useRouter } from "vue-router";
export default {
  props: {
    user: Object,
  },
  emits: ["deleteUser"],
  setup(props) {
    const router = useRouter();
    let userData = ref(props.user);
    let showActions = ref(false);
    // Readable user role
    const userRole = [
      "Admin",
      "Stockholder",
      "CEO",
      "Manager",
      "Supervisor",
      "Employee",
      "External User",
    ];
    return {
      router,
      userData,
      userRole,
      showActions,
    };
  },
};
</script>
