import { ref, watch } from "vue";
import { TogglePmDialogState } from "../../../../composables/Triggers";
import Filters from "../../../../components/Filters.vue";
import Pagination from "../../../../components/Pagination.vue";
import DeleteConfirmation from "../components/DeleteConfirmation.vue";
import PMDialog from "../../../../components/PMDialog.vue";
import OrRangeCard from "../components/OrRangeCard.vue";
export default {
  components: {
    Filters,
    Pagination,
    DeleteConfirmation,
    PMDialog,
    OrRangeCard,
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
        name: "form_type",
        align: "left",
        label: "Form Type",
        field: "form_type",
      },
      {
        name: "from",
        align: "left",
        label: "From",
        field: "from",
      },
      {
        name: "to",
        align: "left",
        label: "To",
        field: "to",
      },
      {
        name: "fund_type",
        align: "left",
        label: "Fund Type",
        field: "fund_type",
      },
      {
        name: "qty",
        align: "left",
        label: "QTY",
        field: "qty",
      },
      {
        name: "used",
        align: "left",
        label: "Used",
        field: "used",
      },
      {
        name: "collector",
        align: "left",
        label: "Collector",
        field: "collector",
      },
      {
        name: "date",
        align: "left",
        label: "Date",
        field: "date",
      },
    ]);
    let listOfOrRanges = ref([
      {
        id: 1,
        form_type: "Accountable #51",
        from: 7072151,
        to: 7072200,
        fund_type: "General Fund",
        qty: 50,
        used: 0,
        collector: "Collector Name 1",
        date: "2022-11-09",
      },
      {
        id: 2,
        form_type: "Form Type No. 1",
        from: 7072151,
        to: 7072200,
        fund_type: "General Fund",
        qty: 50,
        used: 0,
        collector: "Collector Name 1",
        date: "2022-11-09",
      },
    ]);

    let showDeleteBtn = ref(false);
    const permanentDelete = () => {
      TogglePmDialogState();
    };

    // For checkbox
    let selectAll = ref(false);
    let selectedOR = ref([]);

    watch(selectAll, () => {
      // show button if one or more data is selected
      showDeleteBtn.value = !showDeleteBtn.value;
      if (selectAll.value) {
        listOfOrRanges.value.forEach((data) => {
          selectedOR.value.push(data.id);
        });
      } else {
        selectedOR.value = [];
      }
    });

    return {
      pageLoadingState,
      pagination,
      listOfOrRanges,
      columns,
      selectAll,
      selectedOR,
      permanentDelete,
      showDeleteBtn,
      OrRangeCard,
    };
  },
};
