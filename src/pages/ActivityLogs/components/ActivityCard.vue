<template>
  <!-- q-card
  This is where I put the data found in the rows -->
  <q-card
    flat
    class="pt-mobile-card pt-border-radius-15 overflow-hidden q-ma-md no-shadow pt-border-accent-0"
  >
    <div class="pt-bg-accent-0">
      <div class="flex justify-between q-pa-md items-center">
        <div class="date text-20 text-weight-medium" flat>
          {{ ActivityData.time_date }}
        </div>
      </div>
    </div>
    <div class="q-pa-md">
      <div class="flex justify-between">
        <div class="pt-text-accent-2 q-mb-md">{{ ActivityData.activity }}</div>
      </div>
    </div>
  </q-card>
</template>

<script>
import { ref } from "vue";
// import the loglist from the composables to have the data needed
export default {
  props: {
    activity: Object,
  },
  setup(props) {
    let ActivityData = ref(props.activity);
    console.log(ActivityData);
    return {
      ActivityData,
    };
  },
};
</script>
