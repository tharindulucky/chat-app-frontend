<template>
    <div class="col-md-3">
        <ul class="list-group">
          <li class="list-group-item">
            <router-link to="/user" class="threads">Tharindu Lakshitha</router-link>
          </li>
          <li class="list-group-item">
            <router-link to="/user" class="threads">Tharindu Lakshitha</router-link>
          </li>
        </ul>
    </div>
</template>

<script>
  export default {
    name: 'Sidebar'
  }
</script>

<style scoped>

.list-group-item{
  text-align: left;
}
</style>