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
  <h2>Select Region</h2>
  <Grid x={35} y={5}>
    {#each board as row, y}
      {#each row as cell, x}
        <GridCell
          clickable={true}
          highlight={cell}
          on_click={() => {
            cell = !cell;
            clicked = `${x}x${y}`;
          }}
        />
      {/each}
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
