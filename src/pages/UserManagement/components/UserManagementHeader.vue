<template>
  <div class="row text-center full-width">
    <div class="col-2"></div>
    <div class="col-8 text-center">
      <h5 class="header-title q-my-none text-h6 text-bold text-white">
        {{ title }}
      </h5>
    </div>
    <div class="col-2">
      <q-icon
        v-if="route.name === 'users'"
        class="bg-amber-4 pt-text-accent-1 pt-border-radius-8 q-pa-xs fixed top-right-24"
        size="sm"
        name="iconfont icon-filter-fill"
        @click="ToggleFilterDialogState()"
      />
    </div>
  </div>
</template>
<script>
import { ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import {
  ToggleMenuBtnState,
  ToggleSearchBtnState,
  ToggleFilterDialogState,
} from "../../../composables/Triggers";
export default {
  setup() {
    const route = useRoute();
    const router = useRouter();
    // Page title
    let title = ref("Users");

    const setHeaderTitle = () => {
      switch (route.name) {
        case "users":
          title.value = "Users";
          ToggleMenuBtnState(true);
          ToggleSearchBtnState(false);
          break;
        case "add-user":
          title.value = route.params.id ? "Update User" : "Add User";
          ToggleMenuBtnState(false);
          ToggleSearchBtnState(false);
          break;
      }
    };

    setHeaderTitle();
    watch(route, () => {
      setHeaderTitle();
    });

    return {
      route,
      router,
      title,
      ToggleFilterDialogState,
    };
  },
};
</script>

<style>
.top-right-24 {
  top: 24px;
  right: 24px;
}
</style>
