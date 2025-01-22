<script lang="ts">
  import { onMount } from 'svelte'
  import { goto } from '$app/navigation'
  import type { PageProps } from './$types'
  import { store } from '@freenit-framework/core'

  const { data: props }: PageProps = $props()

  const years = ['2024', '2025']
  console.log(store)
  let room = $state('main')
  let gridData = $state({
    gridNames: [],
    times: [],
    start: new Date(0),
    end: new Date(0),
  })

  onMount(async () => {
    await store.conference.fetchAll()
    console.log(store.conference)
  })

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
    second: [
      {
        title: 'Naslov 3',
        start: new Date('2025-04-17T14:15:00'),
        duration: 30,
        end: new Date('2025-04-17T14:45:00'),
      },
      {
        title: 'Naslov 4',
        start: new Date('2025-04-17T15:00:00'),
        duration: 15,
        end: new Date('2025-04-17T15:15:00'),
      },
    ],
  }

  const redirect = (year: string) => () => {
    goto(`/${year}/schedule`)
  }

  const gridName = (date: Date) => {
    const minute = date.getMinutes()
    if (minute < 10) {
      return `_${date.getHours()}0${minute}`
    }
    return `_${date.getHours()}${minute}`
  }

  const constructGrid = (data: any, room: string) => {
    const presentations = room ? data[room] : ''
    const result = {
      start: new Date(Math.min(...presentations.map((presentation: any) => presentation.start))),
      end: new Date(Math.max(...presentations.map((presentation: any) => presentation.end))),
      times: [],
      gridNames: [],
    }
    result.start = new Date(result.start.getTime() - 15 * 60000)
    result.end = new Date(result.end.getTime() + 15 * 60000)
    const rows = (result.end.getTime() - result.start.getTime()) / 15 / 60000
    let date = new Date(result.start)
    for (let i = 0; i < rows; ++i) {
      const minute = date.getMinutes()
      if (minute < 10) {
        result.times.push(`${date.getHours()}:0${minute}`)
      } else {
        result.times.push(`${date.getHours()}:${minute}`)
      }
      date = new Date(date.getTime() + 15 * 60000)
    }
    result.gridNames = result.times.map((time) => `[_${time.replace(/:/, '')}] auto`).join(' ')
    return result
  }

  $effect(() => {
    gridData = constructGrid(presentations, room)
  })
</script>

<div class="content">
  <h2>Schedule for {props.year}</h2>
  <div class="options">
    <select class="dropdown">
      {#each years as year}
        <option value={year} onclick={redirect(year)} selected={year === props.year}>
          {year}
        </option>
      {/each}
    </select>
    <select class="dropdown">
      {#each Object.keys(presentations) as r}
        <option value={r} onclick={() => (room = r)}>
          {r}
        </option>
      {/each}
    </select>
  </div>
  <div class="schedule" style={`grid-template-rows: ${gridData.gridNames}`}>
    {#each gridData.times as time}
      <div class="time time-left">
        {time}
      </div>
      <div class="time time-right">
        {time}
      </div>
    {/each}
    {#each presentations[room] as presentation}
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
