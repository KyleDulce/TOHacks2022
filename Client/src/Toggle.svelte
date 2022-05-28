<script lang="ts">
  import { mode } from "./stores";

  function toggle() {
    mode.set($mode === "light" ? "dark" : "light");
    window.document.body.classList.toggle("dark-mode");
  }
</script>

<i
  class={`toggle fas ${$mode === "dark" ? "fa-sun" : "fa-moon"}`}
  on:click={toggle}
/>

<style>
  .toggle {
    position: fixed;
    right: 1rem;
    top: 1rem;
    transition: 200ms;
    font-size: 1.5rem;
    cursor: pointer;
  }
  .toggle:hover {
    color: var(--text-color-hover);
  }
  .toggle:active {
    color: var(--text-color-active);
  }
  :global(body.dark-mode) {
    --bg-color: var(--offblack);
    --text-color: var(--textwhite);
    --text-color-secondary: var(--textsecondaryblack);
    --text-color-disabled: var(--textblackdisabled);
    --text-color-active: var(--textblackactive);
    --text-color-hover: var(--textblackhover);
    --accent-color: var(--accentblack);
    --accent-color-disabled: var(--accentblackdisabled);
    --accent-color-active: var(--accentblackactive);
    --accent-color-hover: var(--accentblackhover);
    --accent-color-shadow: var(--accentblackshadow);
    --accent-color-trans: var(--accentblacktrans);
    --special-color: var(--blackspecialcolor);
    --special-color-hover: var(--blackspecialcolorhover);
    --special-color-active: var(--blackspecialcoloractive);
    --special-color-disabled: var(--blackspecialcolordisabled);
    --special-color-lip: var(--blackspecialcolorlip);
  }
</style>
