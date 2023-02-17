import { ref, watch } from "vue";
import { useQuasar } from "quasar";
import Filters from "../../../../components/Filters.vue";
import Pagination from "../../../../components/Pagination.vue";
import { TogglePmDialogState } from "../../../../composables/Triggers";
import PMDialog from "../../../../components/PMDialog.vue";
import DeleteConfirmation from "../components/DeleteConfirmation.vue";
import RCDCard from "../components/RCDCard.vue";
export default {
  components: {
    Filters,
    Pagination,
    PMDialog,
    DeleteConfirmation,
    RCDCard,
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
        name: "fund_type",
        align: "left",
        label: "Fund",
        field: "fund_type",
      },
      {
        name: "accountable_officer",
        align: "left",
        label: "Accountable Officer",
        field: "accountable_officer",
      },
      {
        name: "report_number",
        align: "left",
        label: "Report No.",
        field: "report_number",
      },
      {
        name: "date",
        align: "left",
        label: "Date",
        field: "date",
      },
    ]);
    let listOfRCD = ref([
      {
        id: 1,
        fund_type: "General Fund",
        accountable_officer: "Liquidator Name",
        report_number: "-",
        date: "2022-11-09",
      },
      {
        id: 2,
        fund_type: "General Fund",
        accountable_officer: "Liquidator Name",
        report_number: "-",
        date: "2022-11-09",
      },
      {
        id: 3,
        fund_type: "General Fund",
        accountable_officer: "Liquidator Name",
        report_number: "-",
        date: "2022-11-09",
      },
      {
        id: 4,
        fund_type: "General Fund",
        accountable_officer: "Liquidator Name",
        report_number: "-",
        date: "2022-11-09",
      },
    ]);

    const $q = useQuasar();
    const showNotify = () => {
      let status = true;
      $q.notify({
        position: $q.screen.width < 767 ? "top" : "bottom-right",
        classes: `${
          status ? "pt-success-notif" : "pt-error-notif"
        } q-px-lg q-pt-none q-pb-non`,
        html: true,
        message: status
          ? `<div class="text-bold">O.R Ranges Trash deleted permanently!</div> O.R Ranges has been deleted permanently.`
          : `<div class="text-bold">Failed!</div>.`,
      });
    };

    let showDeleteBtn = ref(false);
    const permanentDelete = () => {
      TogglePmDialogState();
    };

    // For checkbox
    let selectAll = ref(false);
    let selectedRCD = ref([]);

    watch(selectAll, () => {
      // show button if one or more data is selected
      showDeleteBtn.value = !showDeleteBtn.value;
      if (selectAll.value) {
        listOfRCD.value.forEach((data) => {
          selectedRCD.value.push(data.id);
        });
      } else {
        selectedRCD.value = [];
      }
    });

    return {
      pageLoadingState,
      pagination,
      listOfRCD,
      columns,
      selectAll,
      selectedRCD,
      showDeleteBtn,
      permanentDelete,
      RCDCard,
      tab: ref("all"),
    };
  },
};
