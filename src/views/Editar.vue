<template>
  <div>
    <h1>Editar tarea</h1>    
    <form action="" @submit.prevent="editarTarea(tarea)">
      <div class="input-group mb-3">
        <input class="form-control" type="text" v-model="tarea.nombre">
        <div class="input-group-append">
        <button type="submit" class="btn btn-primary">Editar</button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'

  export default {
    name: 'Editar',
    data(){
      return {
        id: this.$route.params.id
      }
    },
    created(){
      this.getTarea(this.id)
    },
    methods:{
      ...mapActions(['getTarea','editarTarea'])
    },
    computed:{
      ...mapState(['tarea'])
    }
  }
</script>
