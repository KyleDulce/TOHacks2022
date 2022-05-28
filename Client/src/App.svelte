<script>
  import Toggle from "./Toggle.svelte";
  import Grid from "./lib/Grid.svelte";
  import GridCell from "./lib/GridCell.svelte";

  let clicked = "0x0";

  let board = [];
  for (let _ of Array(5).fill()) {
    let row = [];
    for (let _ of Array(35).fill()) {
      row.push(false);
    }

    board.push(row);
  }
</script>

<Toggle />

<main>
  <h2>Clicked {clicked}</h2>

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
</main>

<style>
</style>
