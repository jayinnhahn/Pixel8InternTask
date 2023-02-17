<template>
  <transition
    appear
    enter-active-class="animated fadeIn"
    leave-active-class="animated fadeOut"
    :duration="2000"
  >
    <div class="pt-text-primary">
      <div v-if="!pageLoadingState">
        <div class="q-px-lg q-pt-lg gt-xs">
          <div class="flex justify-between q-mt-sm q-mb-lg">
            <div class="flex justify-start">
              <q-btn
                round
                dense
                flat
                icon="arrow_back"
                @click="$router.go(-1)"
              />
              <h5 class="text-26 text-semibold q-my-none q-ml-sm">
                Special Education Fund
              </h5>
            </div>

            <div class="flex justify-end">
              <div class="q-pr-md">
                <q-btn
                  round
                  icon="edit"
                  dense
                  flat
                  no-caps
                  outlined
                  class="pt-border-accent-0 pt-bg-hover-accent-0 q-px-xl"
                  @click="
                    $router.push({
                      name: 'rpt-allocation-add',
                      params: {},
                    })
                  "
                />
              </div>
              <q-btn
                round
                icon="delete"
                dense
                flat
                no-caps
                outlined
                class="pt-border-accent-0 pt-bg-hover-accent-0 q-px-xl q-pl-md"
                @click="deleteDataList()"
              />
            </div>
          </div>
        </div>

        <!-- Table for desktop and tablet view -->
        <div class="pt-main-scroll table-scroll">
          <q-table
            :rows="dataList"
            :columns="columns"
            v-model:pagination="pagination"
            row-key="work_type"
            class="pt-table gt-xs"
            flat
          >
            <template v-if="!dataList.length" v-slot:bottom-row>
              <q-tr>
                <q-td colspan="100%" class="text-center">
                  No results found!
                </q-td>
              </q-tr>
            </template>
          </q-table>
        </div>
        <div class="show-on-mobile q-pa-lg">
          <div v-for="user in dataList" :key="user.id">
            <AllocationInfoCard :user="user" />
            <!-- <UserCard @deleteUser="deleteUser(user)" :user="user" /> -->
          </div>
          <div class="fixed-bottom q-px-xl q-py-lg">
            <q-btn
              dense
              flat
              no-caps
              label="Edit"
              class="pt-button pt-border-accent-0 pt-bg-accent-0 q-px-xl q-mt-xl"
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
      <!-- <MobileFilter :searchVisible="true" :pathEndPoint="'userManagement'" /> -->
    </div>
  </transition>
</template>

<script src="./scripts/AllocationInformation.js" />

<!-- <style lang="scss" scoped>
 @import './styles/SummaryGeneralCollections.scss';
</style> -->
