import { httpGet } from 'boot/axios';
import { ref, readonly, computed } from 'vue';

// Page loader
let DialogState = ref(false);
const TogglePageLoader = (payload) => {
	DialogState.value = payload;
};

export { TogglePageLoader, DialogState };
