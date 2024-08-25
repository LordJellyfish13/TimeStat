<template>
  <div>
    <div v-if="loading" class="text-center text-gray-600 dark:text-gray-400">
      Loading...
    </div>
    <div v-else>
      <Bar :data="computedChartData" :options="chartOptions" />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { Bar } from "vue-chartjs";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";
import { getDocs, collection } from "firebase/firestore";
import { db } from "../firebase/init.js"; // Adjust path as needed

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
);

const chartData = ref([]);
const loading = ref(true);

// Helper function to format time in a human-readable format
const formatTime = (seconds) => {
  if (seconds < 3600) {
    const minutes = Math.floor(seconds / 60);
    return `${minutes}m`;
  } else {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    return `${hours}h ${minutes}m`;
  }
};

const fetchActivities = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "activities"));
    const activities = querySnapshot.docs.map((doc) => {
      const data = doc.data();
      return { id: doc.id, ...data };
    });

    chartData.value = activities.map((activity) => {
      const progressInSeconds = activity.progress;
      const progressDisplay = formatTime(progressInSeconds);
      let progressValue;

      // Convert the progress to minutes for the chart, as that gives us a better scale
      progressValue = progressInSeconds / 3600; // Convert to minutes

      return {
        name: activity.name,
        progress: progressValue,
        progressDisplay: progressDisplay,
      };
    });
  } catch (error) {
    console.error("Error fetching activities:", error);
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  fetchActivities();
});

const computedChartData = computed(() => {
  if (!chartData.value || chartData.value.length === 0) {
    return { labels: [], datasets: [] };
  }

  return {
    labels: chartData.value.map((item) => item.name),
    datasets: [
      {
        label: "Progress",
        data: chartData.value.map((item) => item.progress),
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };
});

const chartOptions = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
      labels: {
        color: "#333", // Darker color for better contrast
      },
    },
    tooltip: {
      callbacks: {
        label: function (context) {
          const dataIndex = context.dataIndex;
          const dataPoint = chartData.value[dataIndex];
          return `${dataPoint.name}: ${dataPoint.progressDisplay}`;
        },
      },
    },
  },
  scales: {
    x: {
      ticks: {
        color: "#333", // Darker color for better contrast
      },
    },
    y: {
      ticks: {
        color: "#333", // Darker color for better contrast
      },
      grid: {
        color: "#ddd", // Light grid lines for better readability
      },
    },
  },
};
</script>

<style scoped>
.bar-chart-container {
  background-color: #ffffff;
  border-radius: 0.5rem;
  padding: 1rem;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}
</style>

/* trenutno se vrijeme popravilo za sate no treba jos prilagoditi vrijeme ako je
u minutama i na kraju grafa napisati ispravno vrijednosti */
