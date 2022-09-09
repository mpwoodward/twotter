<template>
  <div class="user-profile">
    <div class="user-profile__user-panel">
      <h1 class="user-profile__username">@{{ user.username }}</h1>
      <div class="user-profile__admin-badge" v-if="user.isAdmin">Admin</div>
      <h2>{{ fullName }}</h2>
      <div class="user-profile__follower-count">
        <strong>Followers:</strong> {{ followers }}
      </div>
      <CreateTwootPanel @add-twoot="addTwoot" />
    </div>
    <div class="user-profile__twoots-wrapper">
      <TwootItem
        v-for="twoot in user.twoots"
        :key="twoot.id"
        :username="user.username"
        :twoot="twoot"
      />
    </div>
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

import TwootItem from '@/twoot/TwootItem.vue'
import CreateTwootPanel from '@/twoot/CreateTwootPanel.vue'

const followers = ref(0)
const user = reactive({
  id: 1,
  username: 'mpwoodward',
  firstName: 'Matt',
  lastName: 'Woodward',
  email: 'mpwoodward@gmail.com',
  isAdmin: true,
  twoots: [
    {
      id: 1,
      content: 'Twotter is Amazing!',
    },
    {
      id: 2,
      content: "Don't forget to subscribe to The Earth is Square!",
    },
  ],
})

const fullName = computed(() => `${user.firstName} ${user.lastName}`)

const followUser = () => followers.value++

const addTwoot = (twootContent: string) => {
  user.twoots.unshift({
    id: user.twoots.length + 1,
    content: twootContent,
  })
}

watch(followers, (newFollowerCount, oldFollowerCount) => {
  if (oldFollowerCount < newFollowerCount) {
    console.log(`${user.username} has gained a follower!`)
  }
})

onMounted(() => {
  followUser()
})
</script>

<style lang="scss" scoped>
.user-profile {
  display: grid;
  grid-template-columns: 1fr 3fr;
  grid-gap: 50px;
  padding: 50px 5%;

  .user-profile__user-panel {
    display: flex;
    flex-direction: column;
    padding: 20px;
    background-color: white;
    border-radius: 5px;
    border: 1px solid #DFE3E8;
    margin-bottom: auto;

    h1 {
      margin: 0;
    }

    .user-profile__admin-badge {
      background: rebeccapurple;
      color: white;
      border-radius: 5px;
      margin-right: auto;
      padding: 0 10px;
      font-weight: bold;
    }
  }

  .user-profile__twoots-wrapper {
    display: grid;
    grid-gap: 10px;
    margin-bottom: auto;
  }
}
</style>