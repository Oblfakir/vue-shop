<template>
    <div class="product-details">
        <v-row v-if="!!product">
            <v-col md="6" cols="12">
                <v-row>
                    <v-col cols="12">
                        <v-img :src="imageSrc" @error="onImgLoadError"></v-img>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="12">
                        <v-rating v-model="product.rating" small color="green" background-color="white"></v-rating>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="4">
                       {{product.cost}}
                    </v-col>
                    <v-col cols="4">
                       {{product.gender}}
                    </v-col>
                    <v-col cols="4">
                       {{product.category}}
                    </v-col>
                </v-row>
            </v-col>
            <v-col md="6" cols="12">
                <v-row>
                    <v-col cols="12">
                        {{product.name}}
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="12">
                        {{product.description}}
                    </v-col>
                </v-row>
            </v-col>
        </v-row>
    </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
    methods: {
        onImgLoadError() {
            this.imageSrc = 'https://via.placeholder.com/400x300';
        }
    },
    mounted() {
        this.$store.dispatch('loadProduct', this.$route.params.id);
    },
    computed: {
        imageSrc() {
            return this.product ? this.product.image : '';
        },
        ...mapState({
            product: state => state.products.product,
            isProductsLoading: state => state.products.isProductsLoading,
        })
    }
}
</script>

<style>
</style>