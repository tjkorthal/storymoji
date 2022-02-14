<template>
  <div class="tile is-justify-content-center">
    <div class="box has-text-centered emoji is-size-1-mobile">
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
    aspect-ratio: 1 / 1;
    width: 100%;
    display: inline-flex;
    line-height: 6em;
    align-items: center;
    justify-content: center;
    vertical-align: middle;
    border-radius: 25px;
  }
</style>
