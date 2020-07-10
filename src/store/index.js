import Vue from 'vue'
import Vuex from 'vuex'
import {db} from '../firebase'
import router from '../router'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    tareas :[],
    tarea : { id :'', nombre:''}
  },
  mutations: {
    setTareas(state, payload){
      state.tareas = payload
    },
    setTarea(state, payload){
      state.tarea = payload      
    },
    addTarea(state,payload){
      state.tareas.push(payload)
    },
    eliminarTarea(state, payload){
      state.tareas = state.tareas.filter(tarea => tarea.id != payload)
    }
  },
  actions: {
    getTareas({commit}){
      const tareas = [] // declaro un array para almacenar las tareas
      db.collection('tareas').get() //Llamo a la colección de firebase con el nombre
      .then(res => {
        res.forEach(doc=>{         
          let tarea = doc.data()
          tarea.id = doc.id
          tareas.push(tarea)
        })
        commit('setTareas', tareas)
      })
    },
    getTarea({commit}, id){
      db.collection('tareas').doc(id).get()
      .then(res =>{
        //console.log(res.id)
        //console.log(res.data())
        let tarea = res.data()
        tarea.id = res.id
        commit('setTarea', tarea)
      })
    },
    editarTarea({commit},tarea){
      db.collection('tareas').doc(tarea.id).update({
        nombre: tarea.nombre
      }).then(()=>{
        console.log('Tarea Editada')
        router.push('/')
      })
    },
    agregarTarea({commit, dispatch}, nombreTarea){
      db.collection('tareas').add({
        nombre: nombreTarea
      }).then( res =>{
        console.log(res.id)
        //dispatch('getTareas')
        let tarea = {id:res.id , nombre:nombreTarea}
        commit('addTarea', tarea)
      })
    },
    eliminarTarea({commit, dispatch},id){
      db.collection('tareas').doc(id).delete()
      .then(()=>{
        console.log("Tarea eliminada")
        //dispatch('getTareas') //recarga pagina pero implica traer todos los datos del servidor
        commit('eliminarTarea', id)
      })
    }
  },
  modules: {
  }
})
