<!--<script setup>
import HelloWorld from './components/HelloWorld.vue'
</script>
-->
<!--
<script>
//import HelloWorld from './components/HelloWorld.vue'
import { FwbDropdown, FwbListGroup, FwbListGroupItem } from 'flowbite-vue'
import NavbarItem from './components/NavbarItem.vue'
export default {
  components: { 
    NavbarItem,
  },
}
</script>

<template>
  <NavbarItem />
  <div>
    <h1 class="mx-4 text-2xl text-center text-yellow-100 bg-cyan-600 ">Pozdrav Brate, ovo je home page</h1>
  </div>
  <router-link to="/login">Login</router-link>
  <router-link to="/register">Register</router-link> 
  <p>samo na pocetnoj</p>
  <router-view />
</template>

-->
<script>
import { FwbDropdown, FwbListGroup, FwbListGroupItem } from 'flowbite-vue'
import NavbarItem from './components/NavbarItem.vue'
import FooterItem from './components/FooterItem.vue'
export default {
  components: { 
    NavbarItem,
    FooterItem,
  },
}
</script>

<template class="flex flex-col min-h-screen">
  <NavbarItem />
  <div>
    <h1 class="mx-4 text-2xl text-center text-yellow-100 bg-cyan-600 ">Pozdrav Brate, ovo je zastava</h1>
  </div>
  <router-view />
  <FooterItem class="fixed w-full bg-cyan-300 mx-auto p-4 md:py-8 bottom-0" />
</template>
