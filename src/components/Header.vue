<template>
     <v-app-bar app
        color="green"
        dense dark>
        <v-app-bar-nav-icon></v-app-bar-nav-icon>
        <v-toolbar-title>Online Market | Vue assessment</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn v-if="userData" @click="performLogout" text> logout {{ userData.login }} </v-btn>
        <v-btn v-if="!userData" @click="toLogin" text> Login </v-btn>
    </v-app-bar>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
    computed: {
        ...mapState([ 'userData' ])
    },
    methods: {
        toLogin() {
            this.$router.push('/login');
        },
        performLogout() {
            this.logout();
        },
        ...mapActions([ 'logout' ])
    }
}
</script>

<style>
</style>