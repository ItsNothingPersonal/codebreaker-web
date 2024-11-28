<script lang="ts">
	import '../app.css';
	let { children } = $props();
</script>

<main class="m-4 flex w-full justify-center">
	{@render children()}
</main>
