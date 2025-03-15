<script setup lang="ts">
import { ref, onMounted } from 'vue';
import type Admin from '~/interfaces/admin';
import { getAdmins } from '~/hooks/getAdmins';

const admins = ref<Admin[]>([]);

onMounted(async () => {
    admins.value = await getAdmins() as Admin[];
});
</script>

<template>
    <section>
        <p>This page will be displayed at the /about route.</p>
        <ul>
            <li v-for="admin in admins" :key="admin.id">
                <h2>{{ admin.fields.Name }}</h2>
                <p>Nom: {{ admin.fields.Nom }}</p>
                <p>Prénom: {{ admin.fields.Prenom }}</p>
                <p>Email: {{ admin.fields.Email }}</p>
                <p>Mot de passe: {{ admin.fields['Mot de passe'] }}</p>
            </li>
        </ul>
    </section>
</template>