<template>
    <div class="col-md-3">
      <router-link :to="{name: 'new_session'}" class="btn btn-primary btn-block" role="button">New</router-link>
      <br>
        <ul class="list-group">
          <li class="list-group-item" v-for="session in sessions" :key="session.id">
            <router-link :to="{name: 'chat', params: {id: session.id}}" class="threads">{{session.contact.userData.name}}</router-link>
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