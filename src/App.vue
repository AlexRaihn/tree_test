<template>
  <div class="flex flex-col items-center justify-center gap-4">
    <div class="flex gap-4">
      <router-link :to="{ name: 'HomeView' }">Главная</router-link> |
      <router-link :to="{ name: 'AboutView' }">О проекте</router-link>
    </div>
    <RouterView />
  </div>
</template>
<script setup lang="ts"></script>
