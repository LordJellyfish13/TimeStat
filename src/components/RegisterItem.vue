<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8">
      <div>
        <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Create your account
        </h2>
      </div>
      <form class="mt-8 space-y-6" @submit.prevent="register">
        <input type="hidden" name="remember" value="true">
        <div class="rounded-md shadow-sm -space-y-px">
          <div>
            <label for="email-address" class="sr-only">Email address</label>
            <input
              id="email-address"
              v-model="email"
              type="email"
              autocomplete="email"
              required
              class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="Email address"
            >
          </div>
          <div>
            <label for="password" class="sr-only">Password</label>
            <input
              id="password"
              v-model="password"
              type="password"
              autocomplete="new-password"
              required
              class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="Password"
            >
          </div>
          <div>
            <label for="confirm-password" class="sr-only">Confirm Password</label>
            <input
              id="confirm-password"
              v-model="confirmPassword"
              type="password"
              autocomplete="new-password"
              required
              class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="Confirm Password"
            >
          </div>
        </div>

        <div>
          <button
            type="submit"
            class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Register
          </button>
        </div>
      </form>
      <p class="mt-2 text-center text-sm text-gray-600">
        Already have an account? 
        <router-link to="/login" class="font-medium text-indigo-600 hover:text-indigo-500">
          Sign in
        </router-link>
      </p>
    </div>
  </div>
</template>

<script>
// Your Vue component
import { ref } from 'vue';
import { firebaseApp } from '../firebase/init'; // Import your firebaseApp setup
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { useRouter } from 'vue-router'; // Import Vue Router

export default {
  name: 'RegisterItem',
  
  setup() {   
    const auth = getAuth(firebaseApp); // Initialize Firebase auth
    const email = ref('');
    const password = ref('');
    const confirmPassword = ref('');
    const router = useRouter(); // Initialize Vue Router

    const register = async () => {
      try {
        // Check if passwords match
        if (password.value !== confirmPassword.value) {
          console.error('Passwords do not match');
          return;
        }

        // Register user with Firebase
        await createUserWithEmailAndPassword(auth, email.value, password.value);
        //hrtawait firebaseApp.auth().createUserWithEmailAndPassword(email, password);

        // Optionally, you can redirect the user to the login page after successful registration
        router.push('/login');
      } catch (error) {
        console.error('Error registering user:', error.message);
      }
    };

    return {
      email,
      password,
      confirmPassword,
      register,
    };
  }, 
};
</script>

<!--
import { ref } from 'vue';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'; // Import Firebase auth functions
import { firebaseApp } from '../main'; // Import firebaseApp
import { useRouter } from 'vue-router'; // Import Vue Router

export default {
  name: 'Register',
  setup() {
    const email = ref('');
    const password = ref('');
    const confirmPassword = ref('');
    const router = useRouter(); // Initialize Vue Router

    const register = async () => {
      try {
        // Check if passwords match
        if (password.value !== confirmPassword.value) {
          console.error('Passwords do not match');
          return;
        }

        // Register user with Firebase
        await createUserWithEmailAndPassword(firebaseApp.auth, email.value, password.value);
        //hrtawait firebaseApp.auth().createUserWithEmailAndPassword(email, password);

        // Optionally, you can redirect the user to the login page after successful registration
        router.push('/login');
      } catch (error) {
        console.error('Error registering user:', error.message);
      }
    };

    return {
      email,
      password,
      confirmPassword,
      register,
    };
  },
};
</script>

<style scoped>
/* Your existing styles */
</style>


-->