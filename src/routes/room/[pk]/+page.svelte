<script lang="ts">
  import Room from '$lib/Rooms.svelte'

  let { data: props } = $props()
</script>

<Room conference={props.pk} />

