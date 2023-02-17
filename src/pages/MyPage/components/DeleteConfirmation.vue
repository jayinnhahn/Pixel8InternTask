<template>
  <div class="width-300">
    <h4
      :class="`text-semibold text-32 q-my-none ${
        $q.screen.width < 768 ? 'q-mb-sm' : 'q-mb-xl'
      }`"
    >
      Delete Goal
    </h4>
    <p class="text-24 text-weight-light">
      Are you sure you want to delete this goal?
    </p>
    <q-btn
      @click="deleteChuChu()"
      flat
      label="OK"
      dense
      :class="`pt-bg-accent-0 full-width q-py-sm q-mb-s pt-border-radius-${
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

<script>
import { useStore } from "vuex";
import { useQuasar } from "quasar";
import { ref } from "vue";
import { TogglePmDialogState } from "../../../composables/Triggers";
// import { IDList } from "../../../composables/IDS";
export default {
  setup() {
    const $q = useQuasar();
    const store = useStore();
    let btnLoadingState = ref(false);
    const closeDialog = () => {
      TogglePmDialogState();
    };

    const deleteChuChu = () => {
      // Delete function from composable file
      // DeleteChuChu(IDList.value);
      // close dialog after deletion
      TogglePmDialogState();
    };

    return {
      btnLoadingState,
      closeDialog,
      deleteChuChu,
    };
  },
};
</script>
