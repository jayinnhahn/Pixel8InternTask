<template>
  <div class="user-delete width-300">
    <div class="full-width flex justify-center">
      <div class="pt-border-radius-10 bg-white width-auto q-pa-sm">
        <q-icon name="iconfont icon-delete-fill" class="pt-text-accent-0" size="30px" />
      </div>
    </div>
    <h4 :class="`text-semibold text-32 q-my-none ${$q.screen.width < 768 ? 'q-mb-sm' : 'q-mb-md'
    }`">
      Permanently Delete?
    </h4>
    <div class="full-width q-mb-md">
      <div>The following will be deleted forever</div>
    </div>
    <q-btn @click="deleteData()" flat no-caps label="Yes, Im sure" dense :class="`pt-bg-accent-0 text-black full-width q-py-sm q-mb-s pt-border-radius-${$q.screen.width < 768 ? '10' : '50'
    }`" />
    <div @click="closeDialog()" class="full-width q-py-sm cursor-pointer text-14">
      Cancel
    </div>
  </div>
</template>

<script>
import { useStore } from "vuex";
import { useQuasar } from "quasar";
import { ref } from "vue";
import { TogglePmDialogState } from "../../../../composables/Triggers";
export default {
  setup() {
    const $q = useQuasar();
    const store = useStore();
    let btnLoadingState = ref(false);
    const closeDialog = () => {
      TogglePmDialogState();
    };

    const showNotify = () => {
      let status = true;
      $q.notify({
        position: $q.screen.width < 767 ? "top" : "bottom-right",
        classes: `${status ? "pt-success-notif" : "pt-error-notif"
          } q-px-lg q-pt-none q-pb-non`,
        html: true,
        message: status
          ? `<div class="text-bold">O.R Ranges Trash deleted permanently!</div> O.R Ranges has been deleted permanently.`
          : `<div class="text-bold">Failed!</div>.`,
      });
    };

    const deleteData = (data) => {
      TogglePmDialogState();
      showNotify();
    }

    return {
      btnLoadingState,
      closeDialog,
      deleteData
    };
  },
};
</script>
<style lang="scss">
.user-delete {
  .width-auto {
    width: auto;
    min-width: 0;
    display: table;
  }

  .dialog-input {
    ::placeholder {
      opacity: 1;
      color: #727272;
    }

    .q-field__native {
      color: #fff !important;
    }

    color: white !important;
    border: solid 1px white;
    width: 100%;
    position: relative;

    .q-field__bottom {
      min-height: 0;
      padding: 0;
    }
  }
}
</style>
