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
          {{ List.form_type }}
        </div>
        <!-- Q-Checkbox -->
        <!-- A checkbox to show that the card is selected or not-->
        <q-checkbox v-model="val" color="black" size="sm" class="col-1.5" />
      </div>
    </div>
    <div class="q-pa-md">
      <div class="flex justify-between">
        <div class="pt-text-accent-2 q-mb-md">From</div>
        <div class="pt-text-accent-2 q-mb-md">{{ List.from }}</div>
      </div>
      <div class="flex justify-between">
        <div class="pt-text-accent-2 q-mb-md">To</div>
        <div class="pt-text-accent-2 q-mb-md">{{ List.to }}</div>
      </div>
      <div class="flex justify-between">
        <div class="pt-text-accent-2 q-mb-md">Fund type</div>
        <div class="pt-text-accent-2 q-mb-md">{{ List.fund_type }}</div>
      </div>
      <div class="flex justify-between">
        <div class="pt-text-accent-2 q-mb-md">Quantity</div>
        <div class="pt-text-accent-2 q-mb-md">{{ List.qty }}</div>
      </div>
      <div class="flex justify-between">
        <div class="pt-text-accent-2 q-mb-md">Used</div>
        <div class="pt-text-accent-2 q-mb-md">{{ List.used }}</div>
      </div>
      <div class="flex justify-between">
        <div class="pt-text-accent-2 q-mb-md">Collector</div>
        <div class="pt-text-accent-2 q-mb-md">{{ List.collector }}</div>
      </div>
      <div class="flex justify-between">
        <div class="pt-text-accent-2 q-mb-md">Date</div>
        <div class="pt-text-accent-2 q-mb-md">{{ List.date }}</div>
      </div>
    </div>
  </q-card>
</template>

<script>
import { ref } from "vue";

export default {
  // Import the values for the card using props
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
