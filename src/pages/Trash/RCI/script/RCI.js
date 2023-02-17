import { ref, watch } from "vue";
import Filters from "../../../../components/Filters.vue";
import Pagination from "../../../../components/Pagination.vue";
import { TogglePmDialogState } from "../../../../composables/Triggers";
import DeleteConfirmation from "../components/DeleteConfirmation.vue";
import PMDialog from "../../../../components/PMDialog.vue";
import RCICard from "../components/RCICard.vue";

export default {
  components: {
    Filters,
    Pagination,
    PMDialog,
    DeleteConfirmation,
    RCICard,
  },
  setup() {
    let pageLoadingState = ref(false);
    let pagination = ref({
      sortBy: "desc",
      descending: false,
      page: 1,
      rowsPerPage: 5,
    });

    // TABLE
    let columns = ref([
      {
        name: "selection",
        align: "left",
        label: "",
        field: "selection",
      },
      {
        name: "entity_name",
        align: "left",
        label: "Entity Name",
        field: "entity_name",
      },
      {
        name: "period_covered",
        align: "left",
        label: "Period Covered",
        field: "period_covered",
      },
      {
        name: "fund",
        align: "left",
        label: "Fund",
        field: "fund",
      },
      {
        name: "bank_account_name",
        align: "left",
        label: "Bank Name/Account No.",
        field: "bank_account_name",
      },
      {
        name: "date",
        align: "left",
        label: "Date",
        field: "date",
      },
    ]);
    let listOfRCI = ref([
      {
        id: 1,
        entity_name: "LB-GF",
        period_covered: "November 2022",
        fund: "General Fund",
        bank_account_name: "Landbank / 3612100046",
        date: "LB-GF-22-11-002",
      },
      {
        id: 2,
        entity_name: "Entity name 4",
        period_covered: "October 2022",
        fund: "General Fund",
        bank_account_name: "Landbank",
        date: "Report No.4",
      },
      {
        id: 3,
        entity_name: "Entity name 3",
        period_covered: "September 2022",
        fund: "General Fund",
        bank_account_name: "Landbank",
        date: "Report No.4",
      },
      {
        id: 4,
        entity_name: "Entity name 2",
        period_covered: "August 2022",
        fund: "General Fund",
        bank_account_name: "Landbank",
        date: "Report No.4",
      },
      {
        id: 5,
        entity_name: "Entity name 2",
        period_covered: "August 2022",
        fund: "General Fund",
        bank_account_name: "Landbank",
        date: "Report No.4",
      },
    ]);

    let showDeleteBtn = ref(false);
    const permanentDelete = () => {
      TogglePmDialogState();
    };

    // For checkbox
    let selectAll = ref(false);
    let selectedRCI = ref([]);

    watch(selectAll, () => {
      // show button if one or more data is selected
      showDeleteBtn.value = !showDeleteBtn.value;
      if (selectAll.value) {
        listOfRCI.value.forEach((data) => {
          selectedRCI.value.push(data.id);
        });
      } else {
        selectedRCI.value = [];
      }
    });

    return {
      pageLoadingState,
      pagination,
      listOfRCI,
      columns,
      selectAll,
      selectedRCI,
      permanentDelete,
      showDeleteBtn,
      RCICard,
    };
  },
};
