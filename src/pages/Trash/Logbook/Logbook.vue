<template>
  <transition
    appear
    enter-active-class="animated fadeIn"
    leave-active-class="animated fadeOut"
    :duration="2000"
  >
    <div class="log-book pt-text-primary">
      <div v-if="!pageLoadingState">
        <div class="q-px-lg q-pt-lg gt-xs">
          <div
            class="q-mt-sm q-mb-lg"
            :class="showDeleteBtn ? 'flex justify-between' : ''"
          >
            <h5 class="text-28 text-weight-medium q-my-none">
              Trash | Logbook
            </h5>
            <q-btn
              v-if="showDeleteBtn"
              rounded
              dense
              flat
              no-caps
              label="Permanent Delete"
              class="pt-border-accent-0 pt-bg-hover-accent-0 q-px-xl"
              @click="permanentDelete()"
            />
          </div>

          <!-- Filter and Pagination -->
          <div class="flex justify-between q-mb-md gt-xs">
            <div>
              <Filters :searchVisible="true" />
            </div>
            <div class="flex items-center">
              <div
                class="text-14 pt-pt-text-accent-1 q-mr-md"
                :class="$q.screen.width < 769 && 'hidden'"
              ></div>
              <Pagination
                v-model:pagination="pagination"
                :numRows="listOfLogbook"
              />
            </div>
          </div>
        </div>

        <!-- Table for desktop and tablet view -->
        <div class="pt-main-scroll table-scroll">
          <q-table
            :rows="listOfLogbook"
            :columns="nextColumn ? second_columns : first_columns"
            v-model:pagination="pagination"
            row-key="id"
            class="pt-table gt-xs"
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
                  v-model="selectedLogbook"
                  :val="props.row.id"
                />
              </q-td>
            </template>
            <template v-slot:header-cell-action="props">
              <q-th :props="props">
                <q-btn
                  flat
                  dense
                  :icon="
                    nextColumn
                      ? 'keyboard_double_arrow_left'
                      : 'keyboard_double_arrow_right'
                  "
                  @click="toggleNextColumn()"
                />
              </q-th>
            </template>
            <template v-if="!listOfLogbook.length" v-slot:bottom-row>
              <q-tr>
                <q-td colspan="100%" class="text-center">
                  No results found!
                </q-td>
              </q-tr>
            </template>
          </q-table>
        </div>
        <div class="show-on-mobile q-pa-lg">
          <div v-for="list in listOfLogbook" :key="list.id">
            <LogBookCard :list="list" />
          </div>

          <div class="fixed-bottom q-px-xl q-py-lg">
            <q-btn
              dense
              flat
              no-caps
              label="Permanently Delete"
              class="pt-button pt-border-accent-0 pt-bg-accent-0 q-px-xl q-mt-xl"
              @click="permanentDelete()"
            />
          </div>
        </div>
      </div>
      <q-inner-loading
        class="absolute-center pt-bg-primary text-20 full-width full-height"
        :showing="pageLoadingState"
        color="accent-0"
      />
      <PMDialog :content="$options.components.DeleteConfirmation" />
    </div>
  </transition>
</template>

<script src="./script/Logbook.js"></script>

<style lang="scss">
@import "./style/Logbook.scss";
</style>
