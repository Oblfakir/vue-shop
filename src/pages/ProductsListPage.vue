<template>
    <div class="products-list">
        <v-row>
            <v-col cols="12">
                <ProductsFilter />
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="12">
                <ProductsContainer :products="products"/>
            </v-col>
        </v-row>
    </div>
</template>

<script>
import { mapState } from 'vuex';
import ProductsFilter from '@/components/ProductsFilter';
import ProductsContainer from '@/components/ProductsContainer';

export default {
    components: {
        ProductsFilter,
        ProductsContainer
    },
    mounted() {
        this.$store.dispatch('loadProducts');
    },
    computed: {
        ...mapState({
            products: state => state.products.products,
            isProductsLoading: state => state.products.isProductsLoading
        })
    }
}
</script>

<style>
</style>