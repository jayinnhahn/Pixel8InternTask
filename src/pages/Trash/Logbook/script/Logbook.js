import { ref, watch } from "vue";
import Filters from "../../../../components/Filters.vue";
import Pagination from "../../../../components/Pagination.vue";
import { TogglePmDialogState } from "../../../../composables/Triggers";
import PMDialog from "../../../../components/PMDialog.vue";
import DeleteConfirmation from "../components/DeleteConfirmation.vue";
import LogBookCard from "../components/LogBookCard.vue";
export default {
  components: {
    Filters,
    Pagination,
    PMDialog,
    DeleteConfirmation,
    LogBookCard,
  },
  setup() {
    let pageLoadingState = ref(false);
    let pagination = ref({
      sortBy: "desc",
      descending: false,
      page: 1,
      rowsPerPage: 5,
    });

    // TABLE COLUMN
    let first_columns = ref([
      {
        name: "selection",
        align: "left",
        label: "",
        field: "selection",
      },
      {
        name: "date",
        align: "left",
        label: "Date",
        field: "date",
      },
      {
        name: "dv_number",
        align: "left",
        label: "DV NO.",
        field: "dv_number",
      },
      {
        name: "payee",
        align: "left",
        label: "Payee",
        field: "payee",
      },
      {
        name: "particulars",
        align: "left",
        label: "Particulars",
        field: "particulars",
      },
      {
        name: "charging",
        align: "left",
        label: "Charging",
        field: "charging",
      },
      {
        name: "gross",
        align: "left",
        label: "Gross",
        field: "gross",
      },
      {
        name: "net",
        align: "left",
        label: "NET",
        field: "net",
      },
      {
        name: "action",
        align: "left",
        label: "",
        field: "action",
      },
    ]);

    let second_columns = ref([
      {
        name: "selection",
        align: "left",
        label: "",
        field: "selection",
      },
      {
        name: "payee",
        align: "left",
        label: "Payee",
        field: "payee",
      },
      {
        name: "particulars",
        align: "left",
        label: "Particulars",
        field: "particulars",
      },
      {
        name: "charging",
        align: "left",
        label: "Charging",
        field: "charging",
      },
      {
        name: "gross",
        align: "left",
        label: "Gross",
        field: "gross",
      },
      {
        name: "net",
        align: "left",
        label: "NET",
        field: "net",
      },
      {
        name: "tax",
        align: "left",
        label: "TAX",
        field: "tax",
      },
      {
        name: "obr_number",
        align: "left",
        label: "OBR No.",
        field: "obr_number",
      },
      {
        name: "action",
        align: "left",
        label: "",
        field: "action",
      },
    ]);

    // ROW DATA
    let listOfLogbook = ref([
      {
        id: 1,
        date: "2022-11-08",
        dv_number: 123123,
        payee: "LUZ S. REFRAN",
        particulars: "C/A Wages Aug.-Sept. 2022",
        charging: "HRMO-SPES Prop",
        gross: 123123,
        net: "-",
        tax: 123123,
        obr_number: 123123,
      },
      {
        id: 1,
        date: "2022-11-08",
        dv_number: 123123,
        payee: "LUZ S. REFRAN",
        particulars: "C/A Wages Aug.-Sept. 2022",
        charging: "HRMO-SPES Prop",
        gross: 123,
        net: "-",
        tax: 123123,
        obr_number: 123123,
      },
    ]);

    let showDeleteBtn = ref(false);
    const permanentDelete = () => {
      TogglePmDialogState();
    };

    // For checkbox
    let selectAll = ref(false);
    let selectedLogbook = ref([]);

    watch(selectAll, () => {
      // show button if one or more data is selected
      showDeleteBtn.value = !showDeleteBtn.value;
      if (selectAll.value) {
        listOfLogbook.value.forEach((data) => {
          selectedLogbook.value.push(data.id);
        });
      } else {
        selectedLogbook.value = [];
      }
    });

    let nextColumn = ref(false);
    const toggleNextColumn = () => {
      nextColumn.value = !nextColumn.value;
    };

    return {
      pageLoadingState,
      pagination,
      first_columns,
      second_columns,
      listOfLogbook,
      selectAll,
      selectedLogbook,
      permanentDelete,
      showDeleteBtn,
      nextColumn,
      toggleNextColumn,
      LogBookCard,
    };
  },
};
