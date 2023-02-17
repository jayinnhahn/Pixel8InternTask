import Filters from "../../../components/Filters.vue";
import Pagination from "../../../components/Pagination.vue";
import MobileFilter from "../../../components/MobileFilter.vue";
import {
  FetchUsers,
  GetUsers,
  UserDelete,
} from "../../../composables/UserManagement";
import { useRouter } from "vue-router";
import { ref, watch } from "vue";
import PMDialog from "../../../components/PMDialog.vue";
import { TogglePmDialogState } from "../../../composables/Triggers";
import { SearchList } from "../../../composables/Search";
import DeleteConfirmation from "../components/DeleteConfirmation";
import UserCard from "../components/UserCard";
export default {
  components: {
    Filters,
    Pagination,
    PMDialog,
    DeleteConfirmation,
    MobileFilter,
    UserCard,
  },
  setup() {
    const router = useRouter();

    //Fetch users
    let pageLoadingState = ref(false);
    let userList = ref([]);
    // FetchUsers().then((response) => {
    // 	userList.value = GetUsers.value;
    // 	pageLoadingState.value = false;
    // });

    watch(SearchList, () => {
      userList.value = SearchList.value;
    });

    // For pagination
    let pagination = ref({
      sortBy: "desc",
      descending: false,
      page: 1,
      rowsPerPage: 5,
    });

    // For table
    let columns = [
      {
        name: "full_name",
        align: "left",
        label: "Linked Account",
        field: "full_name",
      },
      {
        name: "level",
        align: "left",
        label: "Level",
        field: "level",
      },
      {
        name: "role",
        align: "left",
        label: "Role",
        field: "role",
      },
      {
        name: "supervisor_name",
        align: "left",
        label: "Immediate Supervisor",
        field: "supervisor_name",
      },
      {
        name: "action",
        align: "left",
        label: "",
        field: "action",
        style: "width: 10%",
      },
    ];

    // Readable user role
    const userRole = [
      "Admin",
      "Stockholder",
      "CEO",
      "Manager",
      "Supervisor",
      "Employee",
      "External User",
    ];

    const deleteUser = (row) => {
      UserDelete.value = {
        id: row.id,
        level: row.level,
      };
      TogglePmDialogState();
    };

    return {
      router,
      //For Table
      pagination,
      columns,
      GetUsers,
      userRole,
      deleteUser,
      userList,
      pageLoadingState,
    };
  },
};
