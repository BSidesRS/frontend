<script lang="ts">
  import { onMount } from 'svelte'
  import { Spinner, notification } from '@freenit-framework/core'
  import store from '$lib/store'

  let { pk = 0 } = $props()
  let loading = $state(true)

  onMount(async () => {
    loading = true
    const response = await store.room.fetch(pk)
    if (!response.ok) {
      notification.error(response.statusText)
    }
    loading = false
  })
</script>

{#if loading}
  <Spinner size={200} />
{:else}
  <div class="container">
    <h2>Room: {store.room.detail.name}</h2>
  </div>
{/if}

<style>
</style>

