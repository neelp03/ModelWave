<script>
  import ModelUploader from '$lib/components/ModelUploader.svelte';
  import ModelList from '$lib/components/ModelList.svelte';
</script>

<h1 class="text-3xl font-bold mb-4">ModelWave Dashboard</h1>

<ModelUploader on:modelUploaded={() => location.reload()} />
<ModelList />
