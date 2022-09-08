<template>
  <div id="app">
    @{{ user.username }} - {{ fullName }}
    <strong>Followers: </strong> {{ followers }}
    <button @click="followUser">Follow</button>
  </div>
</template>

<script lang="ts" setup>
import {
  computed,
  onMounted,
  reactive,
  ref,
  watch,
} from 'vue'

const followers = ref(0)
const user = reactive({
  id: 1,
  username: 'mpwoodward',
  firstName: 'Matt',
  lastName: 'Woodward',
  email: 'mpwoodward@gmail.com',
  isAdmin: true,
})

const fullName = computed(() => `${user.firstName} ${user.lastName}`)

const followUser = () => followers.value++

watch(followers, (newFollowerCount, oldFollowerCount) => {
  if (oldFollowerCount < newFollowerCount) {
    console.log(`${user.username} has gained a follower!`)
  }
})

onMounted(() => {
  followUser()
})
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  display: flex;
  flex-direction: column;
  text-align: center;
}
</style>
