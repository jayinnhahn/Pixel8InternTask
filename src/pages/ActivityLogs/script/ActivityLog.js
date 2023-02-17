import { ref, watch } from "vue";
import { useQuasar } from "quasar";
import { useRoute, useRouter } from "vue-router";
import Filters from "../../../components/Filters.vue";
import Pagination from "../../../components/Pagination.vue";
import { LogList } from "src/composables/ActivityLogs.js";
import MobileFilter from "../../../components/MobileFilter.vue";
import PMDialog from "../../../components/PMDialog.vue";
import { ToggleFilterDialogState } from "../../../composables/Triggers";
import ActivityCard from "../components/ActivityCard.vue";

export default {
  components: {
    Filters,
    Pagination,
    MobileFilter,
    ActivityCard,
  },
  setup() {
    const route = useRoute();
    const router = useRouter();

    // for select field
    let selectModel = ref(null);
    const selectOptions = ref([
      {
        label: "Label 1",
        value: 0,
      },
      {
        label: "Label 2",
        value: 1,
      },
    ]);

    let deadline = ref(null);
    let page = ref(1);
    const pageOptions = ref([1, 2, 3, 5, 6, 7, 8]);

    // for pagination
    let pagination = ref({
      sortBy: "desc",
      descending: false,
      page: 20,
      rowsPerPage: 1,
    });

    // for table
    let columns = [
      {
        name: "Activity",
        required: true,
        label: "Activity",
        align: "left",
        field: "activity",
      },
      {
        name: "Time&Date",
        align: "left",
        label: "Time & Date",
        field: "time_date",
      },
    ];

    let watch_task = ref(false);

    // Rows
    // Rows is the array being used to store all the data from the LogList import
    const rows = ref([]);

    // For Loop
    // For loop to assign all the Loglist value to the rows array
    for (let i = 0; i < LogList.value.length; i++) {
      rows.value.push(LogList.value[i]);
    }

    let keyResults = ref([{ result_name: null, tasks: [] }]);
    let taskOptions = ref([
      { id: 1, task_name: "Firts task of the day" },
      { id: 2, task_name: "Second task of the day" },
    ]);

    const addKeyResult = () => {
      keyResults.value.push({
        tasks: [],
      });
    };

    const removeKeyResult = (index) => {
      if (index > -1) {
        keyResults.value.splice(index, 1);
      }
    };

    let MilestoneList = ref([
      {
        project_milestone_id: 1,
        milestone_name: "Milestone one",
      },
      {
        project_milestone_id: 2,
        milestone_name: "Milestone two",
      },
    ]);
    let milestoneOptions = ref(MilestoneList.value);
    let milestones = ref([]);

    //For UI Toggles
    const selectAll = ref(false);

    const toggleSelectAll = () => {};

    //For Search
    const milestoneSearch = ref(null);
    const milestoneRef = ref(null);

    const milestoneFilter = (val, update) => {
      update(() => {
        milestoneOptions.value = MilestoneList.value.filter(
          (v) => v.milestone_name.toLowerCase().indexOf(val.toLowerCase()) > -1
        );
      });
    };

    // for notification
    const $q = useQuasar();
    const showNotify = () => {
      let status = true;
      $q.notify({
        position: $q.screen.width < 767 ? "top" : "bottom-right",
        classes: `${
          status ? "pt-success-notif" : "pt-error-notif"
        } q-px-lg q-pt-none q-pb-none`,
        html: true,
        message: status
          ? `<div class="text-bold">Success!</div> message here.`
          : `<div class="text-bold">Failed!</div> message here.`,
      });
    };

    let DarkMode = ref(false);
    const callfunction = () => {
      console.log(LogList.value);
    };

    return {
      route,
      router,

      // for select field
      selectModel,
      selectOptions,
      deadline,
      page,
      pageOptions,
      milestoneFilter,
      milestoneSearch,
      milestones,
      milestoneOptions,
      milestoneRef,
      toggleSelectAll,

      // for pagination
      pagination,
      keyResults,
      taskOptions,
      addKeyResult,
      removeKeyResult,

      // for table
      rows,
      columns,
      watch_task,
      callfunction,

      // for notification
      // showDialogFunction,
      // FilterDialogState,
      MobileFilter,
      LogList,
      showNotify,
      DarkMode,
      ToggleFilterDialogState,
    };
  },
};
