<script>
  import './styles.css'
  import 'chota'
  import { create_store, store } from '@freenit-framework/core'
  import { SvelteToast } from '@zerodevx/svelte-toast'
  import { mdiAccountTie, mdiArrowDownBoldCircleOutline, mdiLoginVariant, mdiMenu } from '@mdi/js'

  const options = {}
  let { children } = $props()
  let open = $state(false)
  let loggedin = Boolean(store.user ? store.user.profile.id : false)

  // First invocation of this function creates store, next invocations return
  // existing one, so only first invocation takes "prefix" argument into account
  create_store('/api/v1')

  function toggle() {
    open = !open
  }

  $effect(() => { loggedin = Boolean(store.user.profile.id) })
</script>

<svelte:head>
  <title>BSides Serbia</title>
  <meta name="BSides Serbia" content="BSides Serbia" />
</svelte:head>

<SvelteToast {options} />
<div class="sidebar" class:sidebar-open={open}>
  {#if open}
    <div class="wrapper">
      <a class="item" href="/coc" onclick={toggle}>
        <svg
          class="icon dark"
          onclick={toggle}
          onkeyup={toggle}
          onkeydown={toggle}
          role="button"
          tabindex={0}
        >
          <path d={mdiAccountTie} />
        </svg>
        CoC
      </a>
      {#if !loggedin}
        <a class="item" href="/register" onclick={toggle}>
          <svg
            class="icon dark"
            onclick={toggle}
            onkeyup={toggle}
            onkeydown={toggle}
            role="button"
            tabindex={0}
          >
            <path d={mdiArrowDownBoldCircleOutline} />
          </svg>
          Register
        </a>
        <a class="item" href="/login" onclick={toggle}>
          <svg
            class="icon dark"
            onclick={toggle}
            onkeyup={toggle}
            onkeydown={toggle}
            role="button"
            tabindex={0}
          >
            <path d={mdiLoginVariant} />
          </svg>
          Login
        </a>
      {/if}
      <button class="close" onclick={toggle}>x</button>
    </div>
  {/if}
</div>
<div class="main">
  <div class="menu">
    <svg
      class="icon"
      onclick={toggle}
      onkeyup={toggle}
      onkeydown={toggle}
      role="button"
      tabindex={0}
    >
      <path d={mdiMenu} />
    </svg>
    <a href="/" class="title">BSides Serbia</a>
  </div>
  {@render children?.()}
</div>

<style>
  .main {
    height: 100vh;
    width: 100vw;
  }

  .menu {
    padding: 10px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    background-color: var(--color-primary);
    color: white;
  }

  .title {
    padding: 0;
    margin: 0;
    color: white;
    font-size: 3rem;
  }

  .icon {
    width: 26px;
    height: 26px;
    fill: white;
  }

  .sidebar {
    position: absolute;
    max-width: 0px;
    width: 100vw;
    height: 100vh;
    background-color: white;
    border-style: none solid none none;
    border-color: gray;
    border-width: 1px;
    padding: 0px;
    transition: all 0.3s;
  }

  .sidebar-open {
    max-width: 250px;
    padding: 10px;
  }

  .wrapper {
    position: relative;
  }

  .close {
    position: absolute;
    right: 0px;
    top: 0px;
  }

  .dark {
    fill: black;
  }

  .item {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    text-align: center;
  }
</style>
