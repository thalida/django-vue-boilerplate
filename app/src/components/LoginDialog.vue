<script setup lang="ts">
import { ref } from 'vue'
import { googleTokenLogin } from 'vue3-google-login'
import { Dialog, DialogPanel, TransitionChild, TransitionRoot } from '@headlessui/vue'
import { XCircleIcon } from '@heroicons/vue/24/outline'
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()
const props = defineProps({
  isVisible: Boolean
})
const emit = defineEmits(['onDismiss'])

const email = ref('')
const password = ref('')
const error = ref<string | null>(null)

async function handleEmailLogin(e: Event) {
  e.preventDefault()
  try {
    await authStore.loginWithEmail({ username: email.value, password: password.value })
    email.value = ''
    password.value = ''
    error.value = null
    emit('onDismiss')
  } catch {
    error.value = 'Invalid email or password'
    email.value = ''
    password.value = ''
  }
}

async function handleGoogleLogin() {
  try {
    error.value = null
    const response = await googleTokenLogin()
    await authStore.loginWithGoogle(response.access_token)
    emit('onDismiss')
  } catch (e) {
    console.error(e)
    error.value = 'Failed to login with Google'
  }
}
</script>

<template>
  <TransitionRoot as="template" :show="props.isVisible">
    <Dialog as="div" class="relative z-10" @close="$emit('onDismiss')">
      <TransitionChild
        as="template"
        enter="ease-out duration-300"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="ease-in duration-200"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div
          class="fixed inset-0 bg-blue-200 bg-opacity-75 backdrop-blur-sm transition-opacity dark:bg-slate-900 dark:bg-opacity-75"
        />
      </TransitionChild>

      <div class="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div
          class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0"
        >
          <TransitionChild
            as="template"
            enter="duration-300 ease-out"
            enter-from="translate-y-4 opacity-0 sm:translate-y-0 sm:scale-95"
            enter-to="translate-y-0 opacity-100 sm:scale-100"
            leave="duration-200 ease-in"
            leave-from="translate-y-0 opacity-100 sm:scale-100"
            leave-to="translate-y-4 opacity-0 sm:translate-y-0 sm:scale-95"
          >
            <DialogPanel
              class="relative w-full transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:max-w-sm sm:p-6 dark:bg-slate-950"
            >
              <div
                class="flex w-full flex-row items-end justify-start gap-4 pb-4 sm:mx-auto sm:max-w-md"
              >
                <h2 class="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                  <Applet></Applet>
                </h2>
              </div>

              <div class="mb-8 mt-2">
                <p class="text-center text-sm text-gray-900 dark:text-white">
                  Sign in to your account
                </p>
              </div>

              <div
                v-if="error"
                class="mt-4 flex flex-row gap-2 rounded-md bg-red-50 p-4 sm:mx-auto sm:w-full sm:max-w-sm dark:bg-red-200"
              >
                <div class="flex-shrink-0">
                  <XCircleIcon class="h-5 w-5 text-red-400 dark:text-red-600" aria-hidden="true" />
                </div>
                <p class="text-sm font-medium text-red-800">
                  {{ error }}
                </p>
              </div>

              <div class="mt-6">
                <button
                  @click="handleGoogleLogin"
                  class="flex w-full items-center justify-center gap-3 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:ring-transparent"
                >
                  <svg class="h-5 w-5" aria-hidden="true" viewBox="0 0 24 24">
                    <path
                      d="M12.0003 4.75C13.7703 4.75 15.3553 5.36002 16.6053 6.54998L20.0303 3.125C17.9502 1.19 15.2353 0 12.0003 0C7.31028 0 3.25527 2.69 1.28027 6.60998L5.27028 9.70498C6.21525 6.86002 8.87028 4.75 12.0003 4.75Z"
                      fill="#EA4335"
                    />
                    <path
                      d="M23.49 12.275C23.49 11.49 23.415 10.73 23.3 10H12V14.51H18.47C18.18 15.99 17.34 17.25 16.08 18.1L19.945 21.1C22.2 19.01 23.49 15.92 23.49 12.275Z"
                      fill="#4285F4"
                    />
                    <path
                      d="M5.26498 14.2949C5.02498 13.5699 4.88501 12.7999 4.88501 11.9999C4.88501 11.1999 5.01998 10.4299 5.26498 9.7049L1.275 6.60986C0.46 8.22986 0 10.0599 0 11.9999C0 13.9399 0.46 15.7699 1.28 17.3899L5.26498 14.2949Z"
                      fill="#FBBC05"
                    />
                    <path
                      d="M12.0004 24.0001C15.2404 24.0001 17.9654 22.935 19.9454 21.095L16.0804 18.095C15.0054 18.82 13.6204 19.245 12.0004 19.245C8.8704 19.245 6.21537 17.135 5.2654 14.29L1.27539 17.385C3.25539 21.31 7.3104 24.0001 12.0004 24.0001Z"
                      fill="#34A853"
                    />
                  </svg>
                  <span class="text-sm font-semibold leading-6">Continue with Google</span>
                </button>
              </div>

              <div class="relative mt-8">
                <div class="absolute inset-0 flex items-center" aria-hidden="true">
                  <div class="w-full border-t border-gray-200 dark:border-slate-500" />
                </div>
                <div class="relative flex justify-center text-sm font-bold uppercase leading-6">
                  <span class="bg-white px-6 text-gray-900 dark:bg-slate-950 dark:text-slate-400"
                    >Or</span
                  >
                </div>
              </div>

              <form class="mt-4 space-y-4" @submit="handleEmailLogin">
                <div>
                  <label
                    for="email"
                    class="block text-sm font-medium leading-6 text-gray-900 dark:text-white"
                  >
                    Email address
                  </label>
                  <div class="mt-2">
                    <input
                      v-model="email"
                      id="email"
                      name="email"
                      type="email"
                      autocomplete="email"
                      required
                      class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 dark:bg-white/5 dark:text-white dark:ring-white/10"
                    />
                  </div>
                </div>
                <div>
                  <label
                    for="password"
                    class="block text-sm font-medium leading-6 text-gray-900 dark:text-white"
                  >
                    Password
                  </label>
                  <div class="mt-2">
                    <input
                      v-model="password"
                      id="password"
                      name="password"
                      type="password"
                      autocomplete="current-password"
                      required
                      class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 dark:bg-white/5 dark:text-white dark:ring-white/10"
                    />
                  </div>
                </div>
                <div>
                  <button
                    type="submit"
                    class="mt-8 flex w-full justify-center rounded-md bg-lime-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm transition duration-200 ease-in-out hover:bg-fuchsia-500 hover:shadow-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Log In
                  </button>
                </div>
              </form>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<style scoped></style>
