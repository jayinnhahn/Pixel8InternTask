import { ref, computed, watch } from "vue";
import { useQuasar, date } from "quasar";
import { useRoute, useRouter } from "vue-router";

export default {
  setup() {
    const $q = useQuasar();
    const route = useRoute();
    const router = useRouter();

    /**
     * VARIABLES
     */
    let form = ref({
      fund_type: null,
      allocations: [
        {
          id: 1,
          entityShare: null,
          percentageAllocation: null,
        },
      ],
    });
    let pageLoadingState = ref(false);
    let DarkMode = ref(false);
    let fundTypeOptions = ref([
      {
        label: "General Fund",
        value: 0,
      },
      {
        label: "Special Education Fund",
        value: 1,
      },
      {
        label: "PCC",
        value: 2,
      },
    ]);
    let totalPercentage = ref(0 + "%");

    /**
     * Compute Total Percentage by using Watch
     */
    watch(form.value.allocations, (value) => {
      if (value.length) {
        let total = 0;
        value.forEach((allocations) => {
          if (allocations.percentageAllocation) {
            total += Number(allocations.percentageAllocation);
          }
        });
        totalPercentage.value = total + "%";
      }
    });

    /**
     * Add Form Allocations
     */
    const addCollections = () => {
      let id = form.value.allocations.length;
      form.value.allocations.push({
        id: ++id,
        entityShare: null,
        percentageAllocation: null,
      });
    };

    /**
     * Add Form Allocations
     */
    const removeCollections = (id) => {
      let index = form.value.allocations.findIndex((c) => c.id === id);
      form.value.allocations.splice(index, 1);
    };

    /**
     * Save RPT Allocaton
     */
    let saveAllocation = () => {
      let amount = totalPercentage.value.replace("%", "");
      let status = Number(amount) === 100 ? true : false;
      status === true && router.go(-1);
      $q.notify({
        position: $q.screen.width < 767 ? "top" : "bottom-right",
        classes: `${
          status ? "pt-success-notif" : "pt-error-notif"
        } q-px-lg q-pt-none q-pb-none`,
        html: true,
        message: status
          ? `<div class="text-bold">RPT Allocation added successfully</div> <div class="text-black">Real Property Tax Allocation has been added</div>`
          : `<div class="text-bold">Invalid Total Percentage</div> Total Percentage must be equal to 100%.`,
      });
    };

    return {
      route,
      pageLoadingState,
      removeCollections,
      DarkMode,
      addCollections,
      fundTypeOptions,
      saveAllocation,
      totalPercentage,
      form,
    };
  },
};
