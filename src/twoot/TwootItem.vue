<template>
  <div class="twoot-item" @click="favoriteTwoot(props.twoot.id)">
    <div class="user-profile__twoot">
      <div class="twoot-item__user">
        @{{ props.username }}
      </div>
      <div class="twoot-item__content">
        {{ props.twoot.content }}
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { defineEmits, defineProps } from 'vue'

const props = defineProps({
  username: {
    type: String,
    required: true,
  },
  twoot: {
    type: Object,
    required: true,
  }
})

const emit = defineEmits(['favorite'])

const favoriteTwoot = (id: number) => {
  emit('favorite', id)
}
</script>

<style scoped>
.twoot-item {
  padding: 20px;
  background-color: white;
  border-radius: 5px;
  border: 1px solid #DFE3E8;
  box-sizing: border-box;
  cursor: pointer;
  transition: all 0.25s ease;
}

.twoot-item:hover {
  transform: scale(1.1, 1.1);
}

.twoot-item__user {
  font-weight: bold;
}
</style>