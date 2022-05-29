<script lang="ts">
  import { GameState, Team, WebSocket } from "../stores";

  $: upgrades =
    $Team === 0 ? $GameState?.whoUpgrades : $GameState?.infectedUpgrades;

  const titles = [
    ["Click Multiplier", "Auto Clicker", "Humanity Point Booster"],
    ["Click Multiplier", "Auto Clicker", "Covid Point Booster"],
  ];

  const images = [
    "https://rimu.b-cdn.net/imgs/multiplier.png",
    "https://rimu.b-cdn.net/imgs/autoclick.png",
    "https://rimu.b-cdn.net/imgs/influencer.png",
  ];
</script>

<div class="container main">
  <h2>Upgrades</h2>

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
          </span>

          <img class="img" src={images[i]} alt="upgrade icon" />
        </div>
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
    text-align: center;
  }

  .cont {
    display: flex;
    text-align: center;
    justify-content: space-around;
    padding: 1rem;
  }
  .img {
    width: 10rem;
  }

  .in {
    width: 100%;
  }
</style>
