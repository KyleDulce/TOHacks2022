<script lang="ts">
  export let on_click: Function = () => {};
  export let clickable: boolean = false;
  export let highlight: boolean = false;
</script>

<div
  on:click={() => {
    clickable && on_click();
  }}
  class={`cell reg ${highlight ? "highlight" : ""} ` + $$props.class}
  style={`cursor: ${clickable ? "pointer" : "default"}`}
>
  <slot />
</div>

<style>
  .cell {
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    background-color: var(--accent-color);
    border-radius: 4px;
    margin: 1px;
    font-size: 2rem;
    transition: all 100ms;
    user-select: none;
    overflow: hidden;
  }

  .reg {
    box-shadow: var(--accent-color-shadow) 0px 4px 0px;

    /* box-shadow: 0px 0px 10px 2px var(--accent-color-shadow); */
  }

  .highlight {
    /* box-shadow: 0px 0px 10px 2px rgb(255, 221, 142); */
    background-color: var(--special-color);
  }

  .cell:hover {
    background-color: var(--accent-color-hover);
  }

  .cell:active {
    background-color: var(--accent-color-active);
  }

  .filled {
    /* --accent-color-shadow: #938a8a; */
    animation: pulse 0.2s linear 1;
    font-weight: 600;
  }

  .filled-invalid,
  .filled-wrong {
    --accent-color-shadow: #938a8a;
    animation: pulse 0.2s linear 1;
    font-weight: 600;
  }

  .filled-invalid {
    animation: shake 0.2s linear 1;
  }

  .filled-close {
    --accent-color-shadow: #f3bd29;
    animation: pulse 0.2s linear 1;
    font-weight: 600;
  }
  .filled-correct {
    --accent-color-shadow: var(--special-color);
    animation: pulse 0.2s linear 1;
    font-weight: 600;
  }
</style>
