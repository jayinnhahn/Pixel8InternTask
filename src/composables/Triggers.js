import { ref } from "vue";

let DialogState = ref(false);
let LeftDrawerState = ref(false);
let FilterDialogState = ref(false);
let MenuBtnState = ref(true);
let SearchBtnState = ref(true);
let ActiveModule = ref(null);

const TogglePmDialogState = () => {
  DialogState.value = !DialogState.value;
};

const ToggleLeftDrawer = () => {
  LeftDrawerState.value = !LeftDrawerState.value;
};

const ToggleFilterDialogState = () => {
  FilterDialogState.value = !FilterDialogState.value;
};

const ToggleMenuBtnState = (value) => {
  MenuBtnState.value = value;
};

const ToggleSearchBtnState = (value) => {
  SearchBtnState.value = value;
};
/**
 * Export  DialogState as readonly (real time copy of Dialog)
 */
export {
  DialogState,
  TogglePmDialogState,
  LeftDrawerState,
  ToggleLeftDrawer,
  FilterDialogState,
  ToggleFilterDialogState,
  MenuBtnState,
  ToggleMenuBtnState,
  SearchBtnState,
  ToggleSearchBtnState,
  ActiveModule,
};
