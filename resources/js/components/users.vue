<template>
    <div>
        <div class="jumbotron">
            <h1></h1>
        </div>
        <user-list :users="users" @edit-user="editUser" @delete-user="deleteUser"></user-list>

        <div class=" alert" v-bind:class="{'alert-success':showSuccess, 'alert-danger':showFailure}" v-if="showSuccess || showFailure">
            <button type="button" class="close-btn" @click="showSuccess = false; showFailure = false;">&times;</button>
            <strong>@{{(successMessage!='')?successMessage:failMessage}}</strong>
        </div>

        <user-edit :show="editingUser"
                    :user="currentUser"
                    :departments="departments"
                    @cancel-edit="cancelEdit"
                    @save-user="saveUser">
        </user-edit>

    </div>
</template>

<script>
    module.exports= {
        data: function() {
            return{
                title: 'List Users',
                editingUser: false,   
                showSuccess: false,
                showFailure: false,
                successMessage: '',
                failMessage: '',
                currentUser: {},
                users: [],
                departments: []
            };
        },
        methods: {
            editUser: function(user){
                this.editingUser=true;
                this.currentUser = Object.assign({}, user);
            },
            deleteUser: function(user, i){
                axios.delete('/api/users/' + user.id)
                .then(response => {
                    this.showFailure = false;
                    this.failMessage = '';
                    this.showSuccess=true;
                    this.successMessage = 'User deleted';
                    //let index = -1;
                    //this.users.filter((u, i) => {
                    //    if (u == user){
                    //        index = i;
                    //    }
                    //})

                    setTimeout(() => {
                        this.showSuccess = false;
                        this.successMessage = '';
                    }, 2000)

                    this.users.splice(i, 1);
                }).catch(error => {
                    this.showSuccess = false;
                    this.successMessage = '';
                    this.showFailure=true;
                    this.failMessage = "Failed to delete";
                    console.log(error);
                })
            },
            saveUser: function(){
                const user = this.currentUser;
                axios.put("/api/users/" + user.id, user)
                    .then(response => {
                        this.showSuccess = true;
                        this.successMessage = 'User saved successfully';
                        this.showFailure = false;
                        this.showFailure = '';

                        this.users.forEach( u => {
                            if (u.id == user.id){
                                Object.assign(u, response.data.data);
                            }
                        })

                        setTimeout(() => {
                            this.showSuccess = false;
                            this.successMessage = '';
                        }, 2000)

                        this.editingUser=false;
                    }).catch(error => {
                        this.showSuccess = false;
                        this.successMessage = '';
                        this.showFailure = true;
                        this.failMessage = 'User failed to save';
                    })

            },
            cancelEdit: function(){
                this.editingUser=false;
            }            
        },
        mounted(){
                axios.get('/api/users')
                    .then(response => {
                        this.users = response.data.data;
                    })

                axios.get('/api/departments')
                    .then(response => {
                        this.departments = response.data.data;
                    })
            }
    }
</script>
