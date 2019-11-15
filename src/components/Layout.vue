<template>
    <div class="layout">
        <Header />

        <v-content>
            <v-container fluid>
                <router-view></router-view>
            </v-container>
        </v-content>
    </div>
</template>

<script>
import Header from './Header';

export default {
    components: {
        Header
    }
}
</script>

<style lang="scss">
    .layout {
        width: 100%;
        display: flex;
        flex-direction: column;

        &__header {

        }
        &__body {

        }
    }
</style>