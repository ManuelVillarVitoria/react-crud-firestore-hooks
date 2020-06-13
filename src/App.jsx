import React, {useState, useEffect} from 'react';
import {firebase} from './firebase';
//import shortid from 'shortid';// npm i shortid (libreria de generador de ID)


function App() {

const [tarea, setTarea] = useState('')
const [tareas, setTareas] = useState([])
const [modoEdicion, setModoEdicion] = useState(false)
const [id, setId] = useState('')
const [error, setError] = useState(null)


 useEffect(() => {
  const obtenerDatos = async () => {
    try {
      const db = firebase.firestore()
      const data = await db.collection('tareas').get()
      //console.log(data.docs)
      //...doc.data(). Con esto sacamos a fuera los datos del segundo objeto, y los colocamos en un array simple de objetos.
      //No colocamos await, porque no hace efecto en esta operación.
      const arrayData = data.docs.map(doc => ({ id: doc.id, ...doc.data() }))
      console.log(arrayData)
      setTareas(arrayData)

    } catch (error) {
      console.log(error)
    }
  }

  obtenerDatos()
}, [])


const agregarTarea = async (e) => {
  e.preventDefault();

  if( !tarea.trim() ) {
    //console.log('Elemento Vacío')
    setError(' Escriba algo por favor... ')
    return
    } else if ( tarea.trim().length < 3 || tarea.trim().length >= 33 ) {
      setError(' El texto debe comprender entre 3 y 32 carácteres. ')
      return
    }

    try {
      const db = firebase.firestore()
      const nuevaTarea = {
        name: tarea,
        fecha: Date.now()
      }
      const data = await db.collection('tareas').add(nuevaTarea)
  
    //console.log(tarea)
    //Añadir nuevas tareas a la existente
    setTareas([
      ...tareas,
      //{id: shortid.generate(), nombreTarea: tarea}
      {...nuevaTarea, id: data.id}
    ])

    //Limpiar el formulario
    setTarea('')
    //Limpiar mensaje de error
    setError(null)
      
    }catch (error) {
      console.log(error)
    }
    console.log(tarea)
}

const eliminarTarea = async(id) => {
  try {
    const db = firebase.firestore()
    await db.collection('tareas').doc(id).delete()
  //console.log(id);
  const arrayFiltrado = tareas.filter(item => item.id !== id)
  setTareas(arrayFiltrado)

  } catch (error) {
    console.log(error)
  }
}

const editar = item => {
  //console.log(item)
  setModoEdicion(true)
  //pasamos el contenido de la tarea al formulario de editar tarea, cuando pulsamos editar
  setTarea(item.name)
  setId(item.id)
}

const editarTarea = async(e) => {
    e.preventDefault(); 
    if( !tarea.trim() ){
      //console.log('Elemento Vacío')
      setError(' Escriba algo por favor... ')
      return
    } else if ( tarea.trim().length < 3 || tarea.trim().length >= 33 ) {
      setError(' El texto debe comprender entre 3 y 32 carácteres. ')
      return
    }
    
    try {
      const db = firebase.firestore()
      await db.collection('tareas').doc(id).update({
        name: tarea
      })
    
    //Devolver solo las tareas modificadas al nuevo array, si el ID de dichas tareas coinciden 
    //con la tarea que clickamos para editar,el resto de tareas devolverlas tal como estaban.
    const arrayEditado = tareas.map(item => item.id === id ? {id:id,fecha: item.fecha, name:tarea} : item)

    setTareas(arrayEditado)
    setModoEdicion(false)
    setTarea('')
    setId('')
    setError(null)

    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="container mt-5">
      <h1 className="text-center">CRUD con Firebase & Hooks</h1>
      <hr></hr>
      <div className="row">
        <div className="col-8">
          <h4 className="text-center">Lista de Tareas</h4>

            <ul className="list-group">
              { tareas.length === 0 ? (
                <li className="list-group-item">No hay Tareas</li>
              ) : (
                    tareas.map(item => (
                      <li className="list-group-item" key={item.id}>
                        <span className="lead">{item.name}</span>

                        <button 
                          className="btn btn-danger btn-sm float-right mx-2"
                          onClick={() => eliminarTarea(item.id)}
                        >Eliminar</button>

                        <button 
                          className="btn btn-warning btn-sm float-right"
                          onClick={() => editar(item)}
                        >Editar</button>
                      </li>
                    ))
                  )
               }
            </ul>
        </div>

        <div className="col-4">
          <h4 className="text-center">
            {modoEdicion ? 'Editar Tarea' : 'Agregar Tarea'}
          </h4>

          <form onSubmit={modoEdicion ? editarTarea : agregarTarea}
          >

          {!tarea.trim() ? (
                  <div>
                    {error ? <span className="text-danger font-weight-bold font-italic">{error}</span> : null }
                  </div>
                  
               ) : (
                  <div>
                  {error ? <span className="text-dark bg-warning font-weight-bold font-italic">{error}</span> : null }
                  </div>
               )} 
           
            <input 
              type="text"
              className="form-constrol mb-2"
              //minLength="3" //Opción validación de carácteres mínimos.Con Pop up
              //maxLength="32" // Opción validación de carácteres máximos. No tiene Pop up
              //required // Opción validación de no dejar campo vacío. Con Pop up
              placeholder= 'Ingresar Tarea'
              onChange={e => setTarea(e.target.value)}
              value={tarea}
            />

            { modoEdicion ? (
                <button  
                  type="submit"
                  className="btn btn-warning btn-block"
                >Editar</button> 
              ) : (
                <button  
                  type="submit"
                  className="btn btn-dark btn-block"
                >Agregar</button> 
              )
            }
          </form>

        </div>
      </div>
    </div>
  );
}

export default App;
