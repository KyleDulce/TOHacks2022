<script>
  import Toggle from "./Toggle.svelte";
  import Regions from "./lib/Regions.svelte";
  import Clicker from "./lib/Clicker.svelte";
  import Upgrades from "./lib/Upgrades.svelte";
</script>

<Toggle />

<main>
  <div class="app">
    <Clicker />

    <div class="strats">
      <Regions />
      <Upgrades />
    </div>
  </div>
</main>

<style>
  main {
    height: 100vh;
    width: 100vh;
  }
  .app {
    display: flex;
    width: 100%;
    margin: 0.5rem;
  }

  .strats {
    display: flex;
    flex-direction: column;
    /* height: calc(100vh - 16.5rem); */
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

  @media only screen and (max-width: 700px) {
    .app {
      flex-direction: column;
    }
  }
</style>
