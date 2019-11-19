<template>
    <v-card>
        <v-row>
            <v-col cols="1"></v-col>
            <v-col cols="3">
                <v-switch v-model="availableOnly" label="Available only"></v-switch>
            </v-col>
            <v-col cols="2">
                <v-radio-group v-model="gender" column>
                    <v-radio label="Man" value="Man"></v-radio>
                    <v-radio label="Woman" value="Woman"></v-radio>
                    <v-radio label="Unisex" value="Unisex"></v-radio>
                </v-radio-group>
            </v-col>
            <v-col cols="3">
                <v-select outlined
                    v-model="category"
                    :items="availableCategories"
                    label="Category"
                    ></v-select>
            </v-col>
            <v-col cols="2">
                <v-form v-model="ratingValid">
                    <v-text-field
                        v-model="rating"
                        type="number"
                        :rules="ratingRules"
                        label="Rating"></v-text-field>
                </v-form>
            </v-col>
            <v-col cols="1"></v-col>
        </v-row>
        <v-row>
            <v-col cols="1"></v-col>
            <v-col cols="2">
                <v-form v-model="priceFromValid">
                    <v-text-field
                        v-model="priceFrom"
                        :rules="priceFromRules"
                        type="number"
                        label="Price from"></v-text-field>
                </v-form>
            </v-col>
            <v-col cols="2">
                <v-text-field
                    v-model="priceTo"
                    type="number"
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
import { mapState } from 'vuex';

export default {
    data() {
        return {
            availableOnly: false,
            category: 'None',
            gender: 'Unisex',
            ratingRules: [
                v => {
                    const isEmpty = v.length === 0;
                    const isInRange = (Number(v) >= 1) && (Number(v) <= 5);

                    if (isEmpty || isInRange) return true;

                    return 'Rating should be between 0 and 5';
                }
            ],
            ratingValid: true,
            rating: '',
            priceTo: '',
            priceFrom: '',
            priceFromValid: true,
            priceFromRules: [
                v => {
                    const isEmpty = v.length === 0;
                    const isLessThanTo = Number(v) < Number(this.priceTo);

                    if (isEmpty || isLessThanTo) return true;

                    return 'Price from should be less than price from';
                }
            ]
        }
    },
    methods: {
        applyFilters() {
            if (this.ratingValid && this.priceFromValid) {
                this.$store.commit('filterProducts', {
                    availableOnly: this.availableOnly,
                    category: this.category,
                    gender: this.gender,
                    rating: +this.rating,
                    priceTo: +this.priceTo,
                    priceFrom: +this.priceFrom
                });
            }
        },
        clearFilters() {
            this.availableOnly = false;
            this.category = this.availableCategories[0];
            this.gender = 'Unisex';
            this.rating = '';
            this.priceTo = '';
            this.priceFrom = '';

            this.$store.commit('filterProducts', null);
        }
    },
    computed: {
        ...mapState({
            availableCategories: state => state.products.availableCategories
        })
    }
}
</script>

<style>
</style>