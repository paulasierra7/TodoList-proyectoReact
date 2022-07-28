import {useState} from 'react';
import Todo from './todo';
import "./todoApp.css";

export default function TodoApp() {
        const [title, setTitle] = useState("Hola");
        const [todos, setTodos] = useState([]);

        // cuando cambia lo que se escribe en input
        function handleChange(e){
            const value = e.target.value;
            setTitle(value);
        }// fin funcion

        // cuando se presiona enviar:
        function handleSubmit(e){
            e.preventDefault();

            //1. Debe mi robot crear new to do
            const newTodo = {
                id: crypto.randomUUID(),
                title: title,
                completed: false
            }

            //2. Juntar en array los nuevos new to dos
            const temp = [...todos]; 
            temp.unshift(newTodo); //Unshift: agrega al principio del array

            setTodos(temp);
            setTitle("");
        }// fin funcion

        // funcion de actualizacion despues de edit
        function handleUpdate(id, value){
            const temp = [...todos];
            const item = temp.find((item) => item.id === id);
            item.title = value;
            setTodos([...temp]);
        }

        // funcion borrar
        function handleDelete(id){
            const tempTodos = todos.filter((item) => item.id !== id);
            setTodos([...tempTodos]);
        }

    return (
        <div className="todoContainer">
            <form className="todoCreateForm" onSubmit={handleSubmit}>
                <input 
                    className="todoInput"
                    onChange={handleChange}  
                    value={title} 
                />
                <input 
                    className="buttonCreate"
                    onClick={handleSubmit}
                    type="submit" 
                    value="Create todo" 
                />
            </form>

            {/* MOSTRAR EN PANTALLA to-dos */}
            <div className='todosContainer'>
                {
                    todos.map(item => ( //map: crea nuevo array con los resultados de la nueva funcion que pongas para que cambie el resultado original
                        <Todo key={item.id} item={item} onUpdate={handleUpdate} onDelete={handleDelete}/> //COMPONENTE de todo.js
                    ))}
            </div>
        </div>
    );
}


/* funcion de 1 linea: 
        const [title, setTitle] = useState("Hola");
        onClick={(e) => setTitle('Pau')}
*/
