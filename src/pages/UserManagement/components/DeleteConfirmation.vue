<template>
  <div class="user-delete width-300">
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
      :class="`text-semibold text-32 q-my-none ${
        $q.screen.width < 768 ? 'q-mb-sm' : 'q-mb-xl'
      }`"
    >
      Confirm Deletion
    </h4>
    <div class="full-width text-left">
      <label>Password</label>
    </div>
    <q-input
      dense
      borderless
      v-model="password"
      :rules="[(val) => !!val || '']"
      hide-bottom-space
      placeholder="Enter Password"
      class="pt-input-field standard dialog-input pt-border-radius-10 q-mt-sm q-mb-md"
    />
    <q-btn
      @click="deleteUser()"
      flat
      no-caps
      label="Proceed"
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
import {
  DeleteUser,
  UserDelete,
  ValidatePassword,
} from "../../../composables/UserManagement";
export default {
  setup() {
    const $q = useQuasar();
    const store = useStore();
    let btnLoadingState = ref(false);
    const closeDialog = () => {
      TogglePmDialogState();
    };

    let password = ref(null);

    const deleteUser = () => {
      btnLoadingState.value = true;
      ValidatePassword({
        password: password.value,
        level: UserDelete.value.level,
      }).then((response) => {
        if (response.status === "success") {
          btnLoadingState.value = true;
          DeleteUser({ id: UserDelete.value.id }).then((response) => {
            let status = Boolean(response.status === "success");
            $q.notify({
              position: $q.screen.width < 767 ? "top" : "bottom-right",
              classes: `${
                status ? "pt-success-notif" : "pt-error-notif"
              } q-px-lg q-pt-none q-pb-none`,
              html: true,
              message: status
                ? `<div class="text-bold">User has been deleted successfully!</div>`
                : `<div class="text-bold">Failed!</div> User with records cannot be deleted.`,
            });
            btnLoadingState.value = false;
          });
          TogglePmDialogState();
        } else {
          $q.notify({
            position: $q.screen.width < 767 ? "top" : "bottom-right",
            classes: "pt-error-notif q-px-lg q-pt-none q-pb-none",
            html: true,
            message: `<div class="text-bold">Failed!</div> ${response.message}.`,
          });
        }

        btnLoadingState.value = true;
      });
    };

    return {
      btnLoadingState,
      closeDialog,
      deleteUser,
      password,
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
