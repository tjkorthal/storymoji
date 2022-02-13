<template>
  <div id="app">
    <h1 class="title has-text-centered">storymoji 📖</h1>
    <div class="content">
      <div class="tile is-ancestor">
        <emoji-card v-for="emoji in items" :key="emoji" v-bind:icon="emoji"/>
      </div>
      <div class="tile is-flex is-justify-content-center">
        <button class="button" v-on:click="generate">Generate</button>
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
        randomoji(),
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
        randomoji(),
      ]
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
}
</style>
