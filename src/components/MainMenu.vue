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
        <q-expansion-item>
          <template v-slot:header>
            <q-item-section avatar class="margin-left-10">
              <q-icon name="iconfont icon-delete-fill" class="list-icon" />
            </q-item-section>
            <q-item-section class="list-text pm-text-primary">
              Trash
            </q-item-section>
          </template>
          <!-- O.R Ranges -->
          <q-item clickable v-ripple :to="{ name: 'trash-or-ranges' }">
            <q-item-section avatar class="margin-left-10">
              <i class="empty"></i>
            </q-item-section>
            <q-item-section class="list-text pm-text-primary"
              >O.R Ranges</q-item-section
            >
          </q-item>
          <!-- RCD -->
          <q-item clickable v-ripple :to="{ name: 'trash-rcd' }">
            <q-item-section avatar class="margin-left-10">
              <i class="empty"></i>
            </q-item-section>
            <q-item-section class="list-text pm-text-primary"
              >RCD</q-item-section
            >
          </q-item>
          <!-- Logbook -->
          <q-item clickable v-ripple :to="{ name: 'trash-logbook' }">
            <q-item-section avatar class="margin-left-10">
              <i class="empty"></i>
            </q-item-section>
            <q-item-section class="list-text pm-text-primary"
              >Logbook</q-item-section
            >
          </q-item>
          <!-- RCI -->
          <q-item clickable v-ripple :to="{ name: 'trash-rci' }">
            <q-item-section avatar class="margin-left-10">
              <i class="empty"></i>
            </q-item-section>
            <q-item-section class="list-text pm-text-primary"
              >RCI</q-item-section
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
