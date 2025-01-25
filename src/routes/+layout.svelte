<script lang="ts">
  import './styles.css'
  import 'chota'
  import { onMount } from 'svelte'
  import { LeftPane, MenuItem, MenuItems, MenuBar } from '@freenit-framework/core'
  import { SvelteToast } from '@zerodevx/svelte-toast'
  import { mdiAccountTie } from '@mdi/js'
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
<LeftPane {open} {toggle}>
  <MenuItem {toggle} icon={mdiAccountTie} href="/coc">CoC</MenuItem>
  <MenuItems {toggle} {logout} {store} />
</LeftPane>

<MenuBar {toggle} title="BSidesSerbia" />
<section class="root">
  {@render children?.()}
</section>

<style>
  .root {
    height: 100vh;
    width: 100vw;
  }
</style>
