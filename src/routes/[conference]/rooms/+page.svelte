<script lang="ts">
  import Rooms from '$lib/Rooms.svelte'

  let { data: props } = $props()
</script>

<Rooms conference={props.conference} />
