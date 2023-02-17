<template>
  <q-layout view="lHr LpR fFf" :class="DarkMode && 'pt-dark-mode'">
    <Header />
    <MobileSideBar />
    <LeftSideBar />
    <q-page-container>
      <div class="app-wrapper pt-bg-secondary q-pl-lg">
        <router-view />
      </div>
    </q-page-container>
    <PageLoader />
  </q-layout>
</template>

<script>
import Header from "./components/Header.vue";
import LeftSideBar from "./components/LeftSideBar.vue";
import PageLoader from "./components/PageLoader.vue";
import MobileSideBar from "./components/MobileSideBar.vue";
import { FetchUser } from "../composables/UserManagement";
import { TogglePageLoader } from "../composables/MainLayout";
// import { DarkMode } from 'src/core/composables/Triggers';
import { LocalStorage } from "quasar";
import { ref } from "vue";
export default {
  components: { Header, LeftSideBar, MobileSideBar, PageLoader },
  setup() {
    /**
     * Fetch the user information everytime the page is reloaded
     */
    // TogglePageLoader(true);
    // FetchUser().then((response) => {
    //   response.status === "success" && TogglePageLoader(false);
    // });

    // DarkMode.value = LocalStorage.getItem('_DarkMode');
    let DarkMode = ref(false);
    return { DarkMode };
  },
};
</script>

<style lang="scss" scoped>
.app-wrapper {
  overflow: hidden;
  @media only screen and (max-width: 767px) {
    padding: 0px !important;
  }
}
</style>
