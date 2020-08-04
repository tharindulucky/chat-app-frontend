<template>
    <div class="col-md-3">
        <ul class="list-group">
          <li class="list-group-item" v-for="session in sessions" :key="session.id">
            <router-link to="/user" class="threads">Tharindu Lakshitha</router-link>
          </li>
        </ul>
    </div>
</template>

<script>
  export default {
    name: 'Sidebar',
    props: {
      sessions: {type: Array, required: true}
    }
  }
</script>

<style scoped>

.list-group-item{
  text-align: left;
}
</style>