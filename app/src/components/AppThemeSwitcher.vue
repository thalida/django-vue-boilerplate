<script setup lang="ts">
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'
import { useUIStore } from '@/stores/ui'
import type { Theme } from '@/types/ui'

import { BIconMoonFill, BIconSunFill, BIconCircleHalf } from 'bootstrap-icons-vue'

const uiStore = useUIStore()

const menuOptions = [
  {
    key: 'light',
    icon: BIconSunFill,
    label: 'Light'
  },
  {
    key: 'dark',
    icon: BIconMoonFill,
    label: 'Dark'
  },
  {
    key: 'system',
    icon: BIconCircleHalf,
    label: 'System'
  }
]
</script>

<template>
  <Menu as="div" class="relative inline-block text-left">
    <div>
      <MenuButton class="flex items-center rounded-full text-blue-500 dark:text-slate-800">
        <span class="sr-only">Open options</span>
        <BIconSunFill v-if="uiStore.colorScheme === 'light'" class="h-5 w-5" />
        <BIconMoonFill v-else class="h-5 w-5" />
      </MenuButton>
    </div>

    <transition
      enter-active-class="transition duration-100 ease-out"
      enter-from-class="scale-95 transform opacity-0"
      enter-to-class="scale-100 transform opacity-100"
      leave-active-class="transition duration-75 ease-in"
      eave-from-class="scale-100 transform opacity-100"
      l
      eave-to-class="scale-95 transform opacity-0"
    >
      <MenuItems
        class="absolute bottom-10 right-1 z-10 mt-2 min-w-32 origin-bottom-right overflow-hidden rounded-md bg-blue-50 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none dark:bg-slate-800"
      >
        <div>
          <MenuItem v-for="option in menuOptions" :key="option.key" v-slot="{ active: hover }">
            <button
              @click="uiStore.setTheme(option.key as Theme)"
              class="flex w-full flex-row items-center justify-start gap-2 px-4 py-2 text-left text-sm"
              :class="{
                'bg-teal-100 text-blue-500 dark:bg-slate-900/50 dark:text-blue-500':
                  uiStore.selectedTheme === option.key,
                'text-blue-500': uiStore.selectedTheme !== option.key && hover,
                'text-gray-700 dark:text-white': uiStore.selectedTheme !== option.key && !hover
              }"
            >
              <component :is="option.icon" class="mr-2 inline-block h-4 w-4" />
              <span>{{ option.label }}</span>
            </button>
          </MenuItem>
        </div>
      </MenuItems>
    </transition>
  </Menu>
</template>
