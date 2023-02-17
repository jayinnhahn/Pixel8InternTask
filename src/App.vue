<script setup>
import { ref } from "vue";

let todoList = ref([]);
let todo = ref(null);
// this is the array used in the program the todoList is mostly used for the variables inside this contains
// row number. todo which is the name of the tasks and another variable which is is_done shows if the task is done already or not

const addTodo = () => {
	if (validateTodo(todo.value)) {
		let id = todoList.value.length;
		todoList.value.push({
			id: ++id,
			todo: todo.value,
			is_done: false,
		});
		todo.value = null;
	}
};
// The main fuction of this code is to add a certain tasks on the list of tasks down below but it has an if statement connecting to another function which is the validate function.
// So the code must first be validated before it can add another tasks. it uses the push function in a set of array called todoList

const validateTodo = (new_todo) => {
	let index = todoList.value.findIndex((t) => t.todo === new_todo);
	if (index !== -1) {
		alert("Todo already exist!");
		return false;
	} else {
		return true;
	}
};
// The validate todo checks the array called todolist and checks the current todo task and compares it if it is the same then
// the program would send an alert box saying it already exists and returns false on the statement causing it not to add
// but if it works it would add the tasks to the lists of tasks

let selectedTodo = ref(null);
const selectTodo = (row) => {
	selectedTodo.value = row;
	todo.value = row.todo;
};
// this function gives the value of the selected task

const updateTodo = () => {
	if (validateTodo(todo.value)) {
		let index = todoList.value.findIndex((t) => t.id === selectedTodo.value.id);
		index !== -1 && (todoList.value[index].todo = todo.value);

		todo.value = selectedTodo.value = null;
	}
};
// this function is mainly use for moving the tasks index to another to fit another adding tasks.

const markAsDone = (row) => {
	if (confirm(`Are you sure you want to mark ${row.todo} as done?`)) {
		let index = todoList.value.findIndex((t) => t.id === row.id);
		index !== -1 && (todoList.value[index].is_done = true);
	}
};
// since to do applications must use a function that shows if the user completed their tasks
// This programm allows that by changing the done sign to color green

const removeTodo = (row) => {
	if (confirm(`Are you sure you want to delete ${row.todo}?`)) {
		let index = todoList.value.findIndex((t) => t.id === row.id);
		index !== -1 && todoList.value.splice(index, 1);
	}
};
// This function main purpose is to remove a certain tasks from the lists of task it does this by splcing the
// row we can find the row by the index
</script>
<template>
	<div class="d-flex justify-content-center container">
		<div class="w-75">
			<form @submit.prevent="!selectedTodo ? addTodo() : updateTodo()">
				<!-- this would make the program not to add another tasks list when the user selected a certain task-->
				<div class="mb-3 mt-5">
					<label for="todo">What's your todo?</label>
					<div class="d-flex">
						<input
							v-model="todo"
							type="text"
							class="form-control"
							id="todo"
							placeholder="eg. Create todo application"
						/>
						<button v-if="!selectedTodo" class="btn btn-primary ms-3">
							<i class="bi bi-plus-circle-fill"></i>
						</button>
						<button v-else class="btn btn-primary ms-3">
							<i class="bi bi-pencil-square"></i>
						</button>
						<!-- this is the if else of vue js whcih is v-if and v-else the purpose 
						of this code is to check if the selctedToDO fucntion is activated or not
						if it is activated it would only show the edit button but if it is not 
						it would show the add button -->
					</div>
				</div>
			</form>
			<div
				@click="selectTodo(row)"
				v-for="row in todoList"
				:key="row.id"
				class="toast show mt-2 w-100"
			>
				<!-- This would make a for loop using the v function of vue js
			this would make it possible for the task to be made-->
				<div class="toast-header">
					<strong class="me-auto">{{ row.todo }}</strong>
					<button
						:class="`btn btn-${
							row.is_done ? 'success' : 'outline-secondary'
						} btn-sm`"
						@click.stop="markAsDone(row)"
					>
						<i class="bi bi-check-lg"></i>
					</button>
					<!-- this would change the color of the icon when the done click is finished -->
					<button
						class="btn btn-danger btn-sm ms-1"
						@click.stop="removeTodo(row)"
					>
						<i class="bi bi-trash-fill"></i>
					</button>
					<!-- this is the connection for the remove todo icon -->
				</div>
			</div>
		</div>
	</div>
</template>

<style scoped></style>
