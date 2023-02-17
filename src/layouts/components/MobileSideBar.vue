<template>
  <transition
    appear
    enter-active-class="animated fadeIn"
    leave-active-class="animated fadeOut"
    :duration="2000"
  >
    <div v-show="LeftDrawerState" class="mobile-menu pt-text-primary">
      <transition
        appear
        enter-active-class="animated fadeInLeft"
        leave-active-class="animated fadeOutLeft"
        :duration="1000"
      >
        <div v-show="LeftDrawerState" class="sidebar-content pt-bg-primary">
          <div class="sidebar-header relative-position">
            <q-btn
              icon="close"
              flat
              borderless
              class="absolute-top-right close-sidebar"
              @click="ToggleLeftDrawer()"
            />
            <div
              class="q-ml-md q-pa-lg text-white absolute-bottom overflow-hidden"
            >
              <q-avatar size="80px" class="pt-bg-hover-accent-0 q-mb-sm">
                <q-img
                  v-if="LoggedinUser.photo"
                  :src="`data:image/png;base64, ${LoggedinUser.photo}`"
                />
                <q-img
                  v-else
                  :src="
                    require(`src/assets/${
                      !LoggedinUser.sex ? 'male' : 'female'
                    }-avatar.svg`)
                  "
                />
              </q-avatar>
              <h5 class="q-ma-none ellipsis text-20">
                {{ LoggedinUser.full_name }}
              </h5>
              <label>@{{ LoggedinUser.username }}</label>
            </div>
          </div>
          <MainMenu />
        </div>
      </transition>
    </div>
  </transition>
</template>
<script>
import { LeftDrawerState, ToggleLeftDrawer } from "../../composables/Triggers";
// import {GetLoggedInUser} from 'src/core/composables/Authenticate';
import MainMenu from "../../components/MainMenu.vue";
import { useRoute } from "vue-router";
import { watch, computed } from "vue";
export default {
  components: {
    MainMenu,
  },
  setup() {
    const route = useRoute();
    watch(
      () => route.name,
      () => {
        LeftDrawerState.value = false;
      },
      { immediate: true }
    );
    let LoggedinUser = computed(() => {
      // try {
      //   return GetLoggedInUser.value
      // } catch (error) {
      //   return {
      //     photo: null,
      //     sex: null,
      //     full_name: null,
      //     username: null
      //   }
      // }
      return {
        photo: null,
        sex: null,
        full_name: null,
        username: null,
      };
    });
    return {
      ToggleLeftDrawer,
      LeftDrawerState,
      LoggedinUser,
    };
  },
};
</script>
<style lang="scss" scoped>
.mobile-menu {
  z-index: 2;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.7);

  @media screen and (min-width: $breakpoint-sm-max) {
    // 1023
    display: none;
  }

  // .avatar-img {
  //   border-radius: 50%;
  //   border: 2px solid blue;
  //   margin-bottom: 15px;
  // }

  .sidebar-content {
    width: 324px;
    @media screen and (min-width: $breakpoint-sm-min) {
      // 768
      width: 421px;
    }
    .sidebar-header {
      position: relative;
      height: 220px;
      background-color: #ffbf00;
      .close-sidebar {
        color: white;
        margin: 10px 0px 0px 0px;
      }
    }
  }
}
</style>
