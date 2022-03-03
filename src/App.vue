<template>
  <div id="app">
    <h1 class="title has-text-centered">storymoji 📖</h1>
    <div class="content">
      <div class="tile is-flex grid-row">
        <emoji-card v-for="emoji in items" :key="emoji" v-bind:icon="emoji" />
      </div>
      <div class="box tile grid-row">
        <div class="content has-text-centered">
          <p>Try coming up with a story with these five emojis!</p>
          <p>Don't like them? Generate a new set.</p>
          <p>
            Use the copy button to copy the emoji list and your story, or use
            submit to save your story for others to view.
          </p>
        </div>
      </div>
      <div class="tile is-flex grid-row">
        <textarea
          id="story-box"
          class="textarea is-primary"
          placeholder="Once upon a time..."
          v-model="story"
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
        <button class="button m-1" v-on:click="copyToClipboard">Copy</button>
        <button
          class="button m-1"
          v-on:click="saveStory"
          v-bind:disabled="!validCount"
        >
          Submit
        </button>
      </div>
    </div>
    <submissions
      v-bind:topSubmissions="this.topSubmissions"
      v-bind:promptSubmissions="this.promptSubmissions"
    />
  </div>
</template>

<script>
import { randomSet, todaysPrompt } from "./emoji.js";
import EmojiCard from "./components/EmojiCard.vue";
import Submissions from "./components/Submissions.vue";
import axios from "axios";

export default {
  name: "App",
  components: {
    EmojiCard,
    Submissions,
  },
  data: function () {
    return {
      items: todaysPrompt(),
      story: "",
      charLimit: 200,
      promptSubmissions: [],
      topSubmissions: [],
    };
  },
  computed: {
    charCount: function () {
      return this.story.split("").length;
    },
    prompt: function () {
      return this.items.join("");
    },
    validCount: function () {
      return this.charCount <= this.charLimit && this.charCount > 0;
    },
  },
  mounted: function () {
    this.fetchRecentSubmissions();
    this.fetchPromptSubmissions();
  },
  methods: {
    generate: function () {
      this.story = "";
      this.items = randomSet();
    },
    copyToClipboard: function () {
      let story = document.getElementById("story-box").value;
      navigator.clipboard.writeText(`PROMPT: ${this.prompt}\n${story}`);
      this.$buefy.notification.open({
        message: "Copied to clipboard",
        type: "is-success",
        "auto-close": true,
        position: "is-top",
      });
    },
    fetchPromptSubmissions() {
      axios
        .get("/.netlify/functions/fetch_prompt_submissions", {
          params: { prompt: this.prompt },
        })
        .then((res) => {
          this.promptSubmissions = res.data.submissions;
        });
    },
    fetchRecentSubmissions() {
      axios.get("/.netlify/functions/fetch_recent_submissions").then((res) => {
        this.topSubmissions = res.data.submissions;
      });
    },
    saveStory: function () {
      axios
        .post("/.netlify/functions/submit_story", {
          prompt: this.prompt,
          story: this.story,
        })
        .then(() => {
          this.$buefy.notification.open({
            message: "Story submitted",
            type: "is-success",
            position: "is-top",
          });
          this.fetchRecentSubmissions();
          this.fetchPromptSubmissions();
        })
        .catch((err) => {
          let response = err.response;
          let message = "An error occurred";
          if (response.data) {
            message = response.data.errorMessage;
          }
          this.$buefy.notification.open({
            message: message,
            type: "is-danger",
            duration: 5000,
            position: "is-top",
          });
        });
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
$tabs-toggle-link-active-background-color: $primary;
$tabs-toggle-link-active-border-color: $primary;

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
