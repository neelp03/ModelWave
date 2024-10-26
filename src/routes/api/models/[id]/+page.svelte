<script lang="ts">
  import { page } from '$app/stores';
  import MetricsDisplay from '$lib/components/MetricsDisplay.svelte';
  import { onMount } from 'svelte';

  export let params;
  let model: { name?: string; description?: string; createdAt?: string } = {};

  onMount(async () => {
    const res = await fetch(`/api/models/${params.id}`);
    model = await res.json();
  });
</script>

<h1>{model?.name}</h1>
<p>{model?.description}</p>
<small>Created at: {model.createdAt ? new Date(model.createdAt).toLocaleString() : 'N/A'}</small>

<MetricsDisplay />
