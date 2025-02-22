class UserResponse {
	users = $state();
	error = $state();
	isLoading = $state(false);
}

export default function useFetchUser() {
	const resp = new UserResponse();

	async function fetchData() {
		resp.isLoading = true;
		try {
			const response = await fetch('https://randomuser.me/api/?results=3');
			resp.users = (await response.json()).results;
			resp.error = undefined;
		} catch (err) {
			resp.error = err;
			resp.users = undefined;
		}
		resp.isLoading = false;
	}

	fetchData();
	return resp;
}
