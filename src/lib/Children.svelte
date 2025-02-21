<script lang="ts">
	interface Props {
		name: string;
		age: number;
		favouriteColors: string[];
		isReady: boolean;
		toggleReady: () => void;
		[key: string]: unknown;
	}

	let { name, age, favouriteColors, isReady, toggleReady, ...rest }: Props = $props();
</script>

<div>
	<p>My name is {name}!</p>
	<p>My age is {age}!</p>
	<p>My favourite colors are {favouriteColors?.join(', ')}!</p>
	<p>I am {isReady ? 'available' : 'not available'}</p>
	<button onclick={toggleReady}>Toggle Aval</button>
	<p>Rest of props: {JSON.stringify(rest)}</p>
</div>
