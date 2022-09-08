<template>
  @{{ user.username }} - {{ fullName }}
</template>

<script lang="ts">
import { computed, defineComponent, reactive, ref } from 'vue'

export default defineComponent({
  name: 'App',
  setup() {
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

    return {
      followers,
      user,
      fullName,
    }
  }
})
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
