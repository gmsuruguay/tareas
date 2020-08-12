<template>
    <div>
        <h1>Inicio</h1>       
        <form @submit.prevent="addNewItem()">
            <div class="input-group mb-3">
                <input class="form-control" type="text" v-model="nombre">
                <div class="input-group-append">
                <button type="submit" class="btn btn-primary" v-on:keyup.enter="addNewItem()">Agregar</button>
                </div>
            </div>
        </form>
        <ul class="list-group">
            <li class="list-group-item d-flex justify-content-between align-items-center"
            v-for="(tarea,index) in tareas" :key="index"> {{tarea.nombre}}
            <span>
                <router-link :to="{name: 'Editar' , params:{id:tarea.id}}">
                    <button type="button" class="btn btn-link text-primary"> <i class="material-icons">create</i></button>
                </router-link>
                <button type="button" class="btn btn-link text-danger" @click="eliminarTarea(tarea.id)"><i class="material-icons">delete_outline</i></button>
            </span>  
            </li>
        </ul>      
    </div>
</template>

<script>
import {mapActions, mapState, mapMutations} from 'vuex'
    export default {
        name: 'Inicio',
        data(){
           return{
                nombre:''
            }
        },
        created(){
            this.getTareas()
        },
        methods:{
            ...mapActions(['getTareas','eliminarTarea']),
            addNewItem(){
                this.$store.dispatch('agregarTarea',this.nombre)
                this.nombre = ''
            }
        },
        computed:{
            ...mapState(['tareas'])
        }
    }
</script>