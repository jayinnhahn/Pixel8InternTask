import { ref } from "vue";
import Filters from "../../../../components/Filters.vue";
import MobileFilter from "../../../../components/MobileFilter.vue";

export default {
  components: {
    Filters,
    MobileFilter,
  },
  setup() {
    let allocationList = ref([
      {
        id: 1,
        name: "Special Education Fund",
        rcd: 6,
      },
    ]);
    return {
      allocationList,
    };
  },
};
