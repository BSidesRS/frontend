<script lang="ts">
  import './styles.css'
  import 'chota'
  import { onMount } from 'svelte'
  import { SvelteToast } from '@zerodevx/svelte-toast'
  import {
    mdiAccount,
    mdiAccountGroup,
    mdiAccountTie,
    mdiArrowDownBoldCircleOutline,
    mdiLoginVariant,
    mdiLogoutVariant,
    mdiMenu,
    mdiNotebookPlusOutline,
  } from '@mdi/js'
  import store from '$lib/store'

  const options = {}
  let { children } = $props()
  let open = $state(false)

  onMount(async () => {
    await store.auth.refresh_token()
  })

  const toggle = () => {
    open = !open
  }

  const logout = async () => {
    open = !open
    await store.auth.logout()
  }
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
      <a class="item" href="/cfp" onclick={toggle}>
        <svg
          class="icon dark"
          onclick={toggle}
          onkeyup={toggle}
          onkeydown={toggle}
          role="button"
          tabindex={1}
        >
          <path d={mdiNotebookPlusOutline} />
        </svg>
        CfP
      </a>
      {#if store.auth.loggedin()}
        {#if store.user.profile.admin}
          <a class="item" href="/users" onclick={toggle}>
            <svg
              class="icon dark"
              onclick={toggle}
              onkeyup={toggle}
              onkeydown={toggle}
              role="button"
              tabindex={0}
            >
              <path d={mdiAccount} />
            </svg>
            Users
          </a>
          <a class="item" href="/roles" onclick={toggle}>
            <svg
              class="icon dark"
              onclick={toggle}
              onkeyup={toggle}
              onkeydown={toggle}
              role="button"
              tabindex={1}
            >
              <path d={mdiAccountGroup} />
            </svg>
            Roles
          </a>
        {/if}
        <a class="item" href="/" onclick={logout}>
          <svg
            class="icon dark mirror"
            onclick={logout}
            onkeyup={logout}
            onkeydown={logout}
            role="button"
            tabindex={0}
          >
            <path d={mdiLogoutVariant} />
          </svg>
          Logout
        </a>
      {:else}
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

  .mirror {
    transform: scaleX(-1);
  }
</style>
