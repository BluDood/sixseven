<script lang="ts">
  import { getInfo, type APIInfo } from '$lib/api.js'

  let { children } = $props()

  import '../index.css'
  import '@fontsource-variable/open-sans'
  import '@fontsource/material-icons'
  import {
    SafeArea,
    type SafeAreaInsets
  } from 'capacitor-plugin-safe-area'
  import { onMount } from 'svelte'

  let info: APIInfo | null = $state(null)

  $effect(() => {
    const setInsets = (insets: SafeAreaInsets) => {
      for (const [key, value] of Object.entries(insets.insets)) {
        document.documentElement.style.setProperty(
          `--safe-area-inset-${key}`,
          `${value}px`
        )
      }
    }

    SafeArea.getSafeAreaInsets().then(setInsets)

    SafeArea.addListener('safeAreaChanged', setInsets)

    return () => SafeArea.removeAllListeners()
  })

  onMount(() => {
    getInfo().then(d => (info = d))
  })
</script>

<svelte:head>
  <title>six seven</title>
</svelte:head>

{@render children()}
{#if info}
  <div class="info">
    v{info.version} ({info.commit})
  </div>
{/if}

<style>
  .info {
    position: fixed;
    bottom: calc(10px + var(--safe-area-inset-bottom));
    right: calc(10px + var(--safe-area-inset-right));
    font-size: 14px;
    color: var(--text-sec);
    font-family: 'Open Sans Variable', sans-serif;
    animation: appear 500ms ease;
  }
</style>
