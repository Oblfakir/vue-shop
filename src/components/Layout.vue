<template>
    <div class="layout">
        <v-app-bar app
            color="green"
            dense dark>
            <v-app-bar-nav-icon></v-app-bar-nav-icon>
            <v-toolbar-title>Online Market | Vue assessment</v-toolbar-title>
            <v-spacer></v-spacer>
        </v-app-bar>

        <v-content>
            <v-container fluid>
                <router-view></router-view>
            </v-container>
        </v-content>
    </div>
</template>

<script>

export default {
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