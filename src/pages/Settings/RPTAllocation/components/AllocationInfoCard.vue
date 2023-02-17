<!-- This is the card component for the AllocationInfo.Vue to show in the mobile part -->
<template>
  <!-- q-card
  This is where I put the data found in the rows -->
  <q-card
    flat
    class="pt-mobile-card pt-border-radius-15 overflow-hidden q-mb-md no-shadow pt-border-accent-0"
  >
    <div class="pt-bg-accent-0">
      <div class="flex justify-between q-pa-md items-center row">
        <div class="date text-20 text-weight-medium col-11.5" flat>
          {{ User.entity_share }}
        </div>
      </div>
    </div>
    <div class="q-pa-md">
      <div class="flex justify-between">
        <div class="pt-text-accent-2 q-mb-md">Percentage</div>
        <div class="pt-text-accent-2 q-mb-md">
          {{ User.percentage_allocation }}
        </div>
      </div>
    </div>
  </q-card>
</template>

<script>
import { ref } from "vue";

export default {
  // Import the values for the card using props
  props: {
    user: Object,
  },
  setup(props) {
    let User = ref(props.user);
    return {
      User,
    };
  },
};
</script>

<style lang="scss"></style>
