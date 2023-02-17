<template>
  <!-- q-card
  This is where I put the data found in the rows -->
  <q-card
    flat
    class="pt-mobile-card pt-border-radius-15 overflow-hidden no-shadow pt-border-accent-0"
  >
    <div class="pt-bg-accent-0">
      <div class="flex justify-between q-pa-md items-center row">
        <div class="date text-20 text-weight-medium col-11.5" flat>
          {{ List.date }}
        </div>
        <!-- Q-Checkbox -->
        <!-- A checkbox to show that the card is selected or not-->
        <q-checkbox v-model="val" size="sm" class="col-1.5" color="black" />
      </div>
    </div>
    <!-- V-if -->
    <!-- if the variable meet the if condition this would show up-->
    <div v-if="checkicon" class="q-pa-md">
      <div class="flex justify-between">
        <div class="pt-text-accent-2 q-mb-md">DV NO</div>
        <div class="pt-text-accent-2 q-mb-md">{{ List.dv_number }}</div>
      </div>
      <div class="flex justify-between">
        <div class="pt-text-accent-2 q-mb-md">Payee</div>
        <div class="pt-text-accent-2 q-mb-md">{{ List.payee }}</div>
      </div>
      <div class="flex justify-between">
        <div class="pt-text-accent-2 q-mb-md">Particulars</div>
        <div class="pt-text-accent-2 q-mb-md">{{ List.particulars }}</div>
      </div>

      <div class="flex justify-between">
        <div class="pt-text-accent-2 q-mb-md">Charging</div>
        <div class="pt-text-accent-2 q-mb-md">{{ List.charging }}</div>
      </div>

      <div class="flex justify-center">
        <q-icon
          name="keyboard_double_arrow_right"
          size="2rem"
          @click="checkicon = !checkicon"
        />
      </div>
    </div>
    <!-- V-else -->
    <!-- if the variable doesnt meet the if condition this would show up-->
    <div v-else class="q-pa-md">
      <div class="flex justify-between">
        <div class="pt-text-accent-2 q-mb-md">Gross</div>
        <div class="pt-text-accent-2 q-mb-md">{{ List.gross }}</div>
      </div>
      <div class="flex justify-between">
        <div class="pt-text-accent-2 q-mb-md">Net</div>
        <div class="pt-text-accent-2 q-mb-md">{{ List.net }}</div>
      </div>
      <div class="flex justify-between row">
        <div class="pt-text-accent-2 q-mb-md col-5">Tax</div>
        <div class="pt-text-accent-2 q-mb-md col-7">
          <q-select
            borderless
            v-model="List.tax"
            class="pt-select-field pt-border-radius-10 height-31 min-width-90 pt-border-accent-0 text-center text-15 q-ml-md standard"
            popup-content-class="pt-option-style-light"
            :options="options_1"
          />
        </div>
      </div>

      <div class="flex justify-between row">
        <div class="pt-text-accent-2 q-mb-md col-5">OBR No.</div>
        <div class="pt-text-accent-2 q-mb-md col-7">
          <q-select
            class="pt-select-field pt-border-radius-10 height-31 min-width-90 pt-border-accent-0 text-center text-15 q-ml-md standard"
            popup-content-class="pt-option-style-light"
            v-model="List.obr_number"
            :options="options_2"
          />
        </div>
      </div>

      <div class="flex justify-center">
        <q-icon
          name="keyboard_double_arrow_left"
          size="2rem"
          @click="checkicon = !checkicon"
        />
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
    let taxoptions = List.value.tax;
    return {
      List,
      val: ref(false),
      checkicon: ref(true),
      options_1: ["4, 431", "3, 544.8", "2, 363.2", "17, 725", "17, 724"],
      options_2: ["09-4696", "09-4698", "09-4700", "09-4701", "09-4699"],
    };
  },
};
</script>

<style lang="scss"></style>
