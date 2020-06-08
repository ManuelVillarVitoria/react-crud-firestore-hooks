import React from 'react';
import shortid from 'shortid';// npm i shortid (libreria de generador de ID)


function App() {

const [tarea, setTarea] = React.useState('');
const [tareas, setTareas] = React.useState([]);
const [modoEdicion, setModoEdicion] = React.useState(false);


const agregarTarea = e => {
  e.preventDefault(); 
  if(!tarea.trim()){
    //console.log('elemento vacío')
  }
    //console.log(tarea)

    //Añadir nuevas tareas a la existente
    setTareas([
      ...tareas,
      {id: shortid.generate(), nombreTarea: tarea}
    ])

   //Vacíar el formulario
    setTarea('')
}

const eliminarTarea = id => {
  //console.log(id);
  const arrayFiltrado = tareas.filter(item => item.id !== id)
  setTareas(arrayFiltrado)
}

const editarTarea = item => {
  //console.log(item)
  setModoEdicion(true)
  //pasamos el contenido de la tarea al formulario de editar tarea, cuando pulsamos editar
  setTarea(item.nombreTarea)
}

  return (
    <div className="container mt-5">
      <h1 className="text-center">CRUD Simple con Hooks</h1>
      <hr></hr>
      <div className="row">
        <div className="col-8">
          <h4 className="text-center">Lista de Tareas</h4>

            <ul className="list-group">
              {tareas.map(item => (
                <li className="list-group-item" key={item.id}>
                  <span className="lead">{item.nombreTarea}</span>
                  <button 
                    className="btn btn-danger btn-sm float-right mx-2"
                    onClick={() => eliminarTarea(item.id)}
                  >Eliminar</button>
                  <button 
                    className="btn btn-warning btn-sm float-right"
                    onClick={() => editarTarea(item)}
                  >Editar</button>
                </li>
              ))
              }
            </ul>

        </div>

        <div className="col-4">
          <h4 className="text-center">
            {
              modoEdicion ? 'Editar Tarea' : 'Agregar Tarea'
            }
          </h4>

          <form 
            onSubmit={agregarTarea}
          >
            <input 
              type="text"
              className="form-constrol mb-2"
              placeholder="Ingresar tarea"
              onChange={e => setTarea(e.target.value)}
              value={tarea}
            />

            {
              modoEdicion ? (
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
