<template>
  <div id="app">
    <h1 class="title has-text-centered">storymoji 📖</h1>
    <div class="content">
      <div class="tile is-flex grid-row">
        <emoji-card v-for="emoji in items" :key="emoji" v-bind:icon="emoji"/>
      </div>
      <div class="tile is-flex is-justify-content-center">
        <button class="button m-1" v-on:click="generate">Generate</button>
        <button class="button m-1" v-on:click="share">Share</button>
      </div>
    </div>
  </div>
</template>

<script>
import randomoji from './emoji.js'
import EmojiCard from './components/EmojiCard.vue'

export default {
  name: 'App',
  components: {
    EmojiCard
  },
  data: function () {
    return {
      items: [
        randomoji(),
        randomoji(),
        randomoji(),
        randomoji(),
        randomoji()
      ]
    }
  },
  methods: {
    generate: function () {
      this.items = [
        randomoji(),
        randomoji(),
        randomoji(),
        randomoji(),
        randomoji()
      ]
    },
    share: function () {
      navigator.clipboard.writeText(this.items.join(''))
      this.$buefy.notification.open({
        message: 'Copied to clipboard',
        type: 'is-success',
        'auto-close': true,
        position: 'is-top'
      })
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
  max-width: 765px;
  margin-left: auto;
  margin-right: auto;
}
.grid-row {
  grid-gap: 10px;
  margin: 10px;
}
@media ( max-width: 550px) {
  .grid-row {
    flex-wrap: wrap;
    justify-content: center;
  }
  .grid-row > div {
    flex-basis: 25%;
    flex-grow: 0;
  }
}
</style>
