<script lang="ts">
  import { onMount } from 'svelte';
  import { modelStore } from '$lib/stores/modelStore';

  let models: { id: number; name: string; description: string }[] = [];

  onMount(async () => {
    const res = await fetch('/api/models');
    models = await res.json();
  });
</script>

<div class="model-list">
  <h2>Uploaded Models</h2>
  {#each models as model}
    <div class="model-item">
      <a href={`/models/${model.id}`}>
        <h3>{model.name}</h3>
      </a>
      <p>{model.description}</p>
    </div>
  {/each}
</div>
