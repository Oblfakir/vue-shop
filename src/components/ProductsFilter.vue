<template>
    <v-card>
        <v-row>
            <v-col cols="1"></v-col>
            <v-col cols="3">
                <v-switch v-model="availableOnly" label="Available only"></v-switch>
            </v-col>
            <v-col cols="2">
                <v-radio-group v-model="gender" column>
                    <v-radio label="Male" value="Male"></v-radio>
                    <v-radio label="Female" value="Female"></v-radio>
                    <v-radio label="Unisex" value="Unisex"></v-radio>
                </v-radio-group>
            </v-col>
            <v-col cols="3">
                <v-select outlined
                    v-model="category"
                    :items="categories"
                    label="Category"
                    ></v-select>
            </v-col>
            <v-col cols="2">
                <v-text-field
                    v-model="rating"
                    type="number"
                    :rules="ratingRules"
                    label="Rating"></v-text-field>
            </v-col>
            <v-col cols="1"></v-col>
        </v-row>
        <v-row>
            <v-col cols="1"></v-col>
            <v-col cols="2">
                <v-text-field
                    v-model="priceFrom"
                    type="number"
                    label="Price from"></v-text-field>
            </v-col>
            <v-col cols="2">
                <v-text-field
                    v-model="priceTo"
                    type="number"
                    :rules="priceToRules"
                    label="Price to"></v-text-field>
            </v-col>
            <v-col cols="2"> </v-col>
            <v-col cols="2">
                <v-btn @click="applyFilters">
                    Apply
                </v-btn>
            </v-col>
            <v-col cols="2">
                <v-btn @click="clearFilters">
                    Clear
                </v-btn>
            </v-col>
            <v-col cols="1"></v-col>
        </v-row>
    </v-card>
</template>

<script>
export default {
    data() {
        return {
            categories: [ 'None', 'cat1', 'cat2', 'cat3'],
            availableOnly: false,
            category: 'None',
            gender: 'Unisex',
            ratingRules: [
                v => (String(v).length === 0 || ((v >= 1) && ( v <= 5))) || 'Rating should be between 0 and 5'
            ],
            rating: '',
            priceTo: '',
            priceFrom: '',
            priceToRules: [
                v => (String(v).length === 0 || v > this.priceFrom) || 'Price to should be greater than price from'
            ]
        }
    },
    methods: {
        applyFilters() {
            this.$store.commit('filterProducts', {
                availableOnly: this.availableOnly,
                category: this.category,
                gender: this.gender,
                rating: this.rating,
                priceTo: this.priceTo,
                priceFrom: this.priceFrom
            });
        },
        clearFilters() {
            this.availableOnly = false;
            this.category = this.categories[0];
            this.gender = 'Unisex';
            this.rating = '';
            this.priceTo = '';
            this.priceFrom = '';

            this.$store.commit('filterProducts', null);
        }
    }
}
</script>

<style>
</style>