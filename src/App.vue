<template>
  <div id="app">
    <Transition name="fade">
      <RouterView />
    </Transition>
  </div>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "App"
});
</script>

<style>
/* .fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s ease-in-out;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
} */
</style>