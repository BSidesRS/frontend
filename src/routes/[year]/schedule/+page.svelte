<script lang="ts">
  import { goto } from '$app/navigation'
  import { page } from '$app/stores'

  const years = ['2018', '2019']

  const presentations = {
    main: [
      {
        title: 'Naslov 1',
        start: new Date('2025-04-17T12:15:00'),
        duration: 30,
        end: new Date('2025-04-17T12:45:00'),
      },
      {
        title: 'Naslov 2',
        start: new Date('2025-04-17T13:00:00'),
        duration: 15,
        end: new Date('2025-04-17T13:15:00'),
      },
    ],
  }

  const redirect = (year: string) => () => {
    goto(`/${year}/schedule`)
  }

  const times: string[] = []
  let date = new Date('2019-12-17T12:00:00')
  for (let i = 0; i < 8; ++i) {
    const minute = date.getMinutes()
    if (minute < 10) {
      times.push(`${date.getHours()}:0${minute}`)
    } else {
      times.push(`${date.getHours()}:${minute}`)
    }
    date = new Date(date.getTime() + 15 * 60000)
  }

  $: gridNames = times
    .map((time) => `[_${time.replace(/:/, '')}] auto `)
    .join('')

  function gridName(date: Date) {
    const minute = date.getMinutes()
    if (minute < 10) {
      return `_${date.getHours()}0${minute}`
    }
    return `_${date.getHours()}${minute}`
  }
</script>

<div class="content">
  <h2>Schedule for {$page.params.year}</h2>
  <div class="options">
    <select class="dropdown">
      {#each years as year}
        <option
          value={year}
          on:click={redirect(year)}
          selected={year === $page.params.year}
        >
          {year}
        </option>
      {/each}
    </select>
    <select class="dropdown">
      {#each Object.keys(presentations) as room}
        <option value={room}>
          {room}
        </option>
      {/each}
    </select>
  </div>
  <div class="schedule" style={`grid-template-rows: ${gridNames}`}>
    {#each times as time}
      <div class="time time-left">
        {time}
      </div>
      <div class="time time-right">
        {time}
      </div>
    {/each}
    {#each presentations.main as presentation}
      <div
        class="title"
        style={`grid-row-start: ${gridName(presentation.start)}; grid-row-end: ${gridName(presentation.end)};`}
      >
        {presentation.title}
      </div>
    {/each}
  </div>
</div>

<style>
  .content {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    padding: 10px;
  }

  .options {
    display: flex;
    padding: 10px;
  }

  .dropdown {
    width: 100px;
  }

  .schedule {
    flex: 1;
    width: 100%;
    max-width: 1000px;
    grid-template-columns: 80px auto 80px;
    display: grid;
    grid-template-rows: min-content;
    border-width: 1px;
    border-color: gray;
    border-style: solid;
  }

  .time:last-child {
    border-style: none solid none none;
  }

  .time {
    border-width: 1px;
    border-color: gray;
  }

  .time-left {
    border-style: none solid solid none;
    text-align: right;
    grid-column: 1;
  }

  .time-right {
    border-style: none none solid solid;
    grid-column: 3;
  }

  .title {
    grid-column: 2;
    background: gray;
  }
</style>
