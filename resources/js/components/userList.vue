<template>
    <table class="table table-striped">
        <thead>
        <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Age</th>
            <th>Department</th>
            <th>Actions</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(user, i) in users">
            <td>{{user.name}}</td>
            <td>{{user.email}}</td>
            <td>{{user.age}}</td>
            <td>{{user.department}}</td>
            <td>
                <button v-on:click="editUser(user)">Edit</button>
                <button v-on:click="deleteUser(user, i)">Delete</button>
                <button @click="definePlayer(1, user)">Player 1</button>
                <button @click="definePlayer(2, user)">Player 2</button>
            </td>
        </tr>
        </tbody>
    </table>
</template>

<script>
    module.exports = {
        props: ["users"],
        data:function() {
            return {};
        },
        methods:{
            definePlayer: function(playerNumber, user){
                Vue.set(this.$root, "player" + playerNumber, user.name); 
            },
            editUser: function(user){
                this.$emit("edit-user", user);
            },
            deleteUser: function(user, index) {
                this.$emit("delete-user", user, index);
            }
        }
    }
</script>

<style>

</style>