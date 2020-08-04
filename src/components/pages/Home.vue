<template>
    <main class="login-form">
    <div class="cotainer">
        <div class="row justify-content-center">
            <div class="col-md-8">
                <div class="card">
                    <div class="card-header">Welcome!</div>
                      <div class="card-body">
                        <div class="row">
                          <Sidebar></Sidebar>
                        </div>
                      </div>
                </div>
            </div>
        </div>
    </div>
</main>
</template>

<script>
  import Sidebar from '../../components/Sidebar.vue'

  export default {
    name: 'Home',
    components: {
      Sidebar
    }
  }
</script>