<template>
  <div class="left-drawer">
    <q-drawer
      :width="
        $q.screen.width < 768
          ? 324
          : $q.screen.width === 768
          ? 61
          : $q.screen.width > 1919
          ? 106
          : 75
      "
      show-if-above
      :behavior="$q.screen.width < 768 ? 'mobile' : 'desktop'"
      v-model="leftDrawerOpen"
    >
      <!-- Tablet to Laptop Devices -->
      <div class="side-nav pt-bg-primary gt-xs" v-if="$q.screen.width >= 768">
        <div class="nav-body">
          <div class="logo">
            <img
              src="../../assets/img/left-side-bar-logo.png"
              alt=""
              class="bg-white"
            />
          </div>
          <div class="btnGroup">
            <q-btn
              :to="{ name: 'home' }"
              flat
              icon="iconfont icon-home-fill"
              class="btnHome pt-text-primary"
            />
            <q-btn
              :disable="!IsAllowed.responded"
              v-if="$q.screen.width > 1023"
              :to="{
                name: `${
                  IsAllowed.projects
                    ? 'projects'
                    : IsAllowed.userManagement
                    ? 'users'
                    : 'home'
                }`,
              }"
              flat
              icon="iconfont icon-burger-menu-line"
              class="btnMenu pt-text-accent-0"
            />
            <q-btn
              v-else
              @click="ToggleLeftDrawer()"
              flat
              icon="iconfont icon-burger-menu-line"
              class="btnMenu pt-text-accent-0"
            />
            <div class="lblMenu pt-text-primary">menu</div>
          </div>
        </div>
      </div>
    </q-drawer>
  </div>
</template>

<script>
import { ToggleLeftDrawer } from "../../composables/Triggers";
import { IsAllowed } from "../../composables/UserManagement";
import { ref } from "vue";
import { useQuasar } from "quasar";
export default {
  setup() {
    const $q = useQuasar();
    let leftDrawerOpen = ref($q.screen.width > 767 ? true : false);
    return {
      ToggleLeftDrawer,
      leftDrawerOpen,
      IsAllowed,
    };
  },
};
</script>

<style lang="scss">
@import "../styles/LeftSideBar.scss";
</style>
