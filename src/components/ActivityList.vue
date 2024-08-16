<!--
<template>
    <div>
      <h2 class="class-text-xl font-bold mb-4">Activities</h2>
      <div v-if="loading">Loading...</div>
      <div v-else>
        <div v-for="activity in activities" :key="activity.id" class="card mb-4 overflow-auto break-words overflow-ellipsis">
          <h3 class="class-text-2xl font-bold tracking-tight">{{ activity.name }}</h3>
          <p class="text-gray-700 dark:text-gray-400">{{ activity.description }}</p>
          <p>
            Elapsed time: {{ formatTime(activity.elapsedTime) }}
          </p>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import { db } from '../firebase/init.js';
  import { collection, getDocs } from 'firebase/firestore';
  
  const activities = ref([]);
  const loading = ref(true);
  
  const fetchActivities = async () => {
    loading.value = true;
    const querySnapshot = await getDocs(collection(db, 'activities'));
    activities.value = querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
    loading.value = false;
  };
  
  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
    return `${hours}h ${minutes}m ${remainingSeconds}s`;
  };
  
  onMounted(() => {
    fetchActivities();
  });
  </script>
  
  <style scoped>
  .card {
    padding: 2rem;
    border: 1px solid #e5e7eb;
    margin-bottom: 1rem;
  }
  </style>
-->


<template>
  <div>
    <h1>Activity List</h1>
    <ul>
      <li v-for="activity in activities" :key="activity.id">
        <h3>{{ activity.name }}</h3>
        <p>{{ activity.description }}</p>
      </li>
    </ul>
  </div>
</template>

<script>
import { db } from '../firebase/init.js';
import { collection, query, onSnapshot } from 'firebase/firestore';

export default {
  data() {
    return {
      activities: []
    };
  },
  created() {
    const activitiesCollection = collection(db, 'activities');
    const q = query(activitiesCollection);
    onSnapshot(q, (querySnapshot) => {
      this.activities = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
    });
  }
};
</script>

<style scoped>
.card {
    padding: 2rem;
    border: 1px solid #e5e7eb;
    margin-bottom: 1rem;
  }
</style>

