<template>
  <div class="container mx-auto px-4 relative">
    <!-- Activities Section -->
    <div class="mb-8 flex justify-between items-center">
      <h2 class="text-2xl font-bold mb-4">Activities</h2>
      <!-- Plus Button -->
      <button
        @click="openModal"
        class="bg-green-500 text-white rounded-full w-12 h-12 flex items-center justify-center shadow-lg hover:bg-green-600 transition duration-300"
      >
        <span class="text-2xl">+</span>
      </button>
    </div>

    <div
      v-for="activity in activities"
      :key="activity.id"
      class="card bg-white shadow-lg rounded-lg p-6 mb-6 dark:bg-gray-800 dark:shadow-gray-700"
    >
      <h5
        class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white"
      >
        {{ activity.name }}
      </h5>
      <p class="font-normal text-gray-700 dark:text-gray-400">
        {{ activity.description }}
      </p>
      <p>Elapsed time: {{ formatTime(activity.elapsedTime) }}</p>
      <div class="flex gap-2 mt-4">
        <button
          @click="toggleTimer(activity)"
          class="px-4 py-2 rounded text-white"
          :class="activity.timer ? 'bg-yellow-400' : 'bg-green-500'"
        >
          {{ activity.timer ? "Pause" : "Resume" }}
        </button>
        <button
          @click="stopTimer(activity)"
          class="px-4 py-2 rounded text-white bg-red-500"
        >
          Stop
        </button>
      </div>
    </div>

    <!-- Horizontal Divider -->
    <div class="w-full border-t border-gray-300 mb-8"></div>

    <!-- Dashboard Section -->
    <div>
      <h2 class="text-2xl font-bold mb-4">Dashboard</h2>
      <div
        class="card bg-white shadow-lg rounded-lg p-6 dark:bg-gray-800 dark:shadow-gray-700"
      >
        <form @submit.prevent="addActivity">
          <div class="mb-4">
            <label for="name" class="block mb-2 font-semibold"
              >Activity Name</label
            >
            <input
              type="text"
              id="name"
              v-model="newActivity.name"
              class="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              required
            />
          </div>
          <div class="mb-4">
            <label for="description" class="block mb-2 font-semibold"
              >Description (Optional)</label
            >
            <textarea
              id="description"
              v-model="newActivity.description"
              class="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            ></textarea>
          </div>
          <button
            type="submit"
            class="w-full px-4 py-2 bg-green-500 text-white rounded-lg shadow-md hover:bg-green-600 transition duration-300"
          >
            Start Timer
          </button>
        </form>
      </div>
    </div>

    <!-- Modal -->
    <div
      v-if="isModalOpen"
      class="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-50"
    >
      <div class="bg-white rounded-lg p-6 shadow-lg w-full max-w-md">
        <h2 class="text-xl font-bold mb-4">Add New Activity</h2>
        <form @submit.prevent="addActivityAndCloseModal">
          <div class="mb-4">
            <label for="modal-name" class="block mb-2 font-semibold"
              >Activity Name</label
            >
            <input
              type="text"
              id="modal-name"
              v-model="newActivity.name"
              class="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400"
              required
            />
          </div>
          <div class="mb-4">
            <label for="modal-description" class="block mb-2 font-semibold"
              >Description (Optional)</label
            >
            <textarea
              id="modal-description"
              v-model="newActivity.description"
              class="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400"
            ></textarea>
          </div>
          <div class="flex justify-end gap-4">
            <button
              type="button"
              @click="closeModal"
              class="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg shadow hover:bg-gray-400 transition duration-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              class="px-4 py-2 bg-green-500 text-white rounded-lg shadow-md hover:bg-green-600 transition duration-300"
            >
              Add Activity
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { db } from "../firebase/init.js";
import {
  collection,
  getDocs,
  addDoc,
  doc,
  updateDoc,
} from "firebase/firestore";

const activities = ref([]);
const newActivity = ref({
  name: "",
  description: "",
  elapsedTime: 0,
  timer: null,
  progress: 0,
});

const isModalOpen = ref(false);

const openModal = () => {
  isModalOpen.value = true;
};

const closeModal = () => {
  isModalOpen.value = false;
};

const fetchActivities = async () => {
  const querySnapshot = await getDocs(collection(db, "activities"));
  activities.value = querySnapshot.docs.map((doc) => {
    const data = doc.data();
    return { id: doc.id, ...data, timer: null }; // Ensure timer is null on reload
  });
};

onMounted(fetchActivities);

const addActivity = async () => {
  const activity = {
    name: newActivity.value.name,
    description: newActivity.value.description,
    elapsedTime: 0,
    timer: null,
    progress: 0, // Initialize progress to 0
  };

  activities.value.push(activity); // Directly push the new activity
  startTimer(activity); // Start the timer immediately upon adding

  newActivity.value = {
    name: "",
    description: "",
    elapsedTime: 0,
    timer: null,
    progress: 0,
  };

  try {
    const docRef = await addDoc(collection(db, "activities"), activity);
    activity.id = docRef.id;
  } catch (error) {
    console.error("Error adding activity to Firestore: ", error);
  }
};

const addActivityAndCloseModal = async () => {
  await addActivity();
  closeModal();
};

const updateActivity = async (activity) => {
  try {
    await updateDoc(doc(db, "activities", activity.id), {
      elapsedTime: activity.elapsedTime,
      progress: activity.progress,
    });
  } catch (error) {
    console.error("Error updating activity in Firestore: ", error);
  }
};

const toggleTimer = (activity) => {
  if (activity.timer) {
    pauseTimer(activity);
  } else {
    startTimer(activity); // Corrected to start timer instead of resume
  }
};

const startTimer = (activity) => {
  if (activity.timer) return; // Prevent multiple timers

  activity.timer = setInterval(() => {
    activity.elapsedTime++;
    activity.progress = activity.elapsedTime;
    updateActivity(activity); // Update activity in Firestore
  }, 1000);
};

const pauseTimer = (activity) => {
  if (!activity.timer) return; // Only pause if timer is running

  clearInterval(activity.timer);
  activity.timer = null;
  updateActivity(activity); // Update activity in Firestore
};

const stopTimer = (activity) => {
  if (activity.timer) {
    clearInterval(activity.timer);
  }
  activity.elapsedTime = 0;
  activity.timer = null;
  activity.progress = 0;
  updateActivity(activity); // Update activity in Firestore
};

const formatTime = (seconds) => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;
  return `${hours}h ${minutes}m ${remainingSeconds}s`;
};
</script>

<style scoped>
/* Additional styling for modern look */
.card {
  background-color: #ffffff;
  border-radius: 0.75rem;
  padding: 1.5rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.container {
  max-width: 1000px; /* Optional, adjusts container width */
  margin-top: 2rem;
}

/* Plus Button */
button {
  position: relative;
}

/* Modal Background */
.fixed {
  z-index: 50;
}
</style>
