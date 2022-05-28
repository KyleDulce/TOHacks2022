<script lang="ts">
  export let x: number, y: number;

  const w = x * y;
  let sw = 1000;
  //   $: w =
</script>

<svelte:window bind:innerWidth={sw} />

<div
  class="board"
  style={`grid-template-columns: repeat(${x}, calc(calc(100vw - 28rem) / ${x})); grid-template-rows: repeat(${y}, calc(calc(100vw - 28rem) / ${x}));`}
>
  <slot />
</div>

<style>
  .board {
    width: calc(100vw - 28rem);
    display: grid;
  }
</style>
