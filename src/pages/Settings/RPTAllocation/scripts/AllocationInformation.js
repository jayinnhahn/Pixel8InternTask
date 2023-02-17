import { ref } from "vue";
import PMDialog from "../../../../components/PMDialog.vue";
import { TogglePmDialogState } from "../../../../composables/Triggers";
import DeleteConfirmation from "../components/DeleteConfirmation.vue";
import Pagination from "../../../../components/Pagination.vue";
import { useRouter, useRoute } from "vue-router";
import { useQuasar } from "quasar";
import AllocationInfoCard from "../components/AllocationInfoCard.vue";

export default {
  components: {
    Pagination,
    PMDialog,
    DeleteConfirmation,
    AllocationInfoCard,
  },

  setup() {
    const $q = useQuasar();
    const router = useRouter();
    const route = useRoute();
    let pageLoadingState = ref(false);

    let dataList = ref([
      {
        id: 1,
        entity_share: "General Fund",
        percentage_allocation: "100%",
      },
    ]);

    // For table
    let columns = [
      {
        name: "entity_share",
        align: "left",
        label: "Entity Share",
        field: "entity_share",
      },
      {
        name: "percentage_allocation",
        align: "center",
        label: "Percentage Allocation",
        field: "percentage_allocation",
        // field: (val) => (!val.report_number ? "-" : val.report_number),
      },
    ];

    console.log(route);

    // For pagination
    let pagination = ref({
      sortBy: "desc",
      descending: false,
      page: 1,
      rowsPerPage: 5,
    });

    /**
     * Delete Modal Confirmation
     */
    let deleteDataList = () => {
      TogglePmDialogState();
    };

    /**
     * Download RCD to PDF
     */
    let downloadPDF = () => {
      let status = true;
      $q.notify({
        position: $q.screen.width < 767 ? "top" : "bottom-right",
        classes: `${
          status ? "pt-success-notif" : "pt-error-notif"
        } q-px-lg q-pt-none q-pb-none`,
        html: true,
        message: status
          ? `<div class="text-bold">Summary RCD successfully downloaded!</div> <div class="text-black">PDF Format has been downloaded.</div>`
          : `<div class="text-bold">Failed!</div> message here.`,
      });
    };

    /**
     * Download RCD to Excel
     */
    let downloadExcel = () => {
      let status = true;
      $q.notify({
        position: $q.screen.width < 767 ? "top" : "bottom-right",
        classes: `${
          status ? "pt-success-notif" : "pt-error-notif"
        } q-px-lg q-pt-none q-pb-none`,
        html: true,
        message: status
          ? `<div class="text-bold">Summary RCD successfully downloaded!</div> <div class="text-black">PDF Excel has been downloaded.</div>`
          : `<div class="text-bold">Failed!</div> message here.`,
      });
    };

    return {
      deleteDataList,
      pageLoadingState,
      downloadPDF,
      downloadExcel,
      router,
      route,
      dataList,
      columns,
      pagination,
    };
  },
};
