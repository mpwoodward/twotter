<template>
  <div class="user-profile">
    <div class="user-profile__user-panel">
      <h1 class="user-profile__username">@{{ user.username }}</h1>
      <div class="user-profile__admin-badge" v-if="user.isAdmin">Admin</div>
      <h2>{{ fullName }}</h2>
      <div class="user-profile__follower-count">
        <strong>Followers:</strong> {{ followers }}
      </div>
      <form
        class="user-profile__create-twoot"
        @submit.prevent="createNewTwoot"
        :class="{ '--exceeded': newTwootCharacterCount > 180 }"
      >
        <label for="newTwoot"><strong>New Twoot</strong> ({{ newTwootCharacterCount }}/180)</label>
        <textarea id="newToot" rows="4" v-model="newTwootContent" />

        <div class="user-profile__create-twoot-type">
          <label for="newTwootType"><strong>Type: </strong></label>
          <select id="newTwootType" v-model="selectedTwootType">
            <option
              :value="option.value"
              v-for="(option, index) in twootTypes"
              :key="index"
            >
              {{ option.name }}
            </option>
          </select>
        </div>

        <button>
          Twoot!
        </button>
      </form>
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
const twootTypes = [
  {
    value: 'draft',
    name: 'Draft'
  },
  {
    value: 'instant',
    name: 'Instant Twoot'
  },
]
const newTwootContent = ref('')
const selectedTwootType = ref('instant')

const fullName = computed(() => `${user.firstName} ${user.lastName}`)
const newTwootCharacterCount = computed(() => newTwootContent.value.length)

const followUser = () => followers.value++

const toggleFavorite = (id: number) => {
  console.log(`Favorited Twoot ${id}!`)
}

const createNewTwoot = () => {
  if (newTwootContent.value && selectedTwootType.value !== 'draft') {
    user.twoots.unshift({
      id: user.twoots.length + 1,
      content: newTwootContent.value,
    })
    newTwootContent.value = ''
  }
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
  width: 100%;
  padding: 50px 5%;

  .user-profile__user-panel {
    display: flex;
    flex-direction: column;
    margin-right: 50px;
    padding: 20px;
    background-color: white;
    border-radius: 5px;
    border: 1px solid #DFE3E8;

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

    .user-profile__create-twoot {
      padding-top: 20px;
      display: flex;
      flex-direction: column;

      &.--exceeded {
        color: red;
        border-color: red;

        button {
          background-color: red;
          border: none;
          color: white;
        }
      }
    }
  }

  .user-profile__twoots-wrapper {
    display: grid;
    grid-gap: 10px;
  }
}

</style>