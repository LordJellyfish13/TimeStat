<template>
    <div class="min-h-screen flex flex-col items-center justify-start bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 pt-20">
      <div class="max-w-md w-full space-y-8">
        <div>
          <h1 class="mt-6 text-center text-5xl font-extrabold text-gray-900">
            TimeStat
          </h1>
          <p class="mt-2 text-center text-xl text-gray-600">
            Track your time efficiently
          </p>
        </div>
        <div class="flex space-x-4">
          <router-link to="/login" class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            Login
          </router-link>
          <router-link to="/register" class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
            Register
          </router-link>
        </div>
      </div>
    </div>
</template>
  
<script>
  export default {
    name: 'Home',
    methods: {
      // You can add methods to handle login and register button clicks
    },
  };
</script>
  
<style scoped>
</style>
