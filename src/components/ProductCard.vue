<template>
    <v-card outlined>
        <v-img :src="imageSrc" @error="onImgLoadError">
            <v-rating v-model="product.rating" small
                color="white" background-color="white"></v-rating>
        </v-img>
        <v-card-title>
            {{ product.name }}
        </v-card-title>
        <v-card-subtitle>
            {{ product.category }}
        </v-card-subtitle>
        <v-card-text>
            {{ product.description }}
        </v-card-text>
        <v-card-actions>
            <v-list-item class="grow">
                <v-list-item-content>
                    <v-list-item-title>
                        {{ product.cost }}
                    </v-list-item-title>
                </v-list-item-content>
                <v-row align="center" justify="end" >
                    <v-btn small>
                        Add to basket
                    </v-btn>
                    <v-btn small @click="navigateToDetails(product.id)">
                        Details
                    </v-btn>
                </v-row>
            </v-list-item>
        </v-card-actions>
    </v-card>
</template>

<script>
export default {
    data() {
        return {
            imageSrc: this.product.image
        }
    },
    methods: {
        onImgLoadError() {
            this.imageSrc = 'https://via.placeholder.com/400x300';
        },
        navigateToDetails(id) {
            this.$router.push(`/products/${id}`);
        }
    },
    props: [ 'product' ]
}
</script>

<style>
</style>