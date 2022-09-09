<template>
  <div id="app">
    <UserProfile />
  </div>
</template>

<script lang="ts" setup>
import UserProfile from '@/user/UserProfile.vue'
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  min-height: 100vh;
  background-color: #F3F5FA;
}
</style>
