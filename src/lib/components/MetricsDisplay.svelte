<script lang="ts">
  import { Bar } from 'svelte-chartjs';
  import { onMount } from 'svelte';
  import { modelStore } from '$lib/stores/modelStore';

  let metrics: { version: number; accuracy: number; precision: number; recall: number }[] = [];
  let selectedModel: { id: string };

  onMount(() => {
    modelStore.subscribe(async (models) => {
      selectedModel = models[0]; // Choose the first model by default, or use a dropdown for selection
      await fetchMetrics();
    });
  });

  async function fetchMetrics() {
    const res = await fetch(`/api/metrics?modelId=${selectedModel.id}`);
    metrics = await res.json();
  }

  const data = {
    labels: metrics.map(m => `Version ${m.version}`),
    datasets: [
      {
        label: 'Accuracy',
        data: metrics.map(m => m.accuracy),
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
      {
        label: 'Precision',
        data: metrics.map(m => m.precision),
        backgroundColor: 'rgba(153, 102, 255, 0.2)',
        borderColor: 'rgba(153, 102, 255, 1)',
        borderWidth: 1,
      },
      {
        label: 'Recall',
        data: metrics.map(m => m.recall),
        backgroundColor: 'rgba(255, 159, 64, 0.2)',
        borderColor: 'rgba(255, 159, 64, 1)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as 'top',
      },
    },
  };
</script>

<div class="metrics-display">
  <h2>Model Metrics</h2>
  <Bar {data} {options} />
</div>
