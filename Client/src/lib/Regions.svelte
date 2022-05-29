<script lang="ts">
  import Grid from "./Grid.svelte";
  import GridCell from "./GridCell.svelte";
  import { GameState } from "../stores";

  $: console.log($GameState);
</script>

<div class="container">
  <h2>Select Region</h2>
  <Grid x={35} y={5}>
    {#each ($GameState || { regions: [] }).regions as { id, infectedNumber, maxPopulation }}
      <GridCell clickable={true} ratio={infectedNumber / maxPopulation} />
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
