<template>
  <transition appear enter-active-class="animated fadeIn" leave-active-class="animated fadeOut" :duration="2000">
    <div class="pt-text-primary q-pa-lg">
      <div v-if="!pageLoadingState">
        <div class="flex justifty-start items-center q-mt-sm q-mb-lg gt-xs">
          <q-btn @click="$router.go(-1)" round dense flat icon="arrow_back" />
          <h5 class="text-26 text-semibold q-my-none q-ml-md">
            {{ !route.params.id ? "Add" : "Edit" }} User
          </h5>
        </div>
        <q-form ref="userForm" greedy>
          <div v-if="!route.params.id">
            <label class="text-weight-medium">Email Address</label>
            <q-input dense borderless v-model="form.email_address" placeholder="Enter Email Address"
              :rules="[(val) => !!val || '', isValidEmail]" hide-bottom-space
              class="pt-input-field standard pt-border-accent-3 pt-border-radius-10 q-mt-sm" />
            <div class="pt-text-accent-2 text-10">
              Link user information using the registered email address
            </div>
          </div>
          <div class="q-mt-md">
            <label class="text-weight-medium">Level</label>
            <q-input dense borderless v-model="form.level" type="number" :rules="levelRule" hide-bottom-space
              placeholder="Enter User Level"
              class="pt-input-field standard pt-border-accent-3 pt-border-radius-10 q-mt-sm" />
          </div>
          <div class="q-mt-md">
            <label class="text-weight-medium">Role</label>
            <q-select class="pt-border-radius-10 pt-border-accent-3 pt-select-field standard q-mt-sm" dense borderless
              emit-value map-options v-model="form.role" option-label="label" option-value="value"
              :label="form.role !== null ? '' : 'Select User Role'" :options="role_options"
              :rules="[(val) => (val !== null && val !== '') || '']" hide-bottom-space :popup-content-class="
                DarkMode ? 'pt-option-style-dark' : 'pt-option-style-light'
              " options-selected-class="pt-selected-class" transition-show="scale" transition-hide="scale"
              behavior="menu" />
          </div>
          <div class="q-mt-md">
            <label class="text-weight-medium">Supervisor</label>
            <q-select :disable="!form.level" ref="assign_toRef"
              class="pt-border-radius-10 pt-border-accent-3 pt-select-field standard q-mt-sm" dense borderless use-input
              input-debounce="500" v-model="form.supervisor_id" option-label="full_name" option-value="id" :placeholder="
                form.supervisor_id !== null ? '' : 'Select supervisor'
              " emit-value map-options :options="supervisor_options" @filter="filterEmployeeName" hide-bottom-space
              :popup-content-class="
                DarkMode ? 'pt-option-style-dark' : 'pt-option-style-light'
              " options-selected-class="pt-selected-class" transition-show="scale" transition-hide="scale"
              behavior="menu">
              <template v-slot:no-option>
                <q-item>
                  <q-item-section class="text-grey">
                    No results
                  </q-item-section>
                </q-item>
              </template>
            </q-select>
          </div>
        </q-form>
        <div :class="`${$q.screen.width < 767 && 'absolute-bottom q-px-xl'}`">
          <q-btn @click="addUser()" dense flat no-caps :label="`${!route.params.id ? 'Add' : 'Update'} Now`"
            class="pt-button pt-border-accent-0 pt-bg-accent-0 q-px-xl q-mt-xl" />
        </div>
      </div>
      <q-inner-loading class="absolute-center pt-bg-primary text-20 full-width full-height" :showing="pageLoadingState"
        color="accent-0" />
    </div>
  </transition>
</template>

<script src="./script/AddUser.js"></script>
