<script setup lang="ts">
const items = ref([
  {
    description: 'Search TMDB for a backdrop image, Copy image URL'
  },
  {
    description: 'Paste URL into TMDB URL'
  },
  {
    description: 'Generate and download Library Cover'
  },
  {
    description: 'Open Jellyfin and upload new Library Cover'
  }
])
</script>

<template>
  <UStepper
    disabled
    size="sm"
    default-value="0"
    :items="items"
    class="w-full"
  />
</template>
