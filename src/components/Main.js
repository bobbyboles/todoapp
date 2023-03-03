import React, { useEffect, useState } from "react";
import axios from "axios";

const Main = () => {
    const [todos, setTodos] = useState([]);
    const [todoDescription, setTodoDescription] = useState("");
    const [joke, setJoke] = useState('')

    useEffect(() => {
        async function fetchTodos() {
            const { data } = await axios.get("/api/todo");
            const {data:{value}} = await axios.get('https://api.chucknorris.io/jokes/random')
            setTodos(data);
            setJoke(value)
        }
        fetchTodos();
    }, []);

    async function handleSubmit(e) {
        e.preventDefault();
        if (todoDescription.length) {
            const { data } = await axios.post(`api/todo`, {
                name: todoDescription,
            });
            setTodos([...todos, data]);
            setTodoDescription("");
        } else {
            window.alert("Can't set todo with empty field");
        }
    }

    async function handleDelete(todoId) {
        const { data } = await axios.delete(`/api/todo/${todoId}`);
        setTodos(todos.filter((todo) => todo.id !== data.id));
    }

    return (
        <div>
            <div>This is your todos for today, and here's a joke: <br/>{joke}</div>
            {todos.length
                ? todos.map((todo) => {
                      return (
                          <div key={todo.id}>
                              <div>{todo.name}</div>
                              <button onClick={() => handleDelete(todo.id)}>
                                  Delete
                              </button>
                          </div>
                      );
                  })
                : "There are no Todos!"}
            <div>Would you like to add more?</div>
            <form className="form" id="add_todo" onSubmit={handleSubmit}>
                <label htmlFor="todoDiscription">Todo Description: </label>
                <input
                    name="todoDiscription"
                    value={todoDescription ? todoDescription : ""}
                    onChange={(e) => setTodoDescription(e.target.value)}
                ></input>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default Main;
