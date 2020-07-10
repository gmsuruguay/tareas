<template>
    <div>
        <h1>Inicio</h1>
        <form @submit.prevent="agregarTarea(nombre)">
            <input type="text" v-model="nombre">
            <button type="submit">Agregar</button>
        </form>
        <ul>
            <li v-for="(tarea,index) in tareas" :key="index"> {{tarea.nombre}}
            <router-link :to="{name: 'Editar' , params:{id:tarea.id}}">
                <button> Editar </button>
            </router-link>
            <button @click="eliminarTarea(tarea.id)">Eliminar</button>
            </li>
        </ul>        
    </div>
</template>

<script>
import {mapActions, mapState} from 'vuex'
    export default {
        name: 'Inicio',
        data(){
            return{
                nombre: ''
            }
        },
        created(){
            this.getTareas()
        },
        methods:{
            ...mapActions(['getTareas','agregarTarea','eliminarTarea'])
        },
        computed:{
            ...mapState(['tareas'])
        }
    }
</script>