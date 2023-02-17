<!-- MainTemplate 
       This is the main layout of the page the page foolows this format -->
<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title> Quasar App </q-toolbar-title>

        <div>Quasar v{{ $q.version }}</div>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
      <q-list>
        <q-item-label header> Essential Links </q-item-label>
        <!-- EssentialLinks
           - EssentialLink is the information for the sidebar of this application 
           - it contains all the essential links such as the mytasks, deltedtasks, finishedtasks-->
        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>
    <!-- RouterView
           - The RouterView is where you the elements from the pages would be shown-->
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref } from "vue";
import EssentialLink from "components/EssentialLink.vue";

const linksList = [
  {
    title: "My Tasks",
    caption: "List of unfinished tasks",
    icon: "task",
    route_name: "my-tasks",
  },
  {
    title: "Finished Tasks",
    caption: "List of finished tasks",
    icon: "check_circle_outline",
    route_name: "finished-tasks",
  },
  {
    title: "Deleted Tasks",
    caption: "List of deleted tasks",
    icon: "delete_outline",
    route_name: "deleted-tasks",
  },
];

export default defineComponent({
  name: "MainLayout",

  components: {
    EssentialLink,
  },

  setup() {
    const leftDrawerOpen = ref(false);

    return {
      essentialLinks: linksList,
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
    };
  },
});
</script>
