<template>
  <div>
    <div class="bg-white q-pa-lg">
      <!-- *************************HEADER******************************** -->
      <h4 class="pt-bg-accent-1 text-white q-pa-sm">Headers</h4>
      <h1 class="text-33 text-semibold q-my-none">Header 33px</h1>
      <h2 class="text-32 text-semibold q-my-none">Header 32px</h2>
      <h3 class="text-30 text-semibold q-my-none">Header 30px</h3>
      <h4 class="text-28 text-semibold q-my-none">Header 28px</h4>
      <h5 class="text-26 text-semibold q-my-none">Header 26px</h5>
      <h6 class="text-24 text-semibold q-my-none">Header 24px</h6>
      <h6 class="text-23 text-semibold q-my-none">Header 23px</h6>
      <h6 class="text-22 text-semibold q-my-none">Header 22px</h6>
      <hr class="q-my-md" />
      <!-- *************************TEXTS******************************** -->
      <h4 class="pt-bg-accent-1 text-white q-pa-sm">Texts</h4>
      <div class="text-20">Texts 20px</div>
      <!-- <div class="text-18">Texts 18px</div>
      <div class="text-16">Texts 16px</div> -->
      <div class="text-15">Texts 15px</div>
      <div class="text-14">Texts 14px</div>
      <div class="text-13">Texts 13px</div>
      <div class="text-12">Texts 12px</div>
      <div class="text-10">Texts 10px</div>
      <div class="text-9">Texts 9px</div>
      <div class="text-8">Texts 8px</div>

      <!-- ************************INPUTS******************************* -->
      <hr class="q-my-md" />
      <h4 class="pt-bg-accent-1 text-white q-pa-sm">Inputs</h4>
      <q-input
        dense
        borderless
        placeholder="Input"
        :rules="[(val) => (val !== null && val !== '') || '']"
        hide-bottom-space
        class="pt-input-field standard pt-border-accent-3 pt-border-radius-10"
      />
      <div class="q-py-md"></div>
      <q-select
        class="pt-border-radius-10 pt-border-accent-3 pt-select-field standard"
        dense
        borderless
        v-model="selectModel"
        :label="selectModel !== null ? '' : 'Select'"
        emit-value
        map-options
        :options="selectOptions"
        :rules="[(val) => (val !== null && val !== '') || '']"
        hide-bottom-space
        :popup-content-class="
          DarkMode ? 'pt-option-style-dark' : 'pt-option-style-light'
        "
        options-selected-class="selected-class"
        transition-show="scale"
        transition-hide="scale"
      />
      <div class="q-py-md"></div>
      <q-input
        dense
        borderless
        placeholder="Textarea"
        autogrow
        type="textarea"
        class="pt-input-field autogrow standard pt-border-accent-3 pt-border-radius-10 q-pr-md"
      />
      <div class="q-py-md"></div>
      <Filters />
      <div class="q-py-md"></div>
      <div class="flex justify-start">
        <Filters
          dynamicHeight="34"
          :searchVisible="true"
          :filterDateVisible="false"
          :labelVisible="false"
          pathEndPoint="projects"
        />
      </div>
      <div class="q-py-md"></div>
      <Pagination v-model:pagination="pagination" :numRows="[]" />
      <div class="q-py-md"></div>
      <div class="flex justify-start items-center">
        <div>Pages</div>
        <q-select
          borderless
          v-model="page"
          :options="pageOptions"
          class="pt-select-field pt-border-radius-50 height-31 min-width-90 pt-border-accent-0 text-center text-15 q-ml-md"
          popup-content-class="pt-option-style-light"
        />
      </div>
      <div class="q-py-md"></div>
      <q-input
        dense
        readonly
        borderless
        :rules="[(val) => !!val || '']"
        v-model="deadline"
        placeholder="Enter Date"
        hide-bottom-space
        lazy-rules
        mask="####-##-##"
        class="pt-input-field standard pt-border-accent-3 pt-border-radius-10 q-mb-md"
      >
        <template v-slot:append>
          <q-icon name="event" class="cursor-pointer text-grey">
            <q-popup-proxy
              ref="qDateProxy"
              transition-show="scale"
              transition-hide="scale"
            >
              <q-date
                minimal
                v-model="deadline"
                @update:model-value="() => $refs.qDateProxy.hide()"
                mask="YYYY-MM-DD"
                color="amber-6"
                text-color="accent-1"
              />
            </q-popup-proxy>
          </q-icon>
        </template>
      </q-input>

      <div class="q-py-md"></div>

      <!-- START - Standard infinite form -->
      <div v-for="(keyResult, index) in keyResults" :key="index">
        <div
          class="pt-border-accent-3 pt-border-radius-15 q-px-md q-py-lg q-mt-md standard-form-width"
        >
          <div class="field">
            <div class="flex justify-between items-center">
              <q-item-label class="label key_result text-weight-bold q-mb-sm"
                >Key Results</q-item-label
              >
              <div v-if="keyResults.length > 1 && index !== 0">
                <q-btn
                  flat
                  class="delete_button pm-button text-grey q-pa-none"
                  size="10px"
                  icon="iconfont icon-delete-fill"
                  @click="
                    route.params.id ? openDialog(index) : removeKeyResult(index)
                  "
                />
              </div>
            </div>

            <q-input
              v-model="keyResult.result_name"
              dense
              borderless
              placeholder="How you'll measure your progress..."
              :rules="[(val) => (val !== null && val !== '') || '']"
              hide-bottom-space
              class="pt-input-field pt-border-accent-3 pt-border-radius-10"
            />
          </div>
          <div class="q-mt-md">
            <q-item-label class="label text-weight-bold q-mb-sm"
              >Tag Tasks</q-item-label
            >
            <q-select
              v-model="keyResult.tasks"
              :options="taskOptions"
              input-debounce="500"
              fill-input
              option-label="task_name"
              option-value="id"
              multiple
              class="pt-border-radius-10 pt-border-accent-3 pt-select-field standard_q-chip use-input"
              dense
              borderless
              use-input
              use-chips
              :placeholder="
                !keyResult.tasks
                  ? 'Tag tasks to measure the Key Result'
                  : !keyResult.tasks.length
                  ? 'Tag tasks to measure the Key Result'
                  : ''
              "
              emit-value
              map-options
              hide-bottom-space
              :popup-content-class="
                DarkMode ? 'pt-option-style-dark' : 'pt-option-style-light'
              "
              options-selected-class="pm-selected-class"
              transition-show="scale"
              transition-hide="scale"
              behavior="menu"
            >
              <template v-slot:no-option>
                <q-item>
                  <q-item-section class="text-grey">
                    No results
                  </q-item-section>
                </q-item>
              </template>
            </q-select>

            <q-item-label class="label text-weight-bold q-mb-sm q-mt-md"
              >Milestones</q-item-label
            >
            <q-select
              class="pt-border-radius-10 pt-border-accent-3 pt-select-field standard full-width standard_q-chip"
              dense
              borderless
              map-options
              ref="milestoneRef"
              @filter="milestoneFilter"
              @popup-hide="milestoneSearch = ''"
              v-model="milestones"
              :options="milestoneOptions"
              option-label="milestone_name"
              option-value="project_milestone_id"
              multiple
              use-chips
              :label="milestones.length !== 0 ? '' : 'Select a milestone'"
              :rules="[(val) => val.length > 0 || '']"
              hide-bottom-space
              :popup-content-class="
                DarkMode ? 'pt-option-style-dark' : 'pt-option-style-light'
              "
              options-selected-class="pt-selected-class"
              transition-show="scale"
              transition-hide="scale"
              behavior="menu"
            >
              <!-- For Search Bar -->
              <template v-slot:before-options>
                <div class="q-px-md q-pt-md q-pb-sm">
                  <q-input
                    class="minmax-width pt-border-radius-8 pt-border-accent-0 pt-select-field height-31 use-input q-px-sm full-width"
                    dense
                    autofocus
                    borderless
                    debounce="500"
                    v-model="milestoneSearch"
                    @update:model-value="
                      milestoneRef[0].filter(milestoneSearch)
                    "
                    placeholder="Search"
                  >
                    <template v-slot:prepend>
                      <q-icon class="pt-text-accent-0 q-mr-sm" name="search" />
                    </template>
                  </q-input>
                </div>
              </template>
              <!-- For Displaying Options -->
              <template
                v-slot:option="{ itemProps, opt, selected, toggleOption }"
              >
                <q-item v-bind="itemProps" class="q-py-none q-px-md">
                  <q-item-section side>
                    <q-checkbox
                      color="yellow-8"
                      size="sm"
                      :model-value="selected"
                      @update:model-value="toggleOption(opt)"
                    />
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>{{ opt.milestone_name }}</q-item-label>
                  </q-item-section>
                </q-item>
              </template>
              <!-- For Select All option -->
              <template v-slot:after-options>
                <q-item class="q-py-xs q-px-md cursor-pointer select-all">
                  <q-item-section side>
                    <q-checkbox
                      color="yellow-8"
                      size="sm"
                      v-model="selectAll"
                      @update:model-value="toggleSelectAll"
                    />
                  </q-item-section>
                  <q-item-section @click="toggleSelectAll">
                    <q-item-label>Select All</q-item-label>
                  </q-item-section>
                </q-item>
              </template>
            </q-select>
          </div>
        </div>
      </div>
      <!-- Remove the style attribute and use a class border-dashed instead -->
      <div
        style="border: 1px dashed #869ab2"
        class="pt-border-radius-15 flex justify-center standard-form-width q-my-sm q-pa-md"
      >
        <q-btn
          flat
          round
          class="pt-bg-accent-0 pt-text-accent-1"
          id="generateKeyInput"
          @click="addKeyResult()"
          no-caps
          icon="add"
        />
      </div>
      <!-- END - Standard infinite form -->

      <!-- *************************BUTTONS******************************** -->
      <hr class="q-my-md" />
      <h4 class="pt-bg-accent-1 text-white q-pa-sm">Buttons</h4>

      <div class="flex justifty-start items-center">
        <q-btn @click="$router.go(-1)" round dense flat icon="arrow_back" />
        <h5 class="text-26 text-semibold q-my-none q-ml-md">Arrow back</h5>
      </div>
      <div class="q-py-md"></div>
      <q-btn
        rounded
        dense
        flat
        label="Capslock"
        class="pt-border-accent-0 pt-bg-hover-accent-0 q-px-xl"
      />
      <div class="q-py-md"></div>
      <q-btn
        rounded
        dense
        flat
        no-caps
        label="Non Capslock"
        class="pt-border-accent-0 pt-bg-hover-accent-0 q-px-xl"
      />
      <div class="q-py-md"></div>
      <q-btn
        rounded
        dense
        flat
        no-caps
        label="Active"
        class="pt-border-accent-0 pt-bg-accent-0 q-px-xl"
      />
      <div class="q-py-md"></div>
      <q-btn
        dense
        flat
        no-caps
        label="Responsive in mobile"
        class="pt-button pt-border-accent-0 pt-bg-accent-0 q-px-xl"
      />

      <!-- **************************TABLE******************************* -->
      <hr class="q-my-md" />
      <h4 class="pt-bg-accent-1 text-white q-pa-sm">Tables</h4>
      <q-table
        :rows="rows"
        :columns="columns"
        row-key="name"
        class="pt-table"
        flat
      >
        <template v-slot:body-cell-action="props">
          <q-td :props="props">
            <div>
              <q-btn
                icon="more_vert"
                flat
                round
                style="color: #2b3347; text-decoration: none"
              />

              <q-menu class="menu-container" style="width: 16%; padding: 5px">
                <q-list>
                  <q-item
                    clickable
                    v-close-popup
                    class="menu-list"
                    @click="router.push({ name: 'qa-task-details' })"
                  >
                    <q-item-section>View Task</q-item-section>
                  </q-item>

                  <q-item clickable v-close-popup>
                    <q-item-section>
                      <q-item-label>Watch Task</q-item-label>
                    </q-item-section>
                    <q-item-section avatar>
                      <q-toggle
                        class="toggle-button"
                        v-model="watch_task"
                        color="red"
                        :val="props.value"
                      />
                    </q-item-section>
                  </q-item>
                  <q-item clickable v-close-popup class="menu-list">
                    <q-item-section>Reassign Task</q-item-section>
                  </q-item>
                  <q-item clickable v-close-popup class="menu-list">
                    <q-item-section>Disregard Task</q-item-section>
                  </q-item>
                </q-list>
              </q-menu>
            </div>
          </q-td>
        </template>
      </q-table>

      <!-- Table with checkbox -->
      <div class="q-mt-xl"></div>
      <q-table
        :rows="rowsWithCheckBox"
        :columns="columnsWithCheckBox"
        row-key="name"
        class="pt-table"
        flat
      >
        <template v-slot:header-cell-selection="props">
          <q-th :props="props">
            <q-checkbox size="sm" v-model="selectAll" />
          </q-th>
        </template>
        <template v-slot:body-cell-selection="props">
          <q-td :props="props">
            <q-checkbox
              size="sm"
              v-model="selectedUsersID"
              :val="props.row.id"
            />
          </q-td>
        </template>
        <template v-slot:body-cell-action="props">
          <q-td :props="props">
            <div>
              <q-btn
                icon="more_vert"
                flat
                round
                style="color: #2b3347; text-decoration: none"
              />

              <q-menu class="menu-container" style="width: 16%; padding: 5px">
                <q-list>
                  <q-item
                    clickable
                    v-close-popup
                    class="menu-list"
                    @click="router.push({ name: 'qa-task-details' })"
                  >
                    <q-item-section>View Task</q-item-section>
                  </q-item>

                  <q-item clickable v-close-popup>
                    <q-item-section>
                      <q-item-label>Watch Task</q-item-label>
                    </q-item-section>
                    <q-item-section avatar>
                      <q-toggle
                        class="toggle-button"
                        v-model="watch_task"
                        color="red"
                        :val="props.value"
                      />
                    </q-item-section>
                  </q-item>
                  <q-item clickable v-close-popup class="menu-list">
                    <q-item-section>Reassign Task</q-item-section>
                  </q-item>
                  <q-item clickable v-close-popup class="menu-list">
                    <q-item-section>Disregard Task</q-item-section>
                  </q-item>
                </q-list>
              </q-menu>
            </div>
          </q-td>
        </template>
      </q-table>
      <!-- **************************Notification******************************* -->
      <hr class="q-my-md q-mt-xl" />
      <h4 class="pt-bg-accent-1 text-white q-pa-sm">Notification</h4>
      <q-btn
        class="pt-bg-accent-0 text-white"
        label="Show Notification"
        @click="showNotify()"
      />

      <!-- **************************Card******************************* -->
      <hr class="q-my-md q-mt-xl" />
      <h4 class="pt-bg-accent-1 text-white q-pa-sm">Card</h4>
      <q-card class="pt-border-radius-12">
        <q-card-section>
          <h6 class="q-my-none pt-text-accent-0">Card title</h6>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Amet, facere
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>

<script>
import { ref, watch } from "vue";
import { useQuasar } from "quasar";
import { useRoute, useRouter } from "vue-router";
import Filters from "../components/Filters.vue";
import Pagination from "../components/Pagination.vue";
export default {
  components: {
    Filters,
    Pagination,
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
      page: 1,
      rowsPerPage: 5,
    });

    // for table
    let columns = [
      {
        name: "name",
        required: true,
        label: "Task Name",
        align: "left",
        field: (row) => row.name,
        format: (val) => `${val}`,
        sortable: true,
      },
      {
        name: "overall",
        align: "left",
        label: "Overall",
        field: "overall",
      },
      {
        name: "spent_today",
        align: "left",
        label: "Spent Today",
        field: "spent_today",
      },
      {
        name: "overall_delays",
        align: "left",
        label: "Overall Delays",
        field: "overall_delays",
      },

      {
        name: "advance",
        align: "left",
        label: "Advance",
        field: "advance",
      },
      {
        name: "action",
        align: "left",
        label: "",
        field: "action",
      },
    ];

    let watch_task = ref(false);

    let rows = [
      {
        id: 1,
        name: "Wireframe Prototype",
        overall: "5.79",
        spent_today: 3.12,
        overall_delays: 0,
        advance: 2.21,
        action: " ",
      },
      {
        id: 2,
        name: "Flowchart",
        overall: "5.79",
        spent_today: 3.12,
        overall_delays: 0,
        advance: 2.21,
        action: " ",
      },
    ];

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

    // for table with checkbox
    let columnsWithCheckBox = [
      {
        name: "selection",
        align: "left",
        label: "",
        field: "selection",
      },
      {
        name: "name",
        required: true,
        label: "Task Name",
        align: "left",
        field: (row) => row.name,
        format: (val) => `${val}`,
        sortable: true,
      },
      {
        name: "overall",
        align: "left",
        label: "Overall",
        field: "overall",
      },
      {
        name: "action",
        align: "left",
        label: "",
        field: "action",
      },
    ];
    let rowsWithCheckBox = [
      {
        id: 1,
        name: "Wireframe Prototype",
        overall: "5.79",
        action: " ",
      },
      {
        id: 2,
        name: "Flowchart",
        overall: "5.79",
        action: " ",
      },
    ];

    let selectedUsersID = ref([]);
    watch(selectAll, () => {
      if (selectAll.value) {
        console.log("rows.value ", rows);
        rows.forEach((a) => {
          selectedUsersID.value.push(a.id);
        });
      } else {
        selectedUsersID.value = [];
      }
    });

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
      // for table with checkbox
      columnsWithCheckBox,
      rowsWithCheckBox,
      selectAll,
      selectedUsersID,
      // for notification
      showNotify,
      DarkMode,
    };
  },
};
</script>
