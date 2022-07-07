<script setup lang="ts">
import { useToilet } from "~/store/toilet";

const toilets = useToilet();
const ToiletUpdater = setInterval(async () => {
  await toilets.fetchToilets();
}, 500)
</script>

<template>
  <div>
    <div class="global-text">
      <pre>{{ toilets.$state }}</pre>
    </div>
  </div>
</template>