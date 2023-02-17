import { ref } from "vue";
import { useRoute } from "vue-router";
import { useQuasar } from "quasar";
import { GetSearchResult } from "../../../composables/Search";
import {
  FetchUserDetails,
  InsertUser,
  UpdateUser,
  ValidateEmail,
} from "../../../composables/UserManagement";
// import { DarkMode } from 'src/core/composables/Triggers';
export default {
  setup() {
    const route = useRoute();
    const $q = useQuasar();

    let form = ref({
      email_address: null,
      level: null,
      role: null,
      supervisor_id: null,
    });

    let pageLoadingState = ref(false);
    // Used for edit
    if (route.params.id) {
      pageLoadingState.value = true;
      FetchUserDetails({ id: route.params.id }).then((response) => {
        if (response.status === "success" && response.data.length) {
          form.value = {
            id: response.data[0].id,
            level: response.data[0].level,
            role: response.data[0].role,
            supervisor_id: response.data[0].supervisor_id
              ? response.data[0].supervisor_id
              : null,
          };
          supervisor_options.value = [
            {
              id: response.data[0].supervisor_id,
              full_name: response.data[0].supervisor_name,
            },
          ];
        }
        pageLoadingState.value = false;
      });
    }

    let role_options = ref([
      {
        label: "Admin",
        value: 0,
      },
      {
        label: "Stockholder",
        value: 1,
      },
      {
        label: "CEO",
        value: 2,
      },
      {
        label: "Manager",
        value: 3,
      },
      {
        label: "Supervisor",
        value: 4,
      },
      {
        label: "Employee",
        value: 5,
      },
      {
        label: "External User",
        value: 6,
      },
    ]);

    let supervisor_options = ref([]);
    const filterEmployeeName = (val, update, abort) => {
      if (val.length >= 3) {
        let payload = {
          endpoint: "userManagement",
          params: {
            keyword: val,
            level: form.value.level,
          },
        };
        GetSearchResult(payload).then((response) => {
          update(() => {
            supervisor_options.value = response.data;
          });
        });
      } else {
        abort();
      }
    };

    const isValidEmail = (val) => {
      const emailPattern =
        /^(?=[a-zA-Z0-9@._%+-]{6,254}$)[a-zA-Z0-9._%+-]{1,64}@(?:[a-zA-Z0-9-]{1,63}\.){1,8}[a-zA-Z]{2,63}$/;
      return emailPattern.test(val) || "";
    };

    const levelRule = [
      (val) => (val !== null && val !== "") || "",
      (val) => val >= 1 || "",
    ];

    let btnLoadingState = ref(false);
    const userForm = ref(null);
    const addUser = () => {
      userForm.value.validate().then((success) => {
        if (success) {
          btnLoadingState.value = true;
          // Post request
          if (!route.params.id) {
            ValidateEmail({ email_address: form.value.email_address }).then(
              (response) => {
                if (response.data.length && response.status === "success") {
                  /**
                   * Get user's account id and bind it to the
                   * employee information needed by Project Management
                   */
                  form.value.account_id = response.data[0].id;
                  // Remove email address in payload as it is not needed in employee information table
                  delete form.value.email_address;
                  InsertUser(form.value).then((response) => {
                    let status = Boolean(response.status === "success");
                    $q.notify({
                      position: $q.screen.width < 767 ? "top" : "bottom-right",
                      classes: `${
                        status ? "pt-success-notif" : "pt-error-notif"
                      } q-px-lg q-pt-none q-pb-none`,
                      html: true,
                      message: status
                        ? `<div class="text-bold">New user added successfully!</div>`
                        : `<div class="text-bold">Failed!</div> ${response.message}.`,
                    });

                    if (status) {
                      form.value = {
                        email_address: null,
                        level: null,
                        role: null,
                        supervisor_id: null,
                      };
                      userForm.value.reset();
                    }

                    btnLoadingState.value = false;
                  });
                } else {
                  $q.notify({
                    position: $q.screen.width < 767 ? "top" : "bottom-right",
                    classes: `pt-error-notif q-px-lg q-pt-none q-pb-none`,
                    html: true,
                    message: `<div class="text-bold">Email address not found!</div> Employee may not have a core account.`,
                  });
                }
              }
            );
          } else {
            // Put request
            UpdateUser(form.value).then((response) => {
              let status = Boolean(response.status === "success");
              $q.notify({
                position: $q.screen.width < 767 ? "top" : "bottom-right",
                classes: `${
                  status ? "pt-success-notif" : "pt-error-notif"
                } q-px-lg q-pt-none q-pb-none`,
                html: true,
                message: status
                  ? `<div class="text-bold">User information updated successfully!</div>`
                  : `<div class="text-bold">Failed!</div> ${response.message}.`,
              });
              btnLoadingState.value = false;
            });
          }
        }
      });
    };
    let DarkMode = ref(false);
    return {
      DarkMode,
      route,
      btnLoadingState,
      userForm,
      form,
      role_options,
      supervisor_options,
      filterEmployeeName,
      levelRule,
      isValidEmail,
      addUser,
      pageLoadingState,
    };
  },
};
