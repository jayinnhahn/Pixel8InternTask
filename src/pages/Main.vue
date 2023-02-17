<template>
  <div class="row">
    <div class="col-12 col-sm-12 col-md-3" v-if="$q.screen.width >= 1024">
      <div class="pt-menu pt-bg-primary pt-text-primary side full-height">
        <div class="content">
          <div class="q-py-md q-pl-md">
            <h5 class="text-28 text-weight-medium q-my-none q-ml-md q-mt-md">
              Menu
            </h5>
          </div>
          <MainMenu />
        </div>
      </div>
    </div>
    <div class="col-12 col-sm-12 col-md-9" :class="`${$q.screen.width >= 768 && 'q-pr-lg'} ${$q.screen.width >= 1024 && 'q-pl-md'
    }`">
      <div class="main pt-bg-primary relative-position">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
import MainMenu from "../components/MainMenu.vue";
import { useQuasar } from "quasar";
import { useRoute } from "vue-router";
import { ref } from "vue";
export default {
  components: {
    MainMenu,
  },
  setup() {
    const $q = useQuasar();
    const route = useRoute();

    $q.screen.setSizes({ md: 767 });
    return {};
  },
};
</script>

<style lang="scss">
.side,
.main {
  height: calc(100vh - 80px);

  @media only screen and (max-width: 767px) {
    overflow-y: scroll;
  }

  @media only screen and (min-width: 768px) {
    border-radius: 15px 15px 0px 0px;
  }
}
</style>
