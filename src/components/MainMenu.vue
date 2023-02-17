<template>
  <!-- START OF MENU TABLE -->
  <div class="main-menu q-mt-md">
    <div class="pt-menu-scroll">
      <q-list>
        <!-- USER MANAGEMENT -->
        <q-item clickable v-ripple :to="{ name: 'users' }">
          <q-item-section avatar class="margin-left-10">
            <q-icon
              name="iconfont icon-user-management-fill"
              class="list-icon"
            />
          </q-item-section>
          <q-item-section class="list-text pt-text-primary"
            >User Management</q-item-section
          >
        </q-item>
        <q-item clickable v-ripple :to="{ name: 'or-numbers' }">
          <q-item-section avatar class="margin-left-10">
            <q-icon
              name="iconfont icon-user-management-fill"
              class="list-icon"
            />
          </q-item-section>
          <q-item-section class="list-text pt-text-primary"
            >O.R. Numbers</q-item-section
          >
        </q-item>

        <!-- ACTIVITY LOGS -->
        <q-item clickable v-ripple :to="{ name: 'activity-logs' }">
          <q-item-section avatar class="margin-left-10">
            <q-icon name="help" class="list-icon" />
          </q-item-section>
          <q-item-section class="list-text pt-text-primary"
            >Activity Logs</q-item-section
          >
        </q-item>
      </q-list>

      <div class="absolute-bottom">
        <q-list>
          <q-item class="logout-item" clickable v-ripple>
            <q-item-section avatar>
              <q-icon name="logout" class="list-icon" />
            </q-item-section>
            <q-item-section class="list-text pt-text-primary"
              >Logout</q-item-section
            >
          </q-item>
        </q-list>
      </div>
    </div>
  </div>

  <!-- END OF MENU -->
</template>

<script>
import { ref, computed } from "vue";
export default {
  setup() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
//IMPORTING SCSS STYLE
@import "../css/components/MainMenu.scss";
</style>
