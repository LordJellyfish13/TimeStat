<!--<script setup>
import HelloWorld from './components/HelloWorld.vue'
</script>
-->

<script>
import HelloWorld from './components/HelloWorld.vue'
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
</template>