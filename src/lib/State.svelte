<script lang="ts">
	// Basic
	// ------------------------------
	let name = $state('Ocean');
	name = 'Bao';

	let count = $state(10);
	const doubleCount = $derived(count * 2);

	const colors = ['red', 'green', 'blue'];

	function incrCount() {
		count++;
	}

	// DOM
	// ------------------------------
	let inputElement: HTMLInputElement;

	$effect(() => {
		inputElement.focus();
	});

	// Condition
	// ------------------------------
	const TRAFFIC_LIGHTS = ['red', 'orange', 'green'];
	let lightIndex = $state(0);

	const light = $derived(TRAFFIC_LIGHTS[lightIndex]);

	function nextLight() {
		lightIndex = (lightIndex + 1) % TRAFFIC_LIGHTS.length;
	}

	// Lifecycle
	// ------------------------------
	let time = $state(new Date().toLocaleTimeString());

	$effect(() => {
		const timer = setInterval(() => {
			time = new Date().toLocaleTimeString();
		}, 1000);

		return () => {
			clearTimeout(timer);
		};
	});

	// Props
	// ------------------------------
	import Children from './Children.svelte';

	let isReady = $state(false);
	function toggleReady() {
		isReady = !isReady;
	}

	// Context
	// ------------------------------
	import { onMount, setContext } from 'svelte';
	import UserProfile from './UserProfile.svelte';
	import createUserState from './createUserState.svelte';

	const user = createUserState({
		id: 1,
		username: 'unicorn42',
		email: 'unicorn42@example.com'
	});

	setContext('user', user);

	// Radio
	let picked = $state('red');

	// Select
	let selectedColorId = $state(2);

	const colorsSelect = [
		{ id: 1, text: 'red' },
		{ id: 2, text: 'blue' },
		{ id: 3, text: 'green' },
		{ id: 4, text: 'gray', isDisabled: true }
	];

	// Fetch
	// ------------------------------
	import useFetchUser from './useFetchUser.svelte';

	let responseUser = $state();

	onMount(() => {
		responseUser = useFetchUser();
	});
</script>

<div class="grid place-content-center gap-4">
	<div>Name: {name}</div>
	<div>Count: {count}</div>
	<div>Double Count: {doubleCount}</div>
	<button onclick={incrCount}>+1</button>
	<input bind:this={inputElement} />

	<button onclick={nextLight}>Next-light</button>
	<p>Light is: {light}</p>
	<p>
		You must
		{#if light === 'red'}
			<span>STOP</span>
		{:else if light === 'orange'}
			<span>SLOW DOWN</span>
		{:else if light === 'green'}
			<span>GO</span>
		{/if}
	</p>

	<ul>
		{#each colors as color (color)}
			<li>{color}</li>
		{/each}
	</ul>

	<p>Current time: {time}</p>

	<Children
		name="Ocean"
		age={37}
		favouriteColors={['blue', 'black']}
		{isReady}
		{toggleReady}
		otherProps={111}
	/>

	<input id="is-available" type="checkbox" bind:checked={isReady} />
	<label for="is-available">Is available</label>

	<h1>Welcome back, {user.username}</h1>
	<UserProfile />

	<div>
		<div>Picked: {picked}</div>

		<input id="blue-pill" bind:group={picked} type="radio" value="blue" />
		<label for="blue-pill">Blue pill</label>

		<input id="red-pill" bind:group={picked} type="radio" value="red" />
		<label for="red-pill">Red pill</label>
	</div>

	<div>
		<select bind:value={selectedColorId} onchange={(e) => console.log(e.currentTarget.value)}>
			{#each colorsSelect as color}
				<option value={color.id} disabled={color.isDisabled}>
					{color.text}
				</option>
			{/each}
		</select>
	</div>

	<div>
		{#if responseUser}
			{#if responseUser.isLoading}
				<p>Fetching users...</p>
			{:else if responseUser.error}
				<p>An error occurred while fetching users</p>
			{:else if responseUser.users}
				<ul>
					{#each responseUser.users as user}
						<li>
							<img src={user.picture.thumbnail} alt="user" />
							<p>
								{user.name.first}
								{user.name.last}
							</p>
						</li>
					{/each}
				</ul>
			{/if}
		{/if}
	</div>
</div>

<style>
	button {
		border: 2px solid red;
		border-radius: 2px;
	}

	input {
		background-color: gray;
		color: black;
	}
</style>
