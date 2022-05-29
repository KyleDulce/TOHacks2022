<script lang="ts">
  import { WebSocket, GameState, Region } from "../stores";

  function click() {
    $WebSocket.emit("click", { region: $Region, team: 0 });
  }

  $: Selected = $GameState?.regions[$Region >= 0 ? $Region : 0];
</script>

<div class="container clicker">
  <h1>Stats</h1>

  <div class="stats">
    {#if $Region !== -1}
      <h2>
        Region infections: {Selected?.infectedNumber}
      </h2>
      <h2>
        Population: {Selected?.maxPopulation}
      </h2>
    {:else}
      <h2>No Region Selected</h2>
    {/if}
  </div>

  <button on:click={click} disabled={$Region === -1}>
    <i class="fa-solid fa-earth-americas globe" />
  </button>
</div>

<style>
  h1 {
    margin: 0;
  }

  .stats {
    margin: 1rem 0 2rem 0;
  }

  h2 {
    margin: 0;
  }

  button {
    border-radius: 100%;
  }

  .globe {
    font-size: 20rem;
  }

  .clicker {
    height: calc(100vh - 4.8rem);
  }
</style>
