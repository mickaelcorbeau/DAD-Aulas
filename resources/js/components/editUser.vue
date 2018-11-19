<template>
    <div class="jumbotron" v-if="show">
        <h2>Edit User</h2>
        <div>
            <label>Name</label>
            <input type="text" v-model="user.name">
        </div>
        <div>
            <label>Email</label>
            <input type="text" v-model="user.email">
        </div>
        <div>
            <label>Age</label>
            <input type="text" v-model="user.age">
        </div>
        <div>

            <label>Department</label>
            <select v-model="user.department_id">
                <option v-for="department in departments" :value="department.id">
                    @{{ department.name }}
                </option>
            </select>
        </div>
        <button v-on:click="saveUser()">Save</button>
        <button v-on:click="cancelEdit()">Cancel</button>
    </div>
</template>
<script>
    module.exports = {
        props: ["show", "user", "departments"],
        data:function() {
            return { };
        },
        methods:{
            cancelEdit: function(){
                this.$emit("cancel-edit");        
            
            },
            saveUser: function() {
                this.$emit("save-user");        
            }
        }
    }
</script>