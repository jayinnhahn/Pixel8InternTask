<template>
  <div>
    <div class="mobile-view relative-position q-px-lg">
      <div
        class="relative-position flex justify-between items-center full-height q-py-lg"
      >
        <div>
          <q-icon
            v-if="MenuBtnState"
            class="bg-amber-4 pt-text-accent-1 pt-border-radius-8 q-pa-xs"
            size="sm"
            name="iconfont icon-burger-menu-line"
            @click="ToggleLeftDrawer()"
          />
          <q-icon
            v-else
            size="sm"
            name="iconfont icon-back-fill"
            class="pt-text-accent-1"
            @click="router.go(-1)"
          />
        </div>
        <div
          :class="`pt-header-content absolute ${
            SearchBtnState ? 'left-right-30' : 'left-right-24'
          }`"
        >
          <component
            :is="content"
            class="full-height flex justify-center items-center"
          />
        </div>
        <div>
          <div class="flex items-center" v-if="SearchBtnState">
            <q-icon
              @click="toggleSearchField()"
              class="bg-amber-4 pt-text-accent-1 pt-border-radius-8 q-pa-xs"
              size="sm"
              name="iconfont icon-search-line"
            />

            <q-input
              placeholder="Search"
              borderless
              autofocus
              dense
              :class="showSearchInput ? 'animate-input' : 'inanimate-input'"
              class="pt-border-accent-0 pt-border-radius-10 transition-02s bg-accent-0 pr-6 q-pl-sm right-0 absolute"
            />
            <q-icon
              @click="toggleSearchField()"
              size="sm"
              :class="showSearchInput ? 'inanimate-opacity' : 'animate-opacity'"
              class="q-pl-md pt-text-accent-1 absolute right-0 magnify"
              name="iconfont icon-search-line"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { ref, shallowRef, watch } from "vue";
import { useRouter, useRoute } from "vue-router";
import {
  ToggleLeftDrawer,
  ToggleFilterDialogState,
  MenuBtnState,
  SearchBtnState,
} from "../composables/Triggers";
import UserManagement from "../pages/UserManagement/components/UserManagementHeader.vue";
export default {
  components: {
    UserManagement,
  },
  setup() {
    const route = useRoute();
    const router = useRouter();
    let showSearchInput = ref(false);
    const toggleSearchField = () => {
      showSearchInput.value = !showSearchInput.value;
    };

    let content = shallowRef(null);
    const setHeaderContent = () => {
      switch (route.name) {
        case "users":
        case "add-user":
          content.value = UserManagement;
          break;
      }
    };

    setHeaderContent();
    watch(route, () => {
      setHeaderContent();
    });

    return {
      router,
      MenuBtnState,
      SearchBtnState,
      showSearchInput,
      toggleSearchField,
      ToggleLeftDrawer,
      ToggleFilterDialogState,
      content,
    };
  },
};
</script>

<style lang="scss">
.pt-dark-mode {
  .mobile-view {
    background-color: #232c40;
  }
}
.mobile-view {
  background-color: #ffbf00;
  height: 80px;
  .opacity-7 {
    opacity: 0.7;
  }
  @media screen and (min-width: 767px) {
    display: none;
  }
  .right-0 {
    right: -1px;
  }
  .pr-6 {
    padding-right: 6px;
  }
  .magnify {
    margin-right: 5px;
  }
  .inanimate-opacity {
    opacity: 1;
  }
  .animate-opacity {
    transition: 0.5s;
    opacity: 0;
  }
  .inanimate-input {
    width: 24px;
    height: 27px;
    visibility: hidden;
    opacity: 0.8;
    transition: 0.3s;
    .q-field__native {
      display: none;
    }
  }
  .animate-input {
    width: 100%;
    visibility: visible;
    animation-name: input;
    transition: 0.3s;
    @keyframes input {
      from {
        opacity: 0;
      }
      to {
        opacity: 1;
      }
    }
    .q-field__native {
      display: block;
    }
  }
}
</style>
