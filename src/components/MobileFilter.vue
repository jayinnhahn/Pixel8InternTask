<template>
  <div class="filter">
    <div>
      <q-dialog
        v-model="FilterDialogState"
        position="bottom"
        persistent
        :class="DarkMode && 'pt-dark-mode'"
      >
        <q-card class="filter-card pt-bg-primary pt-text-primary">
          <q-card-section>
            <q-btn
              flat
              icon="arrow_back"
              class="back-icon text-white q-mt-md q-ml-md fixed-top-left"
              @click="ToggleFilterDialogState()"
            />
            <div class="top-content">
              <p class="text-center text-bold text-20">Filters</p>
            </div>
            <div v-if="options.length" class="q-mt-xl">
              <div class="text-bold">Type</div>
              <div class="q-mt-md">
                <!-- types -->
                <div class="flex" style="gap: 10px">
                  <div v-for="type in options" :key="type.id">
                    <q-btn
                      flat
                      no-caps
                      size="10px"
                      class="btn-types not-selected"
                      :class="{ selected: type.selected }"
                      @click="selected(type)"
                      >{{ type.label }}</q-btn
                    >
                  </div>
                </div>
              </div>
            </div>
            <div v-if="isSearchVisible" class="q-mt-xl">
              <div class="text-bold">Search</div>
              <q-input
                class="pt-border-accent-0 pt-input-field full-width q-px-md q-mr-md"
                dense
                borderless
                v-model="keyword"
                placeholder="Search"
                ><template v-slot:append>
                  <q-icon
                    @click="searchKeyword()"
                    class="pt-text-accent-0 cursor-pointer"
                    :class="!keyword && 'disabled'"
                    name="search"
                  /> </template
              ></q-input>
            </div>
            <div v-if="isDateRangeVisible">
              <q-separator class="q-my-md" />
              <div class="text-bold">Date</div>
              <div class="date q-mt-sm">
                <q-input
                  dense
                  borderless
                  :model-value="dateRange ? dateRange.from : dateRange"
                >
                  <template v-slot:append>
                    <q-icon
                      name="event"
                      :class="
                        calendar ? 'pt-text-accent-0' : 'pt-text-accent-2'
                      "
                      @click="calendar = true"
                    />
                  </template>
                </q-input>
                <q-input
                  dense
                  borderless
                  :model-value="dateRange ? dateRange.to : dateRange"
                >
                </q-input>
              </div>
            </div>
          </q-card-section>
          <!-- the M and Y is the default layout of q-date-->
          <div v-if="calendar" class="calendar">
            <q-separator size="5px" />
            <q-date
              class="full-width no-shadow pt-bg-primary"
              mask="MMM DD, YYYY"
              v-model="dateRange"
              @update:model-value="filter('date-range')"
              range
              color="red-6"
            />
          </div>
        </q-card>
      </q-dialog>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { date, useQuasar } from "quasar";
import {
  FilterDialogState,
  ToggleFilterDialogState,
} from "../composables/Triggers";
import { GetSearchResult } from "../composables/Search";
// import {DarkMode} from "src/core/composables/Triggers"
export default {
  name: "MobileFilter",
  props: {
    dynamicOptions: {
      type: Array,
      default: () => [],
    },
    pathEndPoint: {
      type: String,
      default: "",
    },
    searchVisible: {
      type: Boolean,
      default: false,
    },
    dateRangeVisible: {
      type: Boolean,
      default: false,
    },
    parameters: {
      type: Object,
      default: () => {},
    },
  },
  setup(props) {
    const $q = useQuasar();
    const calendar = ref(true);
    let dateRange = ref({ from: null, to: null });
    let options = ref(props.dynamicOptions);
    let endPoint = ref(props.pathEndPoint);
    let isSearchVisible = ref(props.searchVisible);
    let isDateRangeVisible = ref(props.dateRangeVisible);
    let params = ref(props.parameters);
    let typeValue = ref(null);
    let keyword = ref(null);
    const selected = (type) => {
      typeValue.value = type.value;
      type.selected = !type.selected;
      options.value.forEach((t) => {
        t.value !== type.value && (t.selected = false);
      });
      !type.selected && (typeValue.value = null);
      filter();
    };

    const searchKeyword = () => {
      keyword.value && filter("search");
    };

    const filter = (action = "type") => {
      let payload;
      if (action === "type") {
        if (typeValue.value !== null) {
          payload = {
            search: {
              type: typeValue.value,
            },
          };
          getSearchResult();
        }
      } else if (action === "date-range") {
        if (dateRange.value) {
          payload = {
            search: {
              from: date.formatDate(dateRange.value.from, "YYYY-MM-DD"),
              to: date.formatDate(dateRange.value.to, "YYYY-MM-DD"),
            },
          };
          getSearchResult();
        }
      } else {
        // Search using keywords
        payload = {
          search: {
            keyword: keyword.value,
          },
        };
        getSearchResult();
      }

      function getSearchResult() {
        // Merge params available
        if (params.value) {
          payload = {
            ...params.value,
            ...payload,
          };
        }
        GetSearchResult({
          endpoint: endPoint.value, // Url of endpoint
          params: payload, // Payload to send in api
        }).then((response) => {
          // Run when form is submitted
          let status = Boolean(response.status === "success");
          $q.notify({
            position: $q.screen.width < 767 ? "top" : "bottom-right",
            classes: `${
              status ? "pt-success-notif" : "pt-error-notif"
            } q-px-lg q-pt-none q-pb-none`,
            html: true,
            message: status
              ? `<div class="text-bold">Search results - ${response.data.length}</div>`
              : `<div class="text-bold">Failed!</div> ${response.message}.`,
          });
        });
      }
    };
    let DarkMode = ref(false);
    return {
      FilterDialogState,
      ToggleFilterDialogState,
      calendar,
      selected,
      options,
      dateRange,
      filter,
      isSearchVisible,
      isDateRangeVisible,
      keyword,
      searchKeyword,
      DarkMode,
    };
  },
};
</script>

<style lang="scss">
.filter {
}

// blurry background
.q-dialog__backdrop {
  pointer-events: fill;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(7px);
}

// content
.filter-card {
  border-radius: 10px 10px 0 0 !important;

  p {
    padding: 0;
    padding-bottom: 12px;
    line-height: normal;
  }

  .line {
    background-color: #ddd8d8;
    padding: 0.3px;
    width: 100%;
    margin: 14px 0;
  }

  .btn-types {
    border-radius: 2px;
    font-weight: 600;
  }

  .not-selected {
    background-color: #e8e8e8;
    color: #202633;
  }

  .selected {
    background-color: #dd3749;
    color: white;
  }

  // range color
  .q-date__calendar-item {
    padding: 0;
  }

  .q-date__calendar-item--fill {
    visibility: unset;
    color: #101010;
    opacity: 22%;
  }

  .q-date__range:before,
  .q-date__range-from:before,
  .q-date__range-to:before {
    background-color: #dedede;
    opacity: unset;
  }

  .bg-red-6 {
    background: #dd3749 !important;
  }

  .spent-container {
    width: 100%;
  }

  .q-input {
    width: 50%;
    border: 1px solid #dd3749;
    border-radius: 3px;
    font-size: 10px;
    padding: 0 10px;
    height: 30px;

    .q-icon {
      font-size: 18px;
      padding-bottom: 12px;
      position: absolute;
      right: -3px;
    }

    .q-field__native {
      font-size: 14px;
      padding-bottom: 19px;
      font-weight: 600;
      opacity: 63%;
      color: #8890a3;
    }
  }

  .date {
    display: flex;
    gap: 15px;

    .q-icon {
      font-size: 18px;
      padding-bottom: 12px;
      position: absolute;
      right: -3px;
    }
  }

  .red {
    color: #dd3749;
  }

  .q-time__header {
    display: none;
  }

  // Calendar styles
  .q-date__header {
    display: none;
  }

  .q-date__main {
    background-color: transparent;
    border: none;
  }

  .q-date__navigation {
    button {
      font-weight: bold;
    }
  }

  .q-date__calendar-item button {
    border-radius: 3px;
  }

  .q-date__calendar-weekdays > div {
    color: #dd3749;
    opacity: 100;
    font-weight: 600;
  }
}
</style>
