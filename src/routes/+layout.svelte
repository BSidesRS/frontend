<script lang="ts">
  import './styles.css'
  import 'chota'
  import { onMount } from 'svelte'
  import { SvelteToast } from '@zerodevx/svelte-toast'
  import { LeftPane, MenuItem, MenuItems, MenuBar } from '@freenit-framework/core'
  import { mdiAccountTie, mdiLightbulbGroup } from '@mdi/js'
  import store from '$lib/store'

  const options = {}
  let { children } = $props()
  let open = $state(false)

  const toggle = () => {
    open = !open
  }

  const logout = async () => {
    open = !open
    await store.auth.logout()
  }

  onMount(async () => {
    await store.auth.refresh_token()
  })
</script>

<svelte:head>
  <title>BSides Serbia</title>
  <meta name="BSides Serbia" content="BSides Serbia" />
</svelte:head>

<SvelteToast {options} />
<LeftPane {open} {toggle}>
  <MenuItem {toggle} icon={mdiAccountTie} href="/coc">CoC</MenuItem>
  {#if store.auth.loggedin() && store.user.profile.admin}
    <MenuItem {toggle} icon={mdiLightbulbGroup} href="/conferences">Conferences</MenuItem>
  {/if}
  <MenuItems {toggle} {logout} {store} />
</LeftPane>

<section class="root">
  <MenuBar {toggle} title="BSidesSerbia" />
  {@render children?.()}
</section>

<style>
  .root {
    height: 100dvh;
    width: 100dvw;
  }
</style>
