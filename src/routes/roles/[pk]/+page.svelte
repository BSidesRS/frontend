<script lang="ts">
  import { Role } from '@freenit-framework/core'
  import store from '$lib/store'

  const { data } = $props()
</script>

<Role pk={data.pk} store={store} />
