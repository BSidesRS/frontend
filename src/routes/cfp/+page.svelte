<script lang="ts">
  import store from '$lib/store'

  let title = $state('')
  let description = $state('')

  const submit = async (event: Event) => {
    event.preventDefault()
    title = ''
    description = ''
  }
</script>

<div class="content">
  <h1 class="heading">Call for Papers</h1>
  <p>We are calling you to submit your papers until ....</p>
  {#if !store.auth.loggedin()}
    <p>First, you need to <a href="/register">register</a> and login.</p>
  {/if}
</div>

{#if store.auth.loggedin()}
  <form class="form" onsubmit={submit}>
    <div class="apply">
      <label for="title">Title: </label>
      <input name="description" bind:value={title} />
      <label for="description">Description: </label>
      <textarea name="description" rows="8" bind:value={description}></textarea>
    </div>
    <button class="button primary margin">Submit</button>
  </form>
{/if}

<style>
  .content {
    padding: 20px;
  }

  .heading {
    margin-left: 20px;
    margin-bottom: 30px;
  }

  .form {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  }

  .apply {
    display: grid;
    grid-template-rows: auto auto;
    grid-gap: 10px;
    max-width: 500px;
    width: 100%;
  }

  .margin {
    margin-top: 10px;
  }
</style>
