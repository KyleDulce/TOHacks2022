<script lang="ts">
  import Grid from "./Grid.svelte";
  import GridCell from "./GridCell.svelte";

  let clicked = "0x0";

  let board = [];
  for (let _ of Array(5).fill(0)) {
    let row = [];
    for (let _ of Array(35).fill(0)) {
      row.push(false);
    }
    board.push(row);
  }
</script>

<div class="container">
  <h2>Upgrades</h2>
</div>

<style>
  h2 {
    margin: 0;
  }
  .container {
    height: 100%;
  }
</style>
