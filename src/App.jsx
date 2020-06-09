import React from 'react';
import shortid from 'shortid';// npm i shortid (libreria de generador de ID)


function App() {

const [tarea, setTarea] = React.useState('')
const [tareas, setTareas] = React.useState([])
const [modoEdicion, setModoEdicion] = React.useState(false)
const [id, setId] = React.useState('')
const [error, setError] = React.useState(null)


const agregarTarea = e => {
  e.preventDefault();

  if( !tarea.trim() ) {
    //console.log('Elemento Vacío')
    setError(' Escriba algo por favor... ')
    return
    } else if ( tarea.trim().length < 3 || tarea.trim().length >= 33 ) {
      setError(' El texto debe comprender entre 3 y 32 carácteres. ')
      return
    }
  
    //console.log(tarea)
    //Añadir nuevas tareas a la existente
    setTareas([
      ...tareas,
      {id: shortid.generate(), nombreTarea: tarea}
    ])

    //Limpiar el formulario
    setTarea('')
    //Limpiar mensaje de error
    setError(null)
}

const eliminarTarea = id => {
  //console.log(id);
  const arrayFiltrado = tareas.filter(item => item.id !== id)
  setTareas(arrayFiltrado)
}

const editar = item => {
  //console.log(item)
  setModoEdicion(true)
  //pasamos el contenido de la tarea al formulario de editar tarea, cuando pulsamos editar
  setTarea(item.nombreTarea)
  setId(item.id)
}

const editarTarea = e => {
    e.preventDefault(); 
    if( !tarea.trim() ){
      //console.log('Elemento Vacío')
      setError(' Escriba algo por favor... ')
      return
    } else if ( tarea.trim().length < 3 || tarea.trim().length >= 33 ) {
      setError(' El texto debe comprender entre 3 y 32 carácteres. ')
      return
    }
    
    //Devolver solo las tareas modificadas al nuevo array, si el ID de dichas tareas coinciden 
    //con la tarea que clickamos para editar,el resto de tareas devolverlas tal como estaban.
    const arrayEditado = tareas.map(item => item.id === id ? {id:id, nombreTarea:tarea} : item)

    setTareas(arrayEditado)
    setModoEdicion(false)
    setTarea('')
    setId('')
    setError(null)
  }

  return (
    <div className="container mt-5">
      <h1 className="text-center">CRUD Simple con Hooks</h1>
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
                        <span className="lead">{item.nombreTarea}</span>

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
