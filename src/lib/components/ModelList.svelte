<script lang="ts">
  import { onMount } from 'svelte';
  type Model = {
    name: string;
    description: string;
    createdAt: string;
  };

  let models: Model[] = [];

  onMount(async () => {
    const res = await fetch('/api/models');
    models = await res.json();
  });
</script>

<div class="model-list">
  <h2 class="text-xl font-bold mb-4">Uploaded Models</h2>
  {#if models.length === 0}
    <p>No models found.</p>
  {/if}
  {#each models as model}
    <div class="model-item mb-4 p-4 border rounded">
      <h3 class="font-bold">{model.name}</h3>
      <p>{model.description}</p>
      <small>Created at: {new Date(model.createdAt).toLocaleString()}</small>
    </div>
  {/each}
</div>
