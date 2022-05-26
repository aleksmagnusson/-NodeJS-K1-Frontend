import { useState, useEffect } from "react";
import "./App.css";

import axios from "axios";

function App() {
  const [todos, setTodos] = useState([]);
  const [task, setTask] = useState([]);
  //  const [editTodo, seteditTodo] = useState([]);

  /*  editTodo = JSON.parse(chunk);
  const todosIndex = todos.todos.findIndex((todo) => todo.id === todoId);
  todos.todos[todosIndex] = editTodo;
*/

  // get all todos.
  /*async*/ function getTodos() {
    /*await*/ axios
      .get("http://localhost:5000/todos")

      .then((res) => {
        setTodos(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  // Add a todo / "POST"
  const addTodo = () => {
    const newTodo = {
      id: Math.floor(Math.random() * 10000),
      task: task,
      done: false,
    };
    const options = {
      method: "POST",
      url: "http://localhost:5000/todos",
      headers: { "Content-Type": "application/json" },
      data: newTodo,
    };

    axios
      .request(options)
      .then(function (response) {
        console.log(response.data);
        getTodos();
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  // Remove a todo / "DELETE"
  const deleteTodo = (id) => {
    const url = `http://localhost:5000/todos/${id}`;
    axios
      .delete(url)
      .then(function (response) {
        console.log(response);
        getTodos();
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  // Check if a todo is "true" or "false" / "PUT"

  /*async*/ function editTodo(todo) {
    /*await*/ axios
      .put(`http://localhost:5000/todos/${todo.id}`, {
        id: todo.id,
        task: todo.task,
        done: !todo.done,
      })

      .then(function (res) {
        console.log(res);
        getTodos();
      })
      .catch(function (err) {
        console.log(err);
      });
  }

  // Hämta och ändra värde hos det angivna task eller ${id}
  // I kombination av GET & DELETE.

  useEffect(() => {
    getTodos();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <main className="App-body">
          <div>
            <p> Write a task to do. </p>
            <input
              name="task"
              placeholder="Add a new task:"
              onChange={(event) => setTask(event.target.value)}
            ></input>
            <button className="addTask" type="button" onClick={addTodo}>
              Add task
            </button>
          </div>{" "}
          {todos.map((todo) => (
            <div key={todo.id}>
              <p>{todo.task}</p>{" "}
              <button
                className="delete"
                type="button"
                onClick={() => {
                  deleteTodo(todo.id);
                }}
              >
                Delete{" "}
              </button>
              <button
                className="doneButton"
                type="button"
                onClick={() => {
                  editTodo(todo);
                }}
              >
                {" "}
                Done{" "}
              </button>
            </div>
          ))}
        </main>
      </header>
    </div>
  );
}

export default App;
