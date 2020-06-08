import React from 'react';
import shortid from 'shortid';// npm i shortid (libreria de generador de ID)


function App() {

//State para guardar la tarea
const [tarea, setTarea] = React.useState('');
//State para guardar nuevas tareas a la existente
const [tareas, setTareas] = React.useState([]);


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
                  <button className="btn btn-warning btn-sm float-right">Editar</button>
                </li>
              ))
              }
            </ul>

        </div>

        <div className="col-4">
          <h4 className="text-center">Formulario</h4>

          <form onSubmit={agregarTarea}>
            <input 
              type="text"
              className="form-constrol mb-2"
              placeholder="Ingresar tarea"
              onChange={e => setTarea(e.target.value)}
              value={tarea}
            />
            <button  
              type="submit"
              className="btn btn-dark btn-block"
            >Agregar</button> 
          </form>

        </div>
      </div>
    </div>
  );
}

export default App;
