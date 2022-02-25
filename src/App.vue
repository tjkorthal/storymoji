<template>
  <div id="app">
    <h1 class="title has-text-centered">storymoji 📖</h1>
    <div class="content">
      <div class="tile is-flex grid-row">
        <emoji-card v-for="emoji in items" :key="emoji" v-bind:icon="emoji" />
      </div>
      <div class="tile is-flex grid-row">
        <textarea
          id="story-box"
          class="textarea is-primary"
          placeholder="Once upon a time..."
          v-on:keyup="updateCharCount"
        ></textarea>
        <div
          :class="validCount ? '' : 'is-invalid'"
          class="tile is-child has-text-centered"
        >
          {{ charCount }}/{{ charLimit }}
        </div>
      </div>
      <div class="tile is-flex is-justify-content-center">
        <button class="button m-1" v-on:click="generate">Generate</button>
        <button class="button m-1" v-on:click="share">Share</button>
      </div>
    </div>
    <footer class="footer">
      <div class="content has-text-centered">
        <p>Try coming up with a story with these five emojis!</p>
        <p>Don't like them? Generate a new set.</p>
        <p>Use the share option to copy the emoji list and your story.</p>
      </div>
    </footer>
  </div>
</template>

<script>
import { randomSet, todaysPrompt } from "./emoji.js";
import EmojiCard from "./components/EmojiCard.vue";

export default {
  name: "App",
  components: {
    EmojiCard,
  },
  data: function () {
    return {
      items: todaysPrompt(),
      charCount: 0,
      charLimit: 280,
      validCount: true,
    };
  },
  methods: {
    generate: function () {
      this.items = randomSet();
    },
    share: function () {
      let prompt = this.items.join("");
      let story = document.getElementById("story-box").value;
      navigator.clipboard.writeText(`${prompt}\n${story}`);
      this.$buefy.notification.open({
        message: "Copied to clipboard",
        type: "is-success",
        "auto-close": true,
        position: "is-top",
      });
    },
    updateCharCount: function () {
      let box = document.getElementById("story-box");
      let charCount = box.value.split("").length;
      this.validCount = charCount <= this.charLimit;
      this.charCount = charCount;
    },
  },
};
</script>

<style lang="scss">
// Import Bulma's core
@import "~bulma/sass/utilities/_all";

// set global colors before importing other styles so they're not overridden
$primary: $green;
$link-focus-border: $primary;

// Import Bulma and Buefy styles
@import "~bulma";
@import "~buefy/src/scss/buefy";

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
.is-invalid {
  color: red;
}
.textarea {
  min-width: inherit;
}
@media (max-width: 550px) {
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
