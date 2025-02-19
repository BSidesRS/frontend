<script lang="ts">
  import { onMount } from 'svelte'
  import { Spinner, notification } from '@freenit-framework/core'
  import store from '$lib/store'

  let { pk = 0 } = $props()
  let loading = $state(true)

  onMount(async () => {
    loading = true
    const response = await store.conference.fetch(pk)
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
    <h2>Conference: {store.conference.detail.name}</h2>
    <h3>Rooms</h3>
    <div class="table">
      <div class="heading">ID</div>
      <div class="heading">Name</div>
      {#each store.conference.detail.rooms as room}
        <div class="data">{room.id}</div>
        <a class="data" href={`/${store.conference.detail.name}/rooms/${room.id}`}>{room.name}</a>
        <div class="border"></div>
      {/each}
    </div>
    <h3>Days</h3>
    <div class="table">
      <div class="heading">ID</div>
      <div class="heading">Date</div>
      {#each store.conference.detail.days as day}
        <div class="data">{day.id}</div>
        <a class="data" href={`/day/${day.id}`}>{day.date}</a>
        <div class="border"></div>
      {/each}
    </div>
  </div>
{/if}

<style>
  .table {
    border: 1px solid #ddd;
    border-radius: 5px;
    padding: 10px;
    display: grid;
    grid-template-columns: repeat(2, auto);
  }

  .heading {
    font-weight: bold;
    background-color: #eee;
    padding: 5px;
  }

  .data {
    padding: 5px;
  }

  .border {
    grid-column: 1 / 3;
    border-top: 1px solid #eee;
  }
</style>

