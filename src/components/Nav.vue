<template>
    <nav class="navbar navbar-expand-lg navbar-light navbar-laravel app-navigation">
    <div class="container">
        <router-link to="/" class="navbar-brand">SAWI ROW Tailoring System</router-link>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav ml-auto">
                <li class="nav-item">
                    <router-link to="/login" class="nav-link">Login</router-link>
                </li>
                <li class="nav-item">
                    <router-link to="/register" class="nav-link">Register</router-link>
                </li>
            </ul>

        </div>
    </div>
</nav>
</template>

<script>
  export default {
    name: 'Nav'
  }
</script>

<style scoped>
.app-navigation {
  background: #0d9fc4;
}

.app-navigation a {
    color:white;
}

.nav-link {
    color:white !important;
}
</style>