<template>
  <transition
    appear
    enter-active-class="animated fadeIn"
    leave-active-class="animated fadeOut"
    :duration="2000"
  >
    <div>
      <div class="q-px-lg q-pt-lg gt-xs">
        <div v-if="!pageLoadingState">
          <div class="flex justify-between items-center q-mt-sm q-mb-lg">
            <h5 class="text-26 text-semibold q-my-none">RPT Allocation</h5>
            <div class="flex justify-end">
              <Filters
                dynamicHeight="34"
                :searchVisible="true"
                :labelVisible="false"
                :selectVisible="false"
                :filterDateVisible="false"
                :pathEndPoint="'IndividualCollector'"
              />
              <q-btn
                rounded
                dense
                flat
                no-caps
                label="Add RPT"
                class="pt-border-accent-0 pt-bg-hover-accent-0 q-px-xl"
                @click="$router.push({ name: 'rpt-allocation-add' })"
              />
            </div>
          </div>
        </div>
      </div>
      <div class="pt-main-scroll standard-scroll padding-top-bottom-lg">
        <div class="show-on-mobile">
          <!-- q-input -->
          <!-- This is the search bar on top of the cards -->
          <q-input
            dense
            borderless
            placeholder="Search Keyword"
            :rules="[(val) => (val !== null && val !== '') || '']"
            hide-bottom-space
            class="pt-input-field standard pt-border-accent-3 pt-border-radius-10"
          >
            <template v-slot:append>
              <q-icon @click="text = ''" class="cursor-pointer" />
              <q-icon name="search" />
            </template>
          </q-input>

          <div class="fixed-bottom q-px-xl q-py-lg">
            <q-btn
              dense
              flat
              no-caps
              label="Add RPT"
              class="pt-button pt-border-accent-0 pt-bg-accent-0 q-px-xl q-mt-xl"
              @click="
                $router.push({
                  name: 'rpt-allocation-add',
                })
              "
            />
          </div>
        </div>
        <div class="pt-main-card q-mt-md">
          <div
            class="display q-pt-md q-pb-md q-px-lg card-rpt-allocation"
            v-for="allocation in allocationList"
            :key="allocation.id"
          >
            <div
              @click="
                $router.push({
                  name: 'rpt-allocation-information',
                  params: {
                    id: allocation.id,
                  },
                })
              "
            >
              <div class="details flex justify-start q-pb-sm">
                <div class="heading text-semibold text-20">
                  {{ allocation.name }}
                </div>
              </div>
              <div class="separators">
                <hr />
              </div>
              <div class="flex justify-start q-pt-xs text-16">
                RDC :
                <div class="text-semibold q-pl-sm">{{ allocation.rcd }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script src="./scripts/RPTAllocation.js"></script>

<style lang="scss" scoped>
@import url("./styles/RPTAllocation.scss");
</style>
