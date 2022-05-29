<script lang="ts">

  import Grid from "./Grid.svelte";
  import GridCell from "./GridCell.svelte";
  import {GameState, Team} from "../stores";

  $: upgrades = $Team === 0 ? $GameState?.whoUpgrades : $GameState?.infectedUpgrades;

  $: console.log(upgrades);

</script>

<div class="container">
  <h2>Upgrades</h2>
  {#each upgrades || [] as upgrade }
    <div class="container">
      {upgrade}
    </div>
  {/each}
</div>

<style>
  h2 {
    margin: 0;
  }
  .container {
    height: 100%;
  }
</style>
