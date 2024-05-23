import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
//import './style.css'
import App from './App.vue'
import RegisterItem from './components/RegisterItem.vue'
import LoginItem from './components/LoginItem.vue'
import './index.css'
import '../node_modules/flowbite-vue/dist/index.css'
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
    apiKey: "AIzaSyBoJdt5T610N1PrhBed26AOsB9it5fvnbo",
    authDomain: "timestat-f791f.firebaseapp.com",
    projectId: "timestat-f791f",
    storageBucket: "timestat-f791f.appspot.com",
    messagingSenderId: "135349937977",
    appId: "1:135349937977:web:302529691080fc7ccdaae8",
    measurementId: "G-QCN8CYDJ3Q"
};

const router = createRouter({
    history: createWebHistory(),
    routes: [
        // Define routes here
        { path: '/', component: App },
        { path: '/register', component: RegisterItem },
        { path: '/login', component: LoginItem }
    ]
})

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

createApp(App).use(router).mount('#app')
//app.use(router).mount('#app')
