<script lang="ts">
  import { onMount } from 'svelte'

  import { getHowLong } from '$lib/api.js'

  import Loader from './Loader.svelte'

  let start: number | null = $state(null)
  let time: number | null = $state(null)
  let showHands = $state(false)

  async function fetchHowLong() {
    const howLong = await getHowLong()
    if (!howLong) return
    start = Date.now() - howLong * 1000
  }

  onMount(() => {
    fetchHowLong()

    const interval = setInterval(() => {
      if (!start) return
      time = Date.now() - start
    }, 100)

    const untilNextSecond = 1000 - (Date.now() % 1000)

    const timeout = setTimeout(() => {
      showHands = true
    }, untilNextSecond + 500)

    return () => {
      clearInterval(interval)
      clearTimeout(timeout)
    }
  })
</script>

<main>
  {#if time !== null}
    <div class="sixseven">
      <div class="hands" data-visible={showHands}>
        {#if showHands}
          <img class="one" src="/img/hand2.png" alt="" />
          <img class="two" src="/img/hand2.png" alt="" />
        {/if}
      </div>
      <h1>six seven</h1>
      <div class="counter">
        <div class="section">
          <div class="value">
            {Math.floor(time / 1000 / 60 / 60 / 24)}
          </div>
          <div class="unit">days</div>
        </div>
        <div class="section">
          <div class="value">
            {Math.floor((time / 1000 / 60 / 60) % 24)}
          </div>
          <div class="unit">hours</div>
        </div>
        <div class="section">
          <div class="value">
            {Math.floor((time / 1000 / 60) % 60)}
          </div>
          <div class="unit">minutes</div>
        </div>
        <div class="section">
          <div class="value">
            {Math.floor((time / 1000) % 60)}
          </div>
          <div class="unit">seconds</div>
        </div>
      </div>
    </div>
  {:else}
    <div class="loading">
      <Loader />
    </div>
  {/if}
</main>

<style>
  main {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: var(--height);
  }

  .loading {
    animation: appear 500ms ease;
  }

  .sixseven {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
    animation: appear 500ms ease;
    padding: 50px;
  }

  .hands {
    display: flex;
    gap: 50px;
    height: 150px;
    align-items: center;
    opacity: 0;
    transform: translateY(10px);
    transition: 500ms ease;
  }

  .hands[data-visible='true'] {
    opacity: 1;
    transform: translateY(0);
    filter: drop-shadow(0 0 25px var(--bludood));
  }

  .hands .one {
    height: 100px;
    transform: rotate(45deg);
    animation: sixseven 1s ease-in-out infinite alternate;
  }

  .hands .two {
    height: 100px;
    transform: rotate(-45deg) scaleX(-1);
    animation: sixseven 1s ease-in-out infinite alternate-reverse;
  }

  @keyframes sixseven {
    from {
      translate: 0 20px;
    }

    to {
      translate: 0 -20px;
    }
  }

  h1 {
    font-size: 40px;
  }

  .counter {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    gap: 10px;
  }

  .section {
    display: flex;
    flex-direction: column;
    align-items: center;
    background: #222;
    padding: 10px;
    padding-bottom: 15px;
    border-radius: 10px;
    width: 100px;
  }

  .value {
    font-size: 36px;
    font-weight: bold;
  }

  .unit {
    font-size: 18px;
    color: #aaa;
  }
</style>
