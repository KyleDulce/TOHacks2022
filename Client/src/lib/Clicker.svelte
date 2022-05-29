<script lang="ts">
  import { WebSocket } from "../stores";
  import { GameState } from "../stores";

  function click() {
    $WebSocket.emit("click", 0, 0);
  }
</script>

<div class="container clicker">
  <h1>Stats</h1>

  <div class="stats">
    <h2>Region infections: {$GameState?.regions[0]?.infectedNumber}</h2>
    <h2>Total Numbers:</h2>
  </div>

  <button on:click={click}>
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
