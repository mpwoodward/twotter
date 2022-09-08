<template>
  <div class="user-profile">
    <div class="user-profile__user-panel">
      <h1 class="user-profile__username">@{{ user.username }}</h1>
      <div class="user-profile__admin-badge" v-if="user.isAdmin">Admin</div>
      <h2>{{ fullName }}</h2>
      <div class="user-profile__follower-count">
        <strong>Followers:</strong> {{ followers }}
      </div>
    </div>
    <div class="user-profile__twoots-wrapper">
      <TwootItem
        v-for="twoot in user.twoots"
        :key="twoot.id"
        :username="user.username"
        :twoot="twoot"
        @favorite="toggleFavorite"
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

const toggleFavorite = (id: number) => {
  console.log(`Favorited Twoot ${id}!`)
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

<style scoped>
.user-profile {
  display: grid;
  grid-template-columns: 1fr 3fr;
  width: 100%;
  padding: 50px 5%;
}

.user-profile__user-panel {
  display: flex;
  flex-direction: column;
  margin-right: 50px;
  padding: 20px;
  background-color: white;
  border-radius: 5px;
  border: 1px solid #DFE3E8;
}

.user-profile__admin-badge {
  background: rebeccapurple;
  color: white;
  border-radius: 5px;
  margin-right: auto;
  padding: 0 10px;
  font-weight: bold;
}

h1 {
  margin: 0;
}
</style>