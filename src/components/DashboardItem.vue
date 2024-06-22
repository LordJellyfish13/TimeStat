<template>
    <div class="dashboard">
        <h1>Dashboard</h1>
        <ul>
            <li v-for="activity in activities" :key="activity.id">
                {{ activity.name }}
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    data() {
        return {
            activities: [
                { id: 1, name: 'Activity 1' },
                { id: 2, name: 'Activity 2' },
                { id: 3, name: 'Activity 3' },
            ],
        };
    },
};
</script>