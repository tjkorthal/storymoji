<template>
  <div class="tile is-child is-justify-content-center">
    <div class="box has-text-centered emoji is-size-1-mobile">
      {{ icon }}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    icon: String,
  },
};
</script>
<style>
.emoji {
  font-size: 6em;
  width: 100%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  vertical-align: middle;
  border-radius: 25px;
  user-select: none;
}
</style>
