<template>
    <div class="container mx-auto px-4">
      <div class="grid grid-cols-2 gap-4">
        <!-- Dashboard Section -->
        <div class="col-span-1">
          <h2 class="text-2xl font-bold mb-4">Dashboard</h2>
          <div v-for="activity in activities" :key="activity.id" class="card">
            <h3 class="text-xl">{{ activity.name }}</h3>
            <p>{{ activity.description }}</p>
            <p>Elapsed time: {{ activity.elapsedTime }} seconds</p>
            <button @click="pauseTimer(activity)" v-if="activity.timer">Pause</button>
            <button @click="resumeTimer(activity)" v-else>Resume</button>
            <button @click="stopTimer(activity)">Stop</button>
          </div>
        </div>
  
        <!-- Add Activity Section -->
        <div class="col-span-1">
          <h2 class="text-2xl font-bold mb-4">Add Activity</h2>
          <div class="card">
            <form @submit.prevent="addActivity">
              <div class="mb-4">
                <label for="name" class="block mb-2">Activity Name</label>
                <input type="text" id="name" v-model="newActivity.name" class="w-full px-3 py-2 border rounded" required>
              </div>
              <div class="mb-4">
                <label for="description" class="block mb-2">Description (Optional)</label>
                <textarea id="description" v-model="newActivity.description" class="w-full px-3 py-2 border rounded"></textarea>
              </div>
              <button type="submit" class="px-4 py-2 bg-blue-500 text-white rounded">Start Timer</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        activities: [],
        newActivity: {
          name: '',
          description: '',
          elapsedTime: 0,
          timer: null
        }
      }
    },
    methods: {
      addActivity() {
        // Add the new activity to the activities array
        this.activities.push({ ...this.newActivity, id: Date.now() });
  
        // Start the timer for the new activity
        this.startTimer(this.newActivity);
  
        // Reset the form
        this.newActivity = { name: '', description: '', elapsedTime: 0, timer: null };
      },
      startTimer(activity) {
        activity.timer = setInterval(() => {
          activity.elapsedTime++;
        }, 1000);
      },
      pauseTimer(activity) {
        clearInterval(activity.timer);
        activity.timer = null;
      },
      resumeTimer(activity) {
        this.startTimer(activity);
      },
      stopTimer(activity) {
        clearInterval(activity.timer);
        activity.elapsedTime = 0;
        activity.timer = null;
      }
    }
  }
  </script>
  
  <style scoped>
  .card {
    padding: 2rem;
    border: 1px solid #e5e7eb;
    border-radius: .25rem;
  }
  </style>
  