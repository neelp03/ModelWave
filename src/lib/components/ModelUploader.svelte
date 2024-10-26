<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  let name = '';
  let description = '';
  const dispatch = createEventDispatcher();

  const submitModel = async () => {
    const response = await fetch('/api/models', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, description })
    });

    if (response.ok) {
      const newModel = await response.json();
      dispatch('modelUploaded', newModel);
      name = '';
      description = '';
    } else {
      console.error('Failed to upload model');
    }
  };
</script>

<div class="model-uploader">
  <input type="text" placeholder="Model Name" bind:value={name} class="border p-2 mb-2" />
  <textarea placeholder="Description" bind:value={description} class="border p-2 mb-2"></textarea>
  <button on:click={submitModel} class="bg-blue-500 text-white p-2 rounded">Upload Model</button>
</div>
