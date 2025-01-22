<script lang="ts">
  import { onMount } from 'svelte'
  import { goto } from '$app/navigation'
  import store from '$lib/store'
  import type { PageProps } from './$types'

  const { data: props }: PageProps = $props()

  onMount(async () => {
    const response = await store.auth.verify(props.token)
    if (response.ok) {
      goto('/login')
    }
  })
</script>
