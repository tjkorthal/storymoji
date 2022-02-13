<template>
  <div class="tile is-justify-content-center">
    <div class="card-content box has-text-centered emoji">
      {{ icon }}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    icon: String
  }
}
</script>
<style>
  .emoji {
    font-size: 6em;
  }
</style>
