<template>
  <div class="tile is-child is-justify-content-center">
    <h2 class="title has-text-centered">User submissions</h2>
    <div class="box" v-for="submission in submissions" :key="submission.id">
      {{ submission.story }}
    </div>
    <div v-show="submissions.length == 0" class="box has-text-centered">
      No one has submitted a story for this prompt. Be the first!
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  props: {
    prompt: String,
  },
  data: function () {
    return {
      submissions: [],
    };
  },
  mounted: function () {
    axios
      .get("/.netlify/functions/fetch_submissions", {
        params: { prompt: this.prompt },
      })
      .then((res) => {
        this.submissions = res.data.submissions;
      });
  },
};
</script>

<style>
</style>
