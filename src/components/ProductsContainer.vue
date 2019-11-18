<template>
    <div class="d-flex flex-wrap">
        <v-flex xs12 md6 lg4 v-for="product in products" :key="product.id" class="pa-3">
            <ProductCard :product="product"/>
        </v-flex>
    </div>
</template>

<script>
import ProductCard from '@/components/ProductCard.vue';

export default {
    props: [ 'products' ],
    components: {
        ProductCard
    }
}
</script>

<style>
</style>