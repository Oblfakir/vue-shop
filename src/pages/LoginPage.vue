<template>
    <v-content>
        <v-container fluid>
            <v-row justify="center">
                <v-col lg="1" md="1" sm="1" justify="center">
                    <div class="logo">
                        <img src="../assets/logo.svg" alt="logo">
                    </div>
                </v-col>
            </v-row>
            <v-row>
                <v-col lg="4"></v-col>
                <v-col lg="4">
                    <v-card class="pa-2" tile outlined>
                        <v-card-title>
                            Login
                        </v-card-title>
                        <v-alert v-if="loginError" type="error">
                            {{ loginError }}
                        </v-alert>
                        <v-list-item>
                            <v-text-field
                                v-model="login"
                                :rules="loginRules"
                                label="Login"
                                required
                            ></v-text-field>
                        </v-list-item>
                        <v-list-item>
                            <v-text-field
                                v-model="password"
                                label="Password"
                                type="password"
                                required
                            ></v-text-field>
                        </v-list-item>
                        <v-card-actions>
                            <v-row justify="center">
                                <v-col lg="3" md="3" sm="3">
                                    <v-btn @click="tryPerformLogin">Login</v-btn>
                                </v-col>
                            </v-row>
                        </v-card-actions>
                        <v-row justify="center">
                            <v-col lg="12" md="12" sm="12">
                                <v-progress-linear active indeterminate
                                    v-if="isProgress"></v-progress-linear>
                            </v-col>
                        </v-row>
                    </v-card>
                </v-col>
                <v-col lg="4"></v-col>
            </v-row>
        </v-container>
    </v-content>
</template>

<script>
import { mapActions, mapState } from 'vuex';

export default {
    data() {
        return {
            login: '',
            password: '',
            loginRules: [
                v => v.length >= 3 || 'Login must be at least 3 characters' 
            ]
        }
    },
    computed: {
        ...mapState({
            isProgress: state => state.login.loginInProgress,
            isAuthenticated: state => state.login.isAuthenticated,
            loginError: state => state.login.loginError
        })
    },
    watch: {
        isAuthenticated() {
            this.$router.push('/');
        }
    },
    methods: {
        tryPerformLogin() {
            if (this.login && this.password) {
                this.authenticate({
                    login: this.login,
                    password: this.password
                });
            }
        },
        ...mapActions([ 'authenticate' ])
    }
}
</script>

<style lang="scss" scoped>
.logo {
    max-width: 150px;
}
</style>