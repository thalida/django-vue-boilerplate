<script setup lang="ts">
import { ref } from 'vue'
import { onMounted, watchEffect } from 'vue'
import { RouterView } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { useUIStore } from '@/stores/ui'

const uiStore = useUIStore()
const authStore = useAuthStore()
const isLoading = ref(true)

onMounted(() => {
  uiStore.initTheme()
  authStore.silentLogin().finally(() => {
    isLoading.value = false
  })
})

watchEffect(() => {
  if (isLoading.value) {
    return
  }

  // if (authStore.isAuthenticated) {
  //   coreStore.initUser()
  // } else {
  //   coreStore.initAnon()
  // }
})
</script>

<template>
  <div
    v-if="isLoading"
    class="flex h-full w-full flex-col items-center justify-center gap-4 bg-gradient-to-br from-slate-300 via-blue-200 to-sky-200 dark:from-slate-900 dark:via-slate-900 dark:to-slate-950"
  />
  <RouterView v-else />
</template>

<style scoped>
.animate-grow-spin {
  -webkit-animation: grow 3s linear infinite;
  animation: grow 3s linear infinite;
}

@keyframes grow {
  0% {
    transform: scale(1) rotate(0deg);
  }
  33% {
    transform: scale(1.5) rotate(-30deg);
  }
  66% {
    transform: scale(1.5) rotate(20deg);
  }
  100% {
    transform: scale(1) rotate(0deg);
  }
}

.animate-flipx {
  -webkit-animation: flipX 2s linear infinite;
  animation: flipX 2s linear infinite;
}

@keyframes flipX {
  0% {
    transform: perspective(200px) rotateX(0deg) rotateY(0deg);
  }
  50% {
    transform: perspective(200px) rotateX(-180deg) rotateY(0deg);
  }
  100% {
    transform: perspective(200px) rotateX(-180deg) rotateY(-180deg);
  }
}
</style>
