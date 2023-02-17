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
          {{ List.fund_type }}
        </div>
        <!-- Q-Checkbox -->
        <!-- A checkbox to show that the card is selected or not-->
        <q-checkbox v-model="val" color="black" size="sm" class="col-1.5" />
      </div>
    </div>
    <div class="flex justify-between q-pa-md">
      <div class="pt-text-accent-2 q-mb-md">accountable_officer</div>
      <div class="pt-text-accent-2 q-mb-md">
        {{ List.accountable_officer }}
      </div>
      <div class="flex justify-between">
        <div class="pt-text-accent-2 q-mb-md">Report No.</div>
        <div class="pt-text-accent-2 q-mb-md">{{ List.report_number }}</div>
      </div>
      <div class="flex justify-between">
        <div class="pt-text-accent-2 q-mb-md">date</div>
        <div class="pt-text-accent-2 q-mb-md">{{ List.date }}</div>
      </div>
    </div>
  </q-card>
</template>

<script>
import { ref } from "vue";
// Import the values for the card using props
export default {
  props: {
    list: Object,
  },
  setup(props) {
    let List = ref(props.list);
    return {
      List,
      val: ref(false),
    };
  },
};
</script>
<style lang="scss"></style>
