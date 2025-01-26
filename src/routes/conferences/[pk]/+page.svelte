<script lang="ts">
  import Conference from '$lib/Conference.svelte'

  const { data: props } = $props()
</script>

<Conference pk={props.pk} />
