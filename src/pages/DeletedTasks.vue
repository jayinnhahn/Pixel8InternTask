<script setup>
// Import Function:
// - The purpose of this code is to import the files from the mytasks file into the deletedtasks file
import { MyTasks, DeletedTasks } from "../composables/Tasks";
</script>

<template>
  <!-- 
    Template File:
    - The main purpose of this html file is to show all the deleted tasks from the mytasks page
    = It has certain functions such as a for loop to show all the deleted tasks in the mytasks page -->
  <div class="flex justify-center">
    <div class="full-width q-pa-xl">
      <h6 class="q-my-none q-mb-md">Deleted Tasks</h6>
      <div class="q-mt-xl">
        <q-card v-for="row in DeletedTasks" :key="row.id" class="q-mt-sm">
          <q-card-section class="bg-primary text-white q-pa-none">
            <div class="text-bold q-pa-md">{{ row.todo }}</div>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </div>
</template>
