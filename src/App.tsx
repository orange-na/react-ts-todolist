import React, { useState } from "react";
import "./App.css";

function App() {
  const [inputs, setInputs] = useState("");
  const [items, setItems] = useState<Todo[]>([]);

  type Todo = {
    id: number;
    task: string;
    checked: boolean;
  };

  const handleChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputs(e.target.value);
    console.log(inputs);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newTodo: Todo = {
      id: items.length,
      task: inputs,
      checked: false,
    };

    setItems((prev) => [newTodo, ...prev]);
    console.log(items);
    setInputs("");
  };

  const handleEdit = (id: number, inputs: string) => {
    const newTodo = items.map((item) => {
      if (item.id === id) {
        item.task = inputs;
      }
      return item;
    });
    setItems(newTodo);
  };

  const handleChecked = (id: number, isChecked: boolean) => {
    const newTodo = items.map((item) => {
      if (item.id === id) {
        item.checked = !isChecked;
      }
      return item;
    });
    setItems(newTodo);
  };

  const handleDelete = (id: number) => {
    const newTodos = items.filter((item) => item.id !== id);
    setItems(newTodos);
  };

  return (
    <div className="App">
      <div>
        <h2>TodoList with Typescript</h2>
        <form onSubmit={(e) => handleSubmit(e)}>
          <input
            type="text"
            onChange={(e) => handleChanged(e)}
            className="inputText"
            value={inputs}
          />
          <input type="submit" value="Add" className="submitBtn" />
        </form>
        <ul>
          {items.map((item) => {
            return (
              <li key={item.id}>
                <input
                  type="text"
                  onChange={(e) => handleEdit(item.id, e.target.value)}
                  className="inputText"
                  value={item.task}
                  disabled={item.checked}
                />
                <input
                  type="checkbox"
                  onChange={() => handleChecked(item.id, item.checked)}
                  className="checkbox"
                />
                <button onClick={() => handleDelete(item.id)}>X</button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default App;
