<script lang="ts">
  import Grid from "./Grid.svelte";
  import GridCell from "./GridCell.svelte";
  import { GameState, Region } from "../stores";
</script>

<div class="container">
  {#if $Region === -1}
    <h2>Select Region</h2>
  {:else}
    <h2>Region: {$Region + 1} Selected</h2>
  {/if}
  <Grid x={35} y={5}>
    {#each ($GameState || { regions: [] }).regions as { id, infectedNumber, maxPopulation }}
      <GridCell
        clickable={true}
        ratio={infectedNumber / maxPopulation}
        highlight={$Region === id}
        on_click={() => {
          Region.set(id);
        }}
      />
    {/each}
  </Grid>
</div>

<style>
  h2 {
    margin: 0;
  }
  .container {
    /* height: 30%; */
  }
</style>
