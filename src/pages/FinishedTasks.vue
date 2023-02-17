<script setup>
// Import Function:
// - The purpose of this code is to import the files from the mytasks file into the deletedtasks file
import { MyTasks, FinishedTasks } from "../composables/Tasks";
</script>

<template>
  <div class="flex justify-center">
    <div class="full-width q-pa-xl">
      <h6 class="q-my-none q-mb-md">Finished Tasks</h6>
      <div class="q-mt-xl">
        <q-card v-for="row in FinishedTasks" :key="row.id" class="q-mt-sm">
          <q-card-section class="bg-primary text-white q-pa-none">
            <div class="text-bold q-pa-md">{{ row.todo }}</div>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </div>
</template>
