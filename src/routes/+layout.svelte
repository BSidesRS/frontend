<script>
  import './styles.css'
  import 'chota'
  import { store } from '@freenit-framework/svelte-base'
  import { SvelteToast } from '@zerodevx/svelte-toast'

  const options = {}

  // First invocation of this function creates store, next invocations return
  // existing one, so only first invocation takes "prefix" argument into account
  store('/api/v1')
</script>

<svelte:head>
  <title>BSides Serbia</title>
  <meta name="BSides Serbia" content="BSides Serbia" />
</svelte:head>

<SvelteToast {options} />
<div class="main">
  <div class="menu">
    <a href="/" class="title">BSides Serbia</a>
  </div>
  <slot />
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
</style>
