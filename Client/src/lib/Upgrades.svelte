<script lang="ts">
  import { GameState, Team, WebSocket } from "../stores";

  $: upgrades =
    $Team === 0 ? $GameState?.whoUpgrades : $GameState?.infectedUpgrades;

  $: costs =
    $Team === 0
      ? $GameState?.whoUpgradeCosts
      : $GameState?.infectedUpgradeCosts;

  const titles = [
    ["Mask Production (Click Multiplyer)", "Hospital Capacity (Autoclicker)", "Vaccination Research (Influence Points Multiplyer)"],
    ["Spreadability (Click Multiplyer)", "Make new variant (Autoclicker)", "Faster Mutation (Influence Points Multiplyer)"],
  ];

  const images = [
    "https://rimu.b-cdn.net/imgs/multiplier.png",
    "https://rimu.b-cdn.net/imgs/autoclick.png",
    "https://rimu.b-cdn.net/imgs/influencer.png",
  ];
</script>

<div class="container main">
  <h2 class="tit">Upgrades</h2>

  <div class="hold">
    {#each upgrades || [] as upgrade, i}
      <button
        class="item"
        on:click={() => {
          $WebSocket.emit("upgrade", { upgrade: i, team: $Team }, (state) => {
            GameState.set(state);
          });
        }}
      >
        <div class="cont">
          <span class="in">
            <h2>{titles[$Team][i]}</h2>
            <h3>Level {upgrade + 1}</h3>
            <h3>Cost {costs[i]}</h3>
          </span>

          <img class="img" src={images[i]} alt="upgrade icon" />
        </div>
      </button>
    {/each}
  </div>
</div>

<style>
  .tit {
    margin-bottom: 1rem;
  }
  h2 {
    margin: 0;
    /* margin-bottom: 1rem; */
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
    text-align: center;
  }

  .cont {
    display: flex;
    text-align: center;
    justify-content: space-around;
    padding: 1rem;
  }
  .img {
    height: 5rem;
  }

  h3 {
    margin: 0;
  }

  .in {
    width: 100%;
  }
</style>
