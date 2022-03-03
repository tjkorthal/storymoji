<template>
  <div class="block">
    <div class="card">
      <header class="card-header" v-show="this.prompt">
        <emoji-card :icon="this.prompt" />
      </header>
      <div class="card-content">
        <div class="content">
          {{ story }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import EmojiCard from "./EmojiCard.vue";

export default {
  components: {
    EmojiCard,
  },
  props: {
    prompt: String,
    story: String,
  },
};
</script>

<style scoped>
.content {
  font-size: larger;
}
</style>
