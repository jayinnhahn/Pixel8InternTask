<template>
  <div>
    <q-header class="pt-header pt-bg-secondary">
      <div>
        <MobileHeader />
        <!-- <div class="mobile-view row items-center justify-between q-px-md">
        <div><q-icon class="cursor-pointer pt-text-primary pt-text-hover-accent-0 opacity-7 q-my-lg" size="sm" name="iconfont icon-arrow-left" /></div>
        <div class="text-23">User Management</div>
        <div><q-icon class="cursor-pointer pt-text-primary pt-text-hover-accent-0 opacity-7" size="sm" name="iconfont icon-add" /></div>
        </div> -->
        <div class="tablet-desktop-view row justify-between q-px-lg q-py-md">
          <div class="col-8 col-md-5 flex items-center">
            <q-input
              class="full-width main-search"
              dense
              borderless
              placeholder="Search Filter..."
            >
              <template v-slot:prepend>
                <q-icon class="q-pl-md pt-text-accent-0" name="search" />
              </template>
            </q-input>
          </div>
          <div class="col-4 col-md-6">
            <div class="row items-center pt-text-accent-0 justify-end">
              <div class="tablet-materials col-auto q-pr-sm">
                <q-icon
                  class="pt-pt-text-accent-1 pt-text-hover-accent-1 pt-bg-hover-accent-0"
                  name="iconfont icon-activity"
                  size="sm"
                />
              </div>
              <div class="tablet-materials col-auto q-pr-sm">
                <q-icon
                  class="pt-pt-text-accent-1 pt-text-hover-accent-1 pt-bg-hover-accent-0 relative-postion"
                  name="iconfont icon-notification"
                  size="sm"
                >
                  <div
                    class="absolute bg-white notification-container shadow-3 q-px-xs q-py-sm"
                  >
                    <div
                      class="flex justify-between q-px-xs items-center text-10"
                    >
                      <div class="text-primary">Notification</div>
                      <div class="pt-text-accent-1">See all</div>
                    </div>
                    <div
                      class="flex justify-between text-10 q-mt-xs q-pa-xs pt-bg-hover-accent-4"
                    >
                      <div class="text-left">
                        <div class="pt-text-accent-1">
                          I just read your message.
                        </div>
                        <div class="pt-text-accent-0 q-mt-xs text-9">
                          David Lee
                        </div>
                      </div>
                      <span class="ellipse pt-bg-accent-0 float-right"></span>
                    </div>
                    <div
                      class="flex justify-between text-10 q-mt-xs q-pa-xs pt-bg-hover-accent-4"
                    >
                      <div class="text-left">
                        <div class="pt-text-accent-1">
                          I just read your message.
                        </div>
                        <div class="pt-text-accent-0 q-mt-xs text-9">
                          David Lee
                        </div>
                      </div>
                      <span class="ellipse pt-bg-accent-0 float-right"></span>
                    </div>
                  </div>
                </q-icon>
              </div>
              <div
                class="avatar col-auto cursor-pointer relative-position flex justify-between items-center"
              >
                <div>
                  <q-avatar class="pt-bg-hover-accent-0">
                    <q-img
                      v-if="GetLoggedInUser.photo"
                      :src="`data:image/png;base64, ${GetLoggedInUser.photo}`"
                    />
                    <q-img
                      v-else
                      :src="
                        require(`src/assets/${
                          !GetLoggedInUser.sex ? 'male' : 'female'
                        }-avatar.svg`)
                      "
                    />
                  </q-avatar>
                </div>
                <div class="desktop-materials">
                  <q-icon
                    class="q-pa-none pt-text-primary"
                    size="sm"
                    name="expand_more"
                  />
                </div>
                <div class="profile-container absolute">
                  <div
                    class="content bg-white q-px-xs q-py-md shadow-3 text-12 pt-text-accent-1"
                  >
                    <div class="q-px-xs">Account</div>
                    <div class="text-bold q-mt-sm">
                      <div
                        @click="
                          router.push({
                            name: 'core-profile',
                            params: { id: GetLoggedInUser.id },
                          })
                        "
                        class="q-px-xs q-py-xs pt-bg-hover-accent-4 cursor-pointer"
                      >
                        My Profile
                      </div>
                      <div
                        @click="logout()"
                        class="q-px-xs q-py-xs pt-bg-hover-accent-4 cursor-pointer"
                      >
                        Logout
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </q-header>
  </div>
</template>

<script>
import { ref } from "vue";
import { useStore } from "vuex";
import { useQuasar } from "quasar";
import { useRouter } from "vue-router";
import MobileHeader from "../../components/MobileHeader.vue";
// import {LogoutUser, GetLoggedInUser} from 'src/core/composables/Authenticate';
export default {
  components: {
    MobileHeader,
  },
  setup() {
    const store = useStore();
    const $q = useQuasar();
    const router = useRouter();

    const logout = () => {
      // LogoutUser({}).then((response) => {
      // 		let status = Boolean(response.status === 'success');
      // 		status && router.replace({ name: 'core-login' });
      // 		$q.notify({
      // 			position: $q.screen.width < 767 ? 'top' : 'bottom-right',
      // 			classes: `${status ? 'pt-success-notif' : 'pt-error-notif'} q-px-lg q-pt-none q-pb-none`,
      // 			html: true,
      // 			message: status
      // 				? `<div class="text-bold">You have been logged out!</div>`
      // 				: `<div class="text-bold">Failed!</div> ${response.message}.`,
      // 		});
      // 	})
      // 	.catch((error) => {
      // 		console.log(error);
      // 		$q.notify({
      // 			position: 'top-right',
      // 			message: 'API Error: Please try again.',
      // 		});
      // 	});
    };
    let GetLoggedInUser = ref(null);
    GetLoggedInUser.value = {
      id: null,
      photo: null,
      sex: null,
    };
    return { logout, GetLoggedInUser, router };
  },
};
</script>

<style lang="scss">
@import "../styles/Header.scss";
</style>
