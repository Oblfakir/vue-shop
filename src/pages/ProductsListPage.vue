<template>
    <div class="products-list">
        <v-row>
            <v-col cols="12">
                <ProductsFilter />
            </v-col>
        </v-row>
        <v-row justify="center">
            <v-col cols="1" v-if="isProductsLoading">
                <v-progress-circular indeterminate></v-progress-circular>
            </v-col>
            <v-col cols="2" v-if="isNoMatchesVisible">
                No matches for currently applied filter
            </v-col>
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
        isNoMatchesVisible() {
            return !this.isProductsLoading && this.products.length === 0;
        },
        ...mapState({
            products: state => state.products.products,
            isProductsLoading: state => state.products.isProductsLoading
        })
    }
}
</script>

<style>
</style>