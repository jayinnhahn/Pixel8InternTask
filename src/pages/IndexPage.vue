<script setup>
// Import Functions:
// These are the necessary functions that need to be imported in

import { ref } from "vue";
import axios from "axios";

// Select Variable
// this is the select variable for the post and delete request
const selected = ref([]);

// Main Variables:
// These are the main arrays that would be used for the application
const rows = ref([]);

// Input Variables:
// These are the mostly input datas given by the users if they want to do a post and put request
let userId_Value = ref(null);
let Title_Value = ref(null);

// GetData()
// This is the get function to get all of the data from the JSON Placeholder API
// - Use the axios get function to get the data from the api
// - Push the variables inside the row

const getData = () => {
  axios.get("https://jsonplaceholder.typicode.com/todos").then((response) => {
    rows.value = response.data;
  });
};

getData();

// PostData()
// This is the post function used if you want to add a new variable to the array
// - Use the post api to post the inputted variables to the json api
// - Get the inputted variables from the input data
// - unshift the variables
const postData = () => {
  axios
    .post("https://jsonplaceholder.typicode.com/todos", {
      userId: userId_Value.value,
      title: Title_Value.value,
      completed: false,
    })
    .then((response) => {
      console.log(response.status);

      // Response.status 200 means it's an ok http request for get and post request
      if (response.status === 200) {
        rows.value.unshift(response.data);
      } else {
        console.log(" The data that was inputted had an error");
        console.log(response.data);
      }
    });
};

// PutData()
// This is to edit a single part of the array
// - Use the put request using axios the data there would be the inputted variabels
// - Edit the variables using findindex functionss
const putData = () => {
  axios
    .put("https://jsonplaceholder.typicode.com/todos/" + selected.value.id, {
      userId: userId_Value.value,
      title: Title_Value.value,
    })
    .then((response) => {
      console.log(response.status);
      // The successful result of a PUT or a DELETE are the following:
      // 200 for an okay status
      // 204 for no content status
      // 201 If it was created when the resource is uploaded for the first time).
      if (
        response.status === 200 ||
        response.status === 201 ||
        response.status === 204
      ) {
        let index = rows.value.findIndex((row) => row.id === selected.value.id);
        rows.value[index].title = response.data.title;
        rows.value[index].userId = response.data.userId;
        rows.value[index].completed = "true";
      } else {
        console.log(" The data that was inputted had an error");
        console.log(response.data);
      }
    });
};

// deleteData()
// This is to delete row in the array
// - use the delete request using axios
// - then use filter after you use findindex
const deleteData = () => {
  axios
    .delete("https://jsonplaceholder.typicode.com/todos/" + selected.value.id)
    .then((response) => {
      // The successful result of a PUT or a DELETE are the following:
      // 200 for an okay status
      // 204 for no content status
      // 201 If it was created when the resource is uploaded for the first time).
      console.log(response.status);
      if (response.status === 200) {
        rows.value = rows.value.filter((row) => row.id !== selected.value.id);
      } else {
        console.log(" The data that was inputted had an error");
        console.log(response.data);
      }
    });
};

// The purpose of this const array is to set around the collumns
const columns = [
  {
    name: "Id",
    label: "Id",
    field: "id",
    align: "left",
    sortable: true,
  },
  {
    name: "UserId",
    label: "UserId",
    field: "userId",
    align: "left",
    sortable: true,
  },

  { name: "title", label: "Title", field: "title", align: "left" },
  {
    name: "completed",
    label: "Completed",
    field: "completed",
    align: "left",
  },
];

// OnRowClick
// The main purpose of this function is to edit the input everytime the row is selected\
// - get a parameter and connect it with the selected.value array
// - edit the input with the new array using findindedx
const onRowClick = (evt, row) => {
  selected.value = row;
  let index = rows.value.findIndex((row) => row.id === selected.value.id);
  Title_Value.value = rows.value[index].title;
  userId_Value.value = rows.value[index].userId;
};
</script>

<template>
  <q-layout>
    <q-page-container>
      <div class="row flex-center">
        <div class="q-mt-xl wrap">
          <q-card class="q-ml-xl">
            <div class="q-pa-md">
              <!-- Q-Table-->
              <!-- This is the table portion it has featuristic components such as selectiona nd v-model-->
              <q-table
                title="Todo List"
                :rows="rows"
                :columns="columns"
                row-key="id"
                @row-click="onRowClick"
              />
            </div>
          </q-card>
        </div>

        <div class="q-ma-lg"></div>

        <div class="flex-break"></div>
        <q-card class="q-ml-xl q-mt-lg shadow-3">
          <q-form class="q-ma-xl">
            <!-- Q-Input-->
            <!-- This is where the inputted variables get passed around and being inputted -->
            <q-input
              filled
              type="number"
              v-model="userId_Value"
              label="User Id"
            />
            <q-input
              filled
              v-model="Title_Value"
              label="Title"
              class="q-pt-md"
            />

            <!-- Q-Button-->
            <!-- This is where the button is used it has the @click function to do the required function when it's being clicked -->
            <div class="q-mt-md">
              <q-btn
                label="post"
                type="submit"
                color="primary"
                @click="postData"
              />
              <q-btn
                label="put"
                color="purple"
                class="q-ma-md q-ml-md"
                @click="putData"
              />
              <q-btn label="delete" color="red" @click="deleteData" />
            </div>
          </q-form>
        </q-card>
      </div>
    </q-page-container>
  </q-layout>
</template>
