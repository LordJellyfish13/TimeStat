<!--
<template>
    <div class="dashboard">
      <h1>Dashboard</h1>
      <p v-if="!state.isLoggedIn">You are in guest mode. Activities will only be saved locally.</p>
      <div v-if="loading">Loading...</div>
      <div v-else>
        <canvas id="activityChart"></canvas>
        <ul>
          <li v-for="activity in activities" :key="activity.id">
            {{ activity.name }} - {{ formatTime(activity.elapsedTime) }}
          </li>
        </ul>
      </div>
      <button @click="addNewActivity">Add Activity</button>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  //import { state } from '@/state';
  //import { db } from '@/firebase';
  import { collection, getDocs, query, where, addDoc } from 'firebase/firestore';
  import { Chart, registerables } from 'chart.js';
  
  Chart.register(...registerables);
  
  const activities = ref([]);
  const loading = ref(true);
  let activityChart;
  
  const fetchActivitiesFromFirebase = async () => {
    loading.value = true;
    const q = query(collection(db, 'activities'), where('userId', '==', state.user.uid));
    const querySnapshot = await getDocs(q);
    activities.value = querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
    loading.value = false;
    drawChart();
  };
  
  const fetchActivitiesFromLocalStorage = () => {
    loading.value = true;
    const localActivities = localStorage.getItem('activities');
    activities.value = localActivities ? JSON.parse(localActivities) : [];
    loading.value = false;
    drawChart();
  };
  
  const drawChart = () => {
    const ctx = document.getElementById('activityChart').getContext('2d');
    if (activityChart) {
      activityChart.destroy();
    }
    activityChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: activities.value.map(activity => activity.name),
        datasets: [{
          label: 'Elapsed Time (seconds)',
          data: activities.value.map(activity => activity.elapsedTime),
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  };
  
  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
    return `${hours}h ${minutes}m ${remainingSeconds}s`;
  };
  
  const addNewActivity = async () => {
    const newActivity = {
      name: 'New Activity',
      description: 'Description here...',
      elapsedTime: 0,
      userId: state.isLoggedIn ? state.user.uid : 'guest',
      timestamp: new Date()
    };
    if (state.isLoggedIn) {
      await addDoc(collection(db, 'activities'), newActivity);
      fetchActivitiesFromFirebase();
    } else {
      activities.value.push(newActivity);
      localStorage.setItem('activities', JSON.stringify(activities.value));
      drawChart();
    }
  };
  
  onMounted(() => {
    if (state.isLoggedIn) {
      fetchActivitiesFromFirebase();
    } else {
      fetchActivitiesFromLocalStorage();
    }
  });
  </script>
  
  <style scoped>
  .dashboard {
    padding: 2rem;
  }
  </style>

-->
  
<template>
  <div v-if="item">
    <h2>{{ item.name }}</h2>
    <p>{{ item.description }}</p>
  </div>
  <div v-else>
    <p>Tekts...</p>
  </div>
</template>

<script>
import { db } from '../firebase/init.js'; // Ensure this path is correct
import { doc, getDoc } from 'firebase/firestore';

export default {
  props: {
    itemId: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      item: null
    };
  },
  async created() {
    try {
      const docRef = doc(db, 'dashboardItems', this.itemId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        this.item = docSnap.data();
      } else {
        console.log('No such document!');
      }
    } catch (error) {
      console.error('Error fetching document:', error);
    }
  }
};
</script>

<style scoped>
.dashboard {
    padding: 2rem;
  }
</style>
