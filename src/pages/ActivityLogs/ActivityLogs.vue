<template>
  <!--  Desktop View  -->
  <!-- This is the desktop portion of the application when you resize the application it automatically changes to this form -->
  <div class="activity-logs">
    <div class="bg-white q-pa-lg gt-xs">
      <h5 class="text-26 text-semibold q-mb-md q-my-none">Activity Logs</h5>
      <div class="flex row q-py-md">
        <div class="col-8">
          <!-- Filter Component
          The Filter component shows the search bar it is a component that is imported to the page -->
          <Filters :searchVisible="true" />
        </div>
        <div class="col-4">
          <!-- Pagination Component
          The Pagination Component shows the data that is shown per page and the following it is a component that is imported into the page -->
          <Pagination
            v-model:pagination="pagination"
            :numRows="[
              1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19,
              20,
            ]"
          />
        </div>
      </div>
      <!-- Q-Table
      The Q table contains all the data found in the rows and collumn and shown in table format -->
      <q-table
        :rows="rows"
        :columns="columns"
        row-key="activity"
        class="pt-table"
        flat
      >
      </q-table>
    </div>

    <!-- Mobile View -->
    <!-- This is the mobile portion of the application when you resize the application it automatically changes to this form -->
    <div class="show-on-mobile">
      <q-btn @click="ToggleFilterDialogState()">click me</q-btn>
      <!-- Mobilefitler
      Mobilefilter is a component that shows the filter part of the application -->
      <MobileFilter :dateRangeVisible="true" />

      <!-- Q-Card
      The Q-card to show the information that was given in rows -->
      <div v-for="activity in LogList" :key="activity.id">
        <ActivityCard :activity="activity" />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "./style/activityLogs.scss";
</style>

<script src="./script/ActivityLog.js"></script>
