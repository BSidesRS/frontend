<script lang="ts">
  import { User } from '@freenit-framework/core'
  import store from '$lib/store'

  const { data } = $props()
</script>

<User pk={data.pk} store={store} />
