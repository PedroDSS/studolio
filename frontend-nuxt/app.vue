<template>
  <div>
    <h1>Admins</h1>
    <ul>
      <li v-for="admin in admins" :key="admin.id">{{ admin.fields?.Name || 'No Name' }}</li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { getAdmins } from '~/hooks/getAdmins';

const admins = ref([]);

onMounted(async () => {
  try {
    admins.value = await getAdmins();
  } catch (error) {
    console.error('Failed to fetch admins:', error);
  }
});
</script>