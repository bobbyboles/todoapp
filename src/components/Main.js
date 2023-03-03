import React, { useEffect, useState } from "react";
import axios from "axios";

const Main = () => {
    const [todos, setTodos] = useState([]);
    const [todoDiscription, setTodoDiscription] = useState("");

    useEffect(() => {
        async function fetchTodos() {
            const { data } = await axios.get("/api/todo");

            setTodos(data);
        }
        fetchTodos();
    }, []);

    async function handleSubmit(e) {
        e.preventDefault();
        console.log(todoDiscription);
        const { data } = await axios.post(`api/todo`, {
            name: todoDiscription,
        });
        setTodos([...todos, data]);
        console.log(data);
    }
    

    return (
        <div>
            <div>This is your todos for today</div>
            {todos.length
                ? todos.map((todo) => {
                      return (
                          <div key={todo.id}>
                              <div>{todo.name}</div>
                          </div>
                      );
                  })
                : "Loading"}
            <div>Would you like to add more?</div>
            <form className="form" id="add_todo" onSubmit={handleSubmit}>
                <label htmlFor="todoDiscription">Todo Description: </label>
                <input
                    name="todoDiscription"
                    value={todoDiscription ? todoDiscription : ""}
                    onChange={(e) => setTodoDiscription(e.target.value)}
                ></input>
            </form>
            <button type="submit">Submit</button>
        </div>
    );
};

export default Main;
