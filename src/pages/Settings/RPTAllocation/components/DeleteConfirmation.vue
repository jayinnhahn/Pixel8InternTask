<script setup>
  import { useStore } from "vuex";
  import { useQuasar } from "quasar";
  import { ref } from "vue";
  import { TogglePmDialogState } from "../../../../composables/Triggers";
  import { useRouter, useRoute } from "vue-router";

  const $q = useQuasar();
  const router = useRouter();
  const store = useStore();
  let btnLoadingState = ref(false);
  const closeDialog = () => {
    TogglePmDialogState();
  };

  const deleteRPTAllocation = () => {
    btnLoadingState.value = true;
    let status = true;
    status === true && router.go(-1)
    $q.notify({
      position: $q.screen.width < 767 ? "top" : "bottom-right",
      classes: `${
        status ? "pt-success-notif" : "pt-error-notif"
      } q-px-lg q-pt-none q-pb-none`,
      html: true,
      message: status
        ? `<div class="text-bold">RPT Allocation deleted successfully</div> <div class="text-black">Real Property Tax Allocation has been deleted</div>`
        : `<div class="text-bold">Failed!</div> message here.`,
    });
    closeDialog();
  };
</script>

<template>
  <div class="cash-deposit-delete width-300">
    <div class="full-width flex justify-center">
      <div class="pt-border-radius-10 bg-white width-auto q-pa-sm">
        <q-icon
          name="iconfont icon-delete-fill"
          class="pt-text-accent-0"
          size="30px"
        />
      </div>
    </div>
    <h4
      :class="`text-semibold text-32 q-my-none q-mt-sm ${
        $q.screen.width < 768 ? 'q-mb-sm' : 'q-mb-lg'
      }`"
    >
      Are you sure?
    </h4>
    <div
      :class="`text-${$q.screen.width > 600 ? '22' : '13'} text-weight-light`"
    >
      You’re about to delete.
    </div>
    <div
      :class="`text-${
        $q.screen.width > 600 ? '22' : '13'
      } text-semibold q-mb-lg`"
    >
      RPT Allocation
    </div>
    <q-btn
      @click="deleteRPTAllocation()"
      flat
      no-caps
      label="Yes, I'm sure"
      dense
      :class="`pt-bg-accent-0 full-width q-py-sm q-mb-s pt-text-accent-1 pt-border-radius-${
        $q.screen.width < 768 ? '10' : '50'
      }`"
    />
    <div
      @click="closeDialog()"
      class="full-width q-py-sm cursor-pointer text-14"
    >
      Cancel
    </div>
  </div>
</template>
<style lang="scss">
.cash-deposit-delete {
  .width-auto {
    width: auto;
    min-width: 0;
    display: table;
  }
}
</style>
