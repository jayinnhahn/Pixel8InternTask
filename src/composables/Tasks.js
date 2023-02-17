import { ref } from "vue";
// this is where the arrays are called.
let MyTasks = ref([]);
let FinishedTasks = ref([]);
let DeletedTasks = ref([]);

export { MyTasks, FinishedTasks, DeletedTasks };
