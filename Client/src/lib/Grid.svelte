<script lang="ts">
  export let x: number,
    y: number,
    ww: number = 1000;
  let w = Math.round(ww / x);
</script>

<div
  class="board"
  style={`grid-template-columns: repeat(${x}, ${w}px); grid-template-rows: repeat(${y}, ${w}px);`}
>
  <slot />
</div>

<style>
  .board {
    width: 100%;
    display: grid;
  }
</style>
