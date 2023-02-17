<script setup>
// Import Composables:
// This is very important since the composables contain the needed information for the application to work
import { MyTasks, FinishedTasks, DeletedTasks } from "../composables/Tasks";
import { ref } from "vue";
// Let Array:
// This would set up certain variables that would be used on the mytasks page
let text = ref(null);
let form = ref(null);
let selectedTodo = ref(null);
let toDelete = ref(null);
let toMarkAsDone = ref(null);
let showDialog = ref(false);
// AddTodo Function: Adds a new task list
// This function would push the values to the MyTasks Array found in the composables file
const addTodo = () => {
  let id = MyTasks.value.length;
  MyTasks.value.push({
    id: ++id,
    todo: text.value,
  });

  text.value = null;
  form.value.reset();
};
// SelectTodo: It is the function called when you select a task
// This function would just get the value of the selected part in the mytasks
const selectTodo = (row) => {
  selectedTodo.value = row;
  text.value = row.todo;
};
// UpdateTodo: it's the function that updates the values found in the mytasks
// This function would first find the selectedTodo and then would help you edit the selected task
const updateTodo = () => {
  let index = MyTasks.value.findIndex((t) => t.id === selectedTodo.value.id);
  index !== -1 && (MyTasks.value[index].todo = text.value);

  text.value = selectedTodo.value = null;
  form.value.reset();
};
// Removetodo: The use of this function is to remove the tasks and be put on the removedtask page
// This function would push the mytasks value to the deletedtasks array
const removeTodo = () => {
  let index = MyTasks.value.findIndex((t) => t.id === toDelete.value.id);
  index !== -1 && MyTasks.value.splice(index, 1);
  DeletedTasks.value.push(toDelete.value);
  console.log("deleted" + toDelete.value);

  toDelete.value = null;
  showDialog.value = false;
};
// ToggleDialog: This function would show confirm the user whenever they plan on finishing a task or deleting
// This woukd show an dialog box using the html part of it but the main part of this function
// is the confirmation of variables such as the toMarkasDone and toDelete values
const toggleDialog = (row, status) => {
  showDialog.value = true;
  toMarkAsDone.value = toDelete.value = null;
  status !== "delete" ? (toMarkAsDone.value = row) : (toDelete.value = row);
  console.log("Toggle Dialog");
};
// MarkAsDone: This function is for the finishing of tasks
// The main part of this function is to push the mytasks list to the finishedtasks array and file
const markAsDone = () => {
  let index = MyTasks.value.findIndex((t) => t.id === toMarkAsDone.value.id);
  index !== -1 && MyTasks.value.splice(index, 1);
  FinishedTasks.value.push(toMarkAsDone.value);
  toMarkAsDone.value = null;
  showDialog.value = false;
  console.log("hello" + FinishedTasks.value);
};
</script>
<!-- Template File: This template tag that contains everything on the mytasks page -->
<template>
  <div class="flex justify-center">
    <div class="full-width q-pa-xl">
      <h6 class="q-my-none q-mb-md">My Tasks</h6>
      <q-form ref="form" @submit="!selectedTodo ? addTodo() : updateTodo()">
        <div class="row gap">
          <!-- Input Tag:
               This is where the users would input the description for their tasks-->
          <q-input
            v-model="text"
            dense
            outlined
            label="What's your todo?"
            class="q-pa-none col-10"
            lazy-rules
            :rules="[(val) => !!val || 'Field is required']"
          />
          <div class="col-2 q-pl-sm">
            <!-- Button Tag:
                 This is where the users would click to add a tasks or edit a tasks since this button changes when selected-->
            <q-btn
              :class="`bg-${!selectedTodo ? 'primary' : 'secondary'} fit`"
              color="white"
              glossy
              dense
              flat
              type="submit"
              :icon="!selectedTodo ? 'add' : 'edit'"
            />
          </div>
        </div>
      </q-form>
      <div class="q-mt-xl">
        <!-- Card Tag:
             This shows all the tasks the user inputted earlier it's a v-for loop that adds the tasks-->
        <q-card
          @click="selectTodo(row)"
          class="q-mt-sm"
          v-for="row in MyTasks"
          :key="row.id"
        >
          <!-- Card Section Tag:
               This is the design for the task listed down in the mytasks -->
          <q-card-section
            :class="`bg-${
              MyTasks.id === row.id ? 'secondary' : 'primary'
            } text-white q-pa-none flex justify-between items-center`"
          >
            <div class="text-bold q-pl-lg">{{ row.todo }}</div>
            <div class="bg-white q-pa-sm">
              <!-- Button Tag:
                   This button tag is responsible for if you want to finish a task, It changes it's color when you are done clicking it-->
              <q-btn
                @click.stop="toggleDialog(row, 'mark-done')"
                flat
                icon="check_circle_outline"
                color="green"
              />
              <!-- Button Tag:
                   This button tag is responsible for if you want to remove a task -->
              <q-btn
                @click.stop="toggleDialog(row, 'delete')"
                flat
                icon="delete_outline"
                color="red"
              />
            </div>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </div>
  <!-- Dialog Box
       This is more of the confirmation for the users if they want to finish or delete the task already or not-->
  <q-dialog v-model="showDialog" persistent>
    <q-card>
      <q-card-section class="row items-center">
        <!-- Div Element
             This is more of the confirmation for the users if they want to finish or delete the task already or not-->
        <div v-if="toMarkAsDone" class="q-ml-sm">
          Are you sure you want to mark
          <span class="text-green">"{{ toMarkAsDone.todo }}"</span> as done?
        </div>
        <div v-else class="q-ml-sm">
          Are you sure you want to delete
          <span class="text-green">"{{ toDelete.todo }}"</span>?
        </div>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn flat label="Cancel" color="primary" v-close-popup />
        <!-- Button Element
             This is where the users would click the button to continue the removeTodo and Markasdone function-->
        <q-btn
          @click="toMarkAsDone ? markAsDone() : removeTodo()"
          flat
          label="Yes"
          color="primary"
          v-close-popup
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>
