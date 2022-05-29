<script lang="ts">
  import { GameState, Team, WebSocket } from "../stores";

  $: upgrades =
    $Team === 0 ? $GameState?.whoUpgrades : $GameState?.infectedUpgrades;

  const titles = [
    ["Click Multiplier", "Auto Clicker", "Humanity Point Booster"],
    ["Click Multiplier", "Auto Clicker", "Covid Point Booster"],
  ];
</script>

<div class="container main">
  <h2>Upgrades</h2>

  <div class="hold">
    {#each upgrades || [] as upgrade, i}
      <button
        class="item"
        on:click={() => {
          $WebSocket.emit("upgrade", { upgrade: i, team: $Team });
        }}
      >
        <h3>{titles[$Team][i]}</h3>
        <h3>Level {upgrade + 1}</h3>
      </button>
    {/each}
  </div>
</div>

<style>
  h2 {
    margin: 0;
    margin-bottom: 1rem;
  }
  .main {
    height: 100%;
    display: flex;
    flex-direction: column;
  }

  .hold {
    display: flex;
    flex-direction: column;
    height: 100%;
  }

  .item {
    height: 100%;
  }
</style>
