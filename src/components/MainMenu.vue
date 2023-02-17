<template>
  <!-- START OF MENU TABLE -->
  <div class="main-menu q-mt-md">
    <div class="pt-menu-scroll">
      <q-list>
        <!-- USER MANAGEMENT -->
        <q-item clickable v-ripple :to="{ name: 'users' }">
          <q-item-section avatar class="margin-left-10">
            <q-icon name="iconfont icon-user-management-fill" class="list-icon" />
          </q-item-section>
          <q-item-section class="list-text pt-text-primary">User Management</q-item-section>
        </q-item>
        <q-item clickable v-ripple :to="{ name: 'or-numbers' }">
          <q-item-section avatar class="margin-left-10">
            <q-icon name="iconfont icon-user-management-fill" class="list-icon" />
          </q-item-section>
          <q-item-section class="list-text pt-text-primary">O.R. Numbers</q-item-section>
        </q-item>

        <q-expansion-item>
          <template v-slot:header>
            <q-item-section avatar class="margin-left-10">
              <q-icon name="iconfont icon-task-list-fill" class="list-icon" />
            </q-item-section>
            <q-item-section class="list-text pm-text-primary">
              Settings
            </q-item-section>
          </template>
          <!-- SETTINGS RPT ALLOCATION -->
          <q-item clickable v-ripple :to="{ name: 'rpt-allocation' }">
            <q-item-section avatar class="margin-left-10">
              <i class="empty"></i>
            </q-item-section>
            <q-item-section class="list-text pm-text-primary"
              >RPT Allocation</q-item-section
            >
          </q-item>
        </q-expansion-item>


      </q-list>
      <div class="absolute-bottom">
        <q-list>
          <q-item class="logout-item" clickable v-ripple>
            <q-item-section avatar>
              <q-icon name="logout" class="list-icon" />
            </q-item-section>
            <q-item-section class="list-text pt-text-primary">Logout</q-item-section>
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
