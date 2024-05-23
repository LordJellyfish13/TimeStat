<template>
    <fwb-navbar>
      <template #logo>
        <fwb-navbar-logo alt="Flowbite logo" image-url="/stopwatch-icon.webp" link="#">
          TimeStat
        </fwb-navbar-logo>
      </template>
      <template #default="{isShowMenu}">
        <fwb-navbar-collapse :is-show-menu="isShowMenu">
          <fwb-navbar-link is-active link="#">
            Home
          </fwb-navbar-link>
          <fwb-navbar-link link="#">
            Unos aktivnosti
          </fwb-navbar-link>
          <fwb-navbar-link link="#">
            Izracun aktivnosti
          </fwb-navbar-link>
          <fwb-navbar-link link="#">
            Pregled aktivnosti
          </fwb-navbar-link>
          <fwb-navbar-link link="/login">
            Login
          </fwb-navbar-link>
          <fwb-navbar-link link="/register">
            Register
          </fwb-navbar-link>
        </fwb-navbar-collapse>
      </template>
    </fwb-navbar>
  </template>
  
  <script setup>
  import {
    FwbNavbar,
    FwbNavbarCollapse,
    FwbNavbarLink,
    FwbNavbarLogo,
  } from 'flowbite-vue'
  </script>