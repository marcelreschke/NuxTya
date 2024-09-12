<script setup lang="ts">
const supabase = useSupabaseClient()
const user = useSupabaseUser()

const email = ref('')
const password = ref('')
const errorMessage = ref('')

const handleLogin = async () => {
  try {
    const { error } = await supabase.auth.signInWithPassword({
      email: email.value,
      password: password.value,
    })
    if (error) throw error
    // Redirect to home page or dashboard after successful login
    navigateTo('/')
  } catch (error) {
    console.error('Login error:', error)
    if (error.message.includes('Failed to fetch')) {
      errorMessage.value = 'Unable to connect to the server. Please check your internet connection and try again.'
    } else if (error.message.includes('Invalid login credentials')) {
      errorMessage.value = 'Invalid email or password. Please try again.'
    } else {
      errorMessage.value = 'An unexpected error occurred. Please try again later.'
    }
  }
}
</script>

<template>
  <div class="flex items-center justify-center min-h-screen">
    <div class="w-full max-w-md">
      <h1 class="text-2xl font-bold mb-5">Login</h1>
      <form @submit.prevent="handleLogin">
        <div class="mb-4">
          <label for="email" class="block mb-2">Email</label>
          <input
            id="email"
            v-model="email"
            type="email"
            required
            class="w-full px-3 py-2 border rounded text-gray-900 bg-white dark:text-white dark:bg-gray-800"
          />
        </div>
        <div class="mb-4">
          <label for="password" class="block mb-2">Password</label>
          <input
            id="password"
            v-model="password"
            type="password"
            required
            class="w-full px-3 py-2 border rounded text-gray-900 bg-white dark:text-white dark:bg-gray-800"
          />
        </div>
        <Button type="submit" class="w-full">Login</Button>
      </form>
      <p v-if="errorMessage" class="text-red-500 mt-4">{{ errorMessage }}</p>
    </div>
  </div>
</template>
