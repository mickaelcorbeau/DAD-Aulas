/*jshint esversion: 6 */

/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');

window.Vue = require('vue');

import VueRouter from 'vue-router';
Vue.use(VueRouter);

const userListComponent = Vue.component('user-list', require('./components/userList.vue'));
const userEditComponent = Vue.component('user-edit', require('./components/editUser.vue'));
const usersComponent = Vue.component('users', require('./components/users.vue'));
const game = Vue.component('game', require('./components/tictactoe.vue'));

const routes = [
    {path: '/', redirect: '/users'},
    {path: '/users', component:usersComponent},
    {path: '/list', component:userListComponent},
    {path: '/game', component:game}
]

const router = new VueRouter({
    // routes: routes
    routes
})

const app = new Vue({
    el: '#app',
    router,
    data:{
        player1: undefined,
        player2: undefined
    }
    
});
