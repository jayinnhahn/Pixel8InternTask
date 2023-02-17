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
          <div class="flex justifty-start items-center q-mt-sm q-mb-lg">
            <q-btn round dense flat icon="arrow_back" @click="$router.go(-1)" />
            <h5 class="text-26 text-semibold q-my-none q-ml-sm">
              {{ !route.params.id ? "Add" : "Edit" }} RPT Allocation
            </h5>
          </div>
        </div>
        <div class="pt-main-scroll standard-scroll padding-top-bottom-lg">
          <!-- <div class="text-20 text-semibold q-mb-md">O.R Details</div> -->
          <q-form ref="transactionForm" greedy class="standard-form-width">
            <div>
              <label>Fund Type</label>
              <q-select
                class="pt-border-radius-10 pt-border-accent-3 pt-select-field standard q-mt-sm"
                dense
                borderless
                emit-value
                map-options
                v-model="form.fund_type"
                option-label="label"
                option-value="value"
                :label="form.fund_type !== null ? '' : 'Select Fund Type'"
                :options="fundTypeOptions"
                :rules="[(val) => (val !== null && val !== '') || '']"
                hide-bottom-space
                :popup-content-class="
                  DarkMode ? 'pt-option-style-dark' : 'pt-option-style-light'
                "
                options-selected-class="pt-selected-class"
                transition-show="scale"
                transition-hide="scale"
                behavior="menu"
              />
            </div>
            <div class="q-mt-lg">
              <div
                v-for="allocations in form.allocations"
                :key="allocations"
                class="q-mt-md pt-border-accent-3 pt-border-radius-10 bg-grey-2 overflow-hidden pt-border-radius"
              >
                <div class="q-pa-md">
                  <div>
                    <div class="flex justify-between">
                      <label>Entity Share</label>
                      <q-icon
                        v-if="form.allocations.length > 1"
                        name="iconfont icon-delete-fill"
                        size="15px"
                        class="pt-text-accent-1 cursor-pointer"
                        @click="removeCollections(allocations.id)"
                      />
                    </div>
                    <q-input
                      v-model="allocations.entityShare"
                      dense
                      borderless
                      placeholder="Enter Real Property Tax name"
                      :rules="[(val) => (val !== null && val !== '') || '']"
                      hide-bottom-space
                      class="pt-input-field pt-border-accent-3 pt-border-radius-10 width-125 bg-white"
                    />
                  </div>
                  <div class="q-mt-md">
                    <label>Percentage Allocation</label>
                    <q-input
                      v-model="allocations.percentageAllocation"
                      dense
                      borderless
                      mask="##"
                      placeholder="Enter Percentage Allocation"
                      hide-bottom-space
                      class="pt-input-field pt-border-accent-3 pt-border-radius-10 width-125 bg-white"
                    >
                      <template v-slot:append>
                        <div class="text-semibold text-26 text-black">%</div>
                      </template>
                    </q-input>
                  </div>
                </div>
              </div>
              <div
                class="margin-bottom-sm pt-border-radius-15 flex justify-center standard-form-width pt-border-1-dashed q-my-sm q-pa-md"
              >
                <div class="flex justify-start items-center">
                  <q-btn
                    flat
                    round
                    class="pt-bg-accent-0 pt-text-accent-1"
                    no-caps
                    icon="add"
                    @click="addCollections()"
                  />
                  <div class="text-20 text-semibold q-ml-sm">
                    Add Allocation
                  </div>
                </div>
              </div>
            </div>

            <div class="q-mt-md">
              <label>Total Percentage</label>
              <q-input
                dense
                borderless
                readonly
                hide-bottom-space
                v-model="totalPercentage"
                class="pt-input-field pt-border-white pt-border-radius-10 width-125 bg-grey-2"
              >
              </q-input>
            </div>
          </q-form>
          <div
            :class="`${
              $q.screen.width < 767 && 'fixed-bottom q-px-xl q-mb-lg'
            }`"
          >
            <q-btn
              dense
              flat
              no-caps
              label="Save"
              @click="saveAllocation()"
              class="pt-button pt-border-accent-0 pt-bg-accent-0 q-px-xl q-mt-xl"
            />
          </div>
        </div>
      </div>

      <div class="show-on-mobile q-pa-lg">
        <div class="fixed-bottom q-px-xl q-py-lg">
          <q-btn
            dense
            flat
            no-caps
            label="Save"
            class="pt-button pt-border-accent-0 pt-bg-accent-0 q-px-xl q-mt-xl"
          />
        </div>
      </div>
      <q-inner-loading
        class="absolute-center pt-bg-primary text-20 full-width full-height"
        :showing="pageLoadingState"
        color="accent-0"
      />
    </div>
  </transition>
</template>

<script src="./scripts/AddRPT.js"></script>
