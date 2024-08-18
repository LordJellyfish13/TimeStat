<template>
  <div class="container mx-auto px-4 py-8 flex justify-center items-start min-h-screen">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl">
      <!-- Dashboard Section -->
      <div class="col-span-1 md:col-span-2">
        <h2 class="text-center text-3xl font-bold mb-6 text-gray-800 dark:text-gray-200">Dashboard</h2>
        <BarChart />
        <div v-for="activity in activities" :key="activity.id" class="card bg-white shadow-lg rounded-lg p-6 mb-6 dark:bg-gray-800 dark:shadow-gray-700">
          <h5 class="mb-3 text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
            {{ activity.name }}
          </h5>
          <p class="text-gray-700 dark:text-gray-400 mb-4" v-if="activity.description">
            {{ activity.description }}
          </p>
          <p class="text-sm text-gray-600 dark:text-gray-400">Elapsed time: {{ formatTime(activity.elapsedTime) }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { db } from '../firebase/init.js'
import { collection, getDocs, addDoc, doc, updateDoc } from 'firebase/firestore'
import BarChart from './BarChart.vue';

const activities = ref([])
const newActivity = ref({
  name: '',
  description: '',
  elapsedTime: 0,
  timer: null,
  progress: 0
})

const fetchActivities = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, 'activities'))
    activities.value = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
    console.log('Fetched activities:', activities.value)
  } catch (error) {
    console.error('Error fetching activities:', error)
  }
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
  activity.timer = setInterval(() => {
    activity.elapsedTime++
    activity.progress = activity.elapsedTime
    updateActivity(activity)
  }, 1000)
}

const pauseTimer = (activity) => {
  clearInterval(activity.timer)
  activity.timer = null
  updateActivity(activity)
}

const resumeTimer = (activity) => {
  startTimer(activity)
}

const stopTimer = (activity) => {
  clearInterval(activity.timer)
  activity.elapsedTime = 0
  activity.timer = null
  activity.progress = 0
  updateActivity(activity)
}

const formatTime = (seconds) => {
  const hours = Math.floor(seconds / 3600)
  const minutes = Math.floor((seconds % 3600) / 60)
  const remainingSeconds = seconds % 60
  return `${hours}h ${minutes}m ${remainingSeconds}s`
}
</script>

<style scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  min-height: 100vh;
}

.card {
  padding: 1.5rem;
  margin-bottom: 1rem;
  border: 1px solid #e2e8f0;
  border-radius: 0.75rem;
  background-color: #ffffff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s ease, transform 0.3s ease;
}

.card:hover {
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  transform: translateY(-0.25rem);
}

.card h5 {
  font-size: 1.25rem;
  margin-bottom: 0.5rem;
}

.card p {
  margin-bottom: 0.75rem;
}

.card p:last-child {
  margin-bottom: 0;
}
</style>
