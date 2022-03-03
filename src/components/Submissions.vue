<template>
  <div class="tile is-child is-justify-content-center">
    <br />
    <b-tabs
      position="is-centered"
      type="is-toggle"
      size="is-medium"
      v-model="activeTab"
    >
      <b-tab-item label="Top stories">
        <story-card
          v-for="submission in topSubmissions"
          :key="submission.id"
          :prompt="submission.prompt"
          :story="submission.story"
        />
      </b-tab-item>
      <b-tab-item label="This prompt">
        <story-card
          v-for="submission in promptSubmissions"
          :key="submission.id"
          :prompt="submission.prompt"
          :story="submission.story"
        />
        <div
          v-show="promptSubmissions.length == 0"
          class="box has-text-centered"
        >
          No one has submitted a story for this prompt. Be the first!
        </div>
      </b-tab-item>
    </b-tabs>
  </div>
</template>

<script>
import StoryCard from "./StoryCard.vue";

export default {
  components: {
    StoryCard,
  },
  props: {
    promptSubmissions: Array,
    topSubmissions: Array,
  },
  data: function () {
    return {
      activeTab: 0,
    };
  },
};
</script>

<style>
</style>
