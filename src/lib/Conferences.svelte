<script lang="ts">
  import { onMount } from 'svelte'
  import { Modal, Spinner, notification } from '@freenit-framework/core'
  import store from './store'

  let loading = $state(true)
  let showCreate = $state(false)
  let name = $state('')

  onMount(async () => {
    const response = await store.conference.fetchAll()
    if (!response.ok) {
      notification.error(response.statusText)
    }
    loading = false
  })

  const fetchNext = async () => {
    const { conference } = store
    await conference.fetchAll(conference.list.page + 1)
  }

  const fetchPrevious = async () => {
    const { conference } = store
    await conference.fetchAll(conference.list.page - 1)
  }

  const toggleShowCreate = (event: Event) => {
    event.preventDefault()
    showCreate = !showCreate
  }

  const create = async (event: Event) => {
    event.preventDefault()
    const response = await store.conference.create({ name })
    if (!response.ok) {
      notification.error(response.statusText)
    }
    name = ''
    showCreate = false
  }
</script>

<div class="root">
  {#if loading}
    <Spinner size={200} />
  {:else}
    <div class="container">
      <div class="header">
        <h2>Conferences</h2>
        <button class="button primary" onclick={toggleShowCreate}>Create</button>
      </div>
      <div class="table">
        <div class="heading">ID</div>
        <div class="heading">Name</div>
        {#each store.conference.list.data as conference}
          <div class="data">{conference.id}</div>
          <div class="data">
            <a href={`/conferences/${conference.id}`}>{conference.name}</a>
          </div>
          <div class="border"></div>
        {/each}
      </div>
    </div>
    <div class="actions">
      <button class="button" disabled={store.conference.list.page === 1} onclick={fetchPrevious}
        >&lt;</button
      >
      {store.conference.list.page}
      <button
        class="button"
        disabled={store.conference.list.page >= store.conference.list.pages}
        onclick={fetchNext}>&gt;</button
      >
    </div>
  {/if}
</div>

<Modal open={showCreate}>
  <h2>Create</h2>
  <form onsubmit={create}>
    <!-- svelte-ignore a11y_autofocus -->
    <input bind:value={name} autofocus />
    <div class="actions">
      <button class="button primary" type="submit">Create</button>
      <button class="button error" onclick={toggleShowCreate}>Close</button>
    </div>
  </form>
</Modal>

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

  .actions {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 20px;
  }

  .actions button {
    margin-left: 10px;
    margin-right: 10px;
  }

  .border {
    grid-column: 1 / 3;
    border-top: 1px solid #eee;
  }

  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
</style>
