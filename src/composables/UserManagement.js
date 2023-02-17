import { httpGet, httpPost, httpPut, httpDel } from 'boot/axios';
import { ref, readonly, computed } from 'vue';

// Used in table
let SetUsers = ref([]);
let GetUsers = readonly(SetUsers);

// Used in global access
let SetUserInformation = ref(null);
let GetUserInformation = readonly(SetUserInformation);

const FetchUser = () => {
	return new Promise((resolve, reject) => {
		httpGet(`projectManagement/userManagement?personal`, {
			success(response) {
				response.data.status === 'success' && (SetUserInformation.value = response.data.data);

				resolve(response.data);
			},
			catch(response) {
				reject(response);
			},
		});
	});
};

const FetchUsers = () => {
	return new Promise((resolve, reject) => {
		httpGet(`projectManagement/userManagement`, {
			success(response) {
				response.data.status === 'success' && (SetUsers.value = response.data.data);

				resolve(response.data);
			},
			catch(response) {
				reject(response);
			},
		});
	});
};

const FetchUserDetails = (payload) => {
	return new Promise((resolve, reject) => {
		httpGet(
			`projectManagement/userManagement`,
			{
				success(response) {
					resolve(response.data);
				},
				catch(response) {
					reject(response);
				},
			},
			payload
		);
	});
};

const InsertUser = (payload) => {
	return new Promise((resolve, reject) => {
		httpPost('projectManagement/userManagement', payload, {
			success(response) {
				resolve(response.data);
			},
			catch(response) {
				reject(response);
			},
		});
	});
};

const UpdateUser = (payload) => {
	return new Promise((resolve, reject) => {
		httpPut(`projectManagement/userManagement/${payload.id}`, payload, {
			success(response) {
				resolve(response.data);
			},
			catch(response) {
				reject(response);
			},
		});
	});
};

let UserDelete = ref(null);
const DeleteUser = (payload) => {
	return new Promise((resolve, reject) => {
		httpDel(`projectManagement/userManagement/${payload.id}`, payload, {
			success(response) {
				if (response.data.status === 'success') {
					let objectIndex = SetUsers.value.findIndex((b) => b.id === payload.id);
					objectIndex !== -1 && SetUsers.value.splice(objectIndex, 1);
				}
				resolve(response.data);
			},
			catch(response) {
				reject(response);
			},
		});
	});
};

const ValidateEmail = (payload) => {
	return new Promise((resolve, reject) => {
		httpGet(
			'core/accounts',
			{
				success(response) {
					resolve(response.data);
				},
				catch(response) {
					reject(response);
				},
			},
			payload
		);
	});
};

const ValidatePassword = (payload) => {
	return new Promise((resolve, reject) => {
		httpPost('core/verifyPassword', payload, {
			success(response) {
				resolve(response.data);
			},
			catch(response) {
				reject(response);
			},
		});
	});
};

/**
 * Identifies if the user has permission to navigate in certain modules
 */
const IsAllowed = computed(() => {
	try {
		const role = GetUserInformation.value.role;
		return {
			// Used for menu access
			userManagement: role === 0 ? true : false,
			workType: role === 0 ? true : false,
			projects: role !== 0 ? true : false,
			milestones: role !== 0 ? true : false,
			tasks: role !== 0 && role !== 1 ? true : false,
			createTask: role === 2 || role === 3 || role === 4 ? true : false,
			allTask: role === 2 || role === 3 || role === 4 ? true : false,
			requestTaskAssignment: role === 4 || role === 5 || role === 6 ? true : false,
			timesheets: role !== 0 && role !== 1 ? true : false,
			subordinateTimesheets: role === 3 || role === 4 ? true : false,
			organizationTimesheets: role === 2 ? true : false,
			okr: role !== 0 ? true : false,
			createOkr: role !== 0 && role !== 1 ? true : false,
			manageOkr: role !== 0 && role !== 1 ? true : false,
			reports: role !== 0 && role !== 1 ? true : false,
			activityLogs: role !== 0 && role !== 1 ? true : false,
			subordinateLogs: role === 3 || role === 4 ? true : false,
			organizationLogs: role === 2 ? true : false,
			// Determines if response succeded
			responded: true,
			// Used to check if user has permission to see the button for CRUD functionality
			project_module: {
				create: role === 3 ? true : false,
				read: true,
				update: role === 3 ? true : false,
				delete: role === 3 ? true : false,
			},
			milestone_module: {
				create: role === 3 ? true : false,
				read: true,
				update: role === 3 ? true : false,
				delete: role === 3 ? true : false,
			},
			rta_module: {
				create: role !== 4 ? true : false,
				read: true,
				update: role !== 4 ? true : false,
				delete: role !== 4 ? true : false,
			},
		};
	} catch (error) {
		return {
			// Used for menu access
			userManagement: false,
			workType: false,
			projects: false,
			milestones: false,
			tasks: false,
			createTask: false,
			allTask: false,
			requestTaskAssignment: false,
			timesheets: false,
			subordinateTimesheets: false,
			organizationTimesheets: false,
			okr: false,
			createOkr: false,
			manageOkr: false,
			reports: false,
			activityLogs: false,
			subordinateLogs: false,
			organizationLogs: false,
			// Determines if response succeded
			responded: false,
			// Used to check if user has permission to see the button for CRUD functionality
			project_module: {
				create: false,
				read: false,
				update: false,
				delete: false,
			},
			milestone_module: {
				create: false,
				read: false,
				update: false,
				delete: false,
			},
			rta_module: {
				create: false,
				read: false,
				update: false,
				delete: false,
			},
		};
	}
});
export {
	SetUserInformation,
	GetUserInformation,
	GetUsers,
	FetchUser,
	FetchUsers,
	FetchUserDetails,
	InsertUser,
	UpdateUser,
	DeleteUser,
	UserDelete,
	ValidateEmail,
	ValidatePassword,
	IsAllowed,
};
