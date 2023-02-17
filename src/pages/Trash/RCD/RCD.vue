/* eslint-disable */
<template>
  <transition
    appear
    enter-active-class="animated fadeIn"
    leave-active-class="animated fadeOut"
    :duration="2000"
  >
    <div class="trash-rcd pt-text-primary">
      <div v-if="!pageLoadingState">
        <div class="q-px-lg q-pt-lg gt-xs">
          <div class="q-mt-sm q-mb-lg flex justify-between">
            <h5 class="text-28 text-weight-medium q-my-none">Trash | RCD</h5>
            <div class="flex justify-between items-center">
              <Filters
                dynamicHeight="34"
                :searchVisible="true"
                :filterDateVisible="false"
                :labelVisible="false"
              />
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
          </div>

          <!-- Filter and Pagination -->
          <div class="flex justify-between q-mb-md gt-xs">
            <div>
              <Filters />
            </div>
            <div class="flex items-center">
              <div
                class="text-14 pt-pt-text-accent-1 q-mr-md"
                :class="$q.screen.width < 769 && 'hidden'"
              ></div>
              <Pagination
                v-model:pagination="pagination"
                :numRows="listOfRCD"
              />
            </div>
          </div>
        </div>

        <!-- Table for desktop and tablet view -->
        <div class="pt-main-scroll table-scroll">
          <q-table
            :rows="listOfRCD"
            :columns="columns"
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
                  v-model="selectedRCD"
                  :val="props.row.id"
                />
              </q-td>
            </template>
            <template v-if="!listOfRCD.length" v-slot:bottom-row>
              <q-tr>
                <q-td colspan="100%" class="text-center">
                  No results found!
                </q-td>
              </q-tr>
            </template>
          </q-table>
        </div>
        <div class="show-on-mobile">
          <q-tabs
            v-model="tab"
            indicator-color="yellow"
            class="text-weight-bold text-grey"
            active-color="black"
            no-caps
          >
            <q-tab name="all" label="All" />
            <q-tab name="individual_collectors" label="Individual Collectors" />
            <q-tab name="summary" label="Summary of General Collections" />
            <q-tab name="cashdeposit" label="Cash Deposit" />
            <q-tab name="checkdeposit" label="Check Deposit" />
          </q-tabs>
          <!-- q-tabs -->
          <!-- This shows the tab panels to show that you can change the page like tagbs you find in your web browser -->
          <q-tab-panels v-model="tab" animated>
            <q-tab-panel name="all">
              <div v-for="list in listOfRCD" :key="list.id">
                <RCDCard :list="list" />
              </div>
            </q-tab-panel>

            <q-tab-panel name="individual_collectors">
              <div v-for="list in listOfRCD" :key="list.id">
                <RCDCard :list="list" />
              </div>
            </q-tab-panel>

            <q-tab-panel name="summary">
              <div v-for="list in listOfRCD" :key="list.id">
                <RCDCard :list="list" />
              </div>
            </q-tab-panel>

            <q-tab-panel name="cashdeposit">
              <div v-for="list in listOfRCD" :key="list.id">
                <RCDCard :list="list" />
              </div>
            </q-tab-panel>

            <q-tab-panel name="checkdeposit">
              <div v-for="list in listOfRCD" :key="list.id">
                <RCDCard :list="list" />
              </div>
            </q-tab-panel>
          </q-tab-panels>

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

<script src="./script/RCD.js"></script>

<style lang="scss">
@import "./style/RCD.scss";
</style>
