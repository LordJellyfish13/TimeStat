<template>
  <div class="container mx-auto px-4">
    <div class="grid grid-cols-2 gap-4">
      <!-- Dashboard Section -->
      <div class="col-span-1">
        <h2 class="text-2xl font-bold mb-4">Dashboard</h2>
        <div v-for="activity in activities" :key="activity.id" class="card mb-4 overflow-auto break-words overflow-ellipsis">
          <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {{ activity.name }}
          </h5>
          <p class="font-normal text-gray-700 dark:text-gray-400">
            {{ activity.description }}
          </p>
          <p>Elapsed time: {{ formatTime(activity.elapsedTime) }}</p>
            <button @click="toggleTimer(activity)" class="px-4 py-2 rounded text-white" :class="activity.timer ? 'bg-yellow-400' : 'bg-green-500'">
            {{ activity.timer ? 'Pause' : 'Resume' }}
            </button>
          <button @click="stopTimer(activity)" class="px-4 py-2 rounded text-white bg-red-500">Stop</button>
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
            <button type="submit" class="px-4 py-2 bg-green-500 text-white rounded">Start Timer</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { db } from '../firebase/init.js'
import { collection, getDocs, addDoc, doc, updateDoc } from 'firebase/firestore'

const activities = ref([])
const newActivity = ref({
  name: '',
  description: '',
  elapsedTime: 0,
  timer: null,
  progress: 0
})

const fetchActivities = async () => {
  const querySnapshot = await getDocs(collection(db, 'activities'))
  activities.value = querySnapshot.docs.map(doc => {
    const data = doc.data()
    return { id: doc.id, ...data, timer: null } // Ensure timer is null on reload
  })
}

onMounted(fetchActivities)

const addActivity = async () => {
  const activity = {
    name: newActivity.value.name,
    description: newActivity.value.description,
    elapsedTime: 0,
    timer: null,
    progress: newActivity.value.progress
  }

  activities.value.push({ ...activity, id: Date.now() })

  startTimer(activity)

  newActivity.value = { name: '', description: '', elapsedTime: 0, timer: null, progress: 0 }

  try { 
    const docRef = await addDoc(collection(db, 'activities'), activity)
    activity.id = docRef.id
  } catch (error) {
    console.error('Error adding activity to Firestore: ', error)
  }
}

const updateActivity = async (activity) => {
  try {
    await updateDoc(doc(db, 'activities', activity.id), {
      elapsedTime: activity.elapsedTime,
      progress: activity.progress
    })
  } catch (error) {
    console.error('Error updating activity in Firestore: ', error)
  }
}

const toggleTimer = (activity) => {
  if (activity.timer) {
    pauseTimer(activity)
  } else {
    resumeTimer(activity)
  }
}

const startTimer = (activity) => {
  activity.timer = null // Set timer to null before starting
  activity.timer = setInterval(() => {
    activity.elapsedTime++
    activity.progress = activity.elapsedTime
    updateActivity(activity) // Update activity in Firestore
  }, 1000)
}

const pauseTimer = (activity) => {
  clearInterval(activity.timer)
  activity.timer = null
  updateActivity(activity) // Update activity in Firestore
}

const resumeTimer = (activity) => {
  startTimer(activity)
}

const stopTimer = (activity) => {
  clearInterval(activity.timer)
  activity.elapsedTime = 0
  activity.timer = null
  activity.progress = 0
  updateActivity(activity) // Update activity in Firestore
}

const formatTime = (seconds) => {
  const hours = Math.floor(seconds / 3600)
  const minutes = Math.floor((seconds % 3600) / 60)
  const remainingSeconds = seconds % 60
  return `${hours}h ${minutes}m ${remainingSeconds}s`
}
</script>

<style scoped>
.card {
  padding: 2rem;
  border: 1px solid #e5e7eb;
  border-radius: .25rem;
  margin-bottom: 1rem;
}
</style>
