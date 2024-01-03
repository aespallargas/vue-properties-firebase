<script setup>

    import usePropiedades from '../composables/usePropiedades'
    import Propiedad from '../components/Propiedad.vue'
    import {propertyPrice} from '../helpers/'

    const { piscina, filteredItems } = usePropiedades()
</script>

<template>

    <h1 class="text-center text-h3 my-5 font-weight-bold">Nestras Propiedades</h1>

    <v-card flat class="py-10">
        <v-card-title class="text-5">
            Búsqueda
            <v-checkbox label="Piscina" v-model="piscina" />
        </v-card-title>
        <v-row>
            <Propiedad
                v-for="propiedad in filteredItems"
                :key="propiedad.id"
                :propiedad="propiedad"
                :price="propertyPrice"
            />
        </v-row>

    </v-card>

</template>
