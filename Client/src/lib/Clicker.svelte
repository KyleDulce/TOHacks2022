<script lang="ts">
  import { WebSocket, GameState, Region, Team } from "../stores";

  function click() {
    $WebSocket.emit("click", { region: $Region, team: $Team });
  }
  $: Selected = $GameState?.regions[$Region >= 0 ? $Region : 0];
</script>

<div class="container clicker">
  <h1>Stats</h1>

  <div class="stats">
    <h3>Team: {$Team === 0 ? "Humanity" : "Covid"}</h3>
    {#if $Region !== -1}
      <h3>Region Name: {Selected?.name}</h3>
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

  <button class="clicker-btn" on:click={click} disabled={$Region === -1}>
    <img src="https://rimu.b-cdn.net/imgs/globe.png" alt="globe" />
  </button>

  <h2>
    Influence Points: {($Team === 0
      ? $GameState?.whoInfluence
      : $GameState?.infectedInfluence) || 0}
  </h2>
  <div class="bot">
    <h2 class="t">Choose Team:</h2>
    <div class="teams">
      <button
        on:click={() => {
          Team.set(0);
        }}>Humanity</button
      >
      <button
        on:click={() => {
          Team.set(1);
        }}>Covid</button
      >
    </div>
  </div>
</div>

<style>
  .t {
    margin-bottom: 0.4rem;
  }
  .teams {
    display: flex;
  }

  .bot {
    margin-top: 1rem;
  }

  .teams button {
    width: 100%;
    margin: 0rem 0.2rem;
  }

  h1 {
    margin: 0;
  }

  .stats {
    margin: 1rem 0 2rem 0;
  }

  h2 {
    margin: 0;
  }

  h3 {
    margin: 0;
  }

  .clicker-btn {
    border-radius: 100%;
    background-color: var(--special-color);
    transform: translateY(-20px);
    box-shadow: var(--special-color-lip) 0px 20px 0px;

    cursor: pointer;
    /* box-shadow: 0px 0px 10px 2px var(--accent-color-shadow); */
    transition: all 50ms;
  }

  .clicker-btn:disabled {
    /* color: var(--text-color-disabled); */
    box-shadow: none;
    transform: translateY(-20px);
    background-color: var(--special-color-disabled);
    cursor: default !important;
  }

  .clicker-btn:not(:disabled):active {
    /* color: var(--text-color-active); */
    transform: translateY(-5px);
    box-shadow: var(--special-color-lip) 0px 5px 0px;
    /* background-color: var(--special-color-active); */
  }

  .clicker-btn:not(:disabled):not(:active):hover {
    transform: translateY(-20px);
    box-shadow: var(--special-color-lip) 0px 20px 0px;
  }

  img {
    width: 18rem;
  }

  .clicker {
    height: calc(100vh - 4.8rem);
  }
</style>
