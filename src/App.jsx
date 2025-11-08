import React, { useState } from "react";
import './App.css'

const App = () => {
  const [todo, setTodo] = useState("");
  const [todoList, setTodoList] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editingText, setEditingText] = useState("");

  const addTask = () => {
    if (todo.trim() === "") return;
    setTodoList([
      ...todoList,
      { id: Date.now(), text: todo, completed: false },
    ]);
    setTodo("");
  };

  const invertStatus = (id) => {
    setTodoList(
      todoList.map((item) =>
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
  };

  const deleteItem = (id) => {
    setTodoList(todoList.filter((item) => item.id !== id));
  };

  const startEdit = (id) => {
    const task = todoList.find((item) => item.id === id);
    if (task) {
      setEditingId(id);
      setEditingText(task.text);
    }
  };

  const saveTask = () => {
    if (editingText.trim() === "") return;
    setTodoList(
      todoList.map((item) =>
        item.id === editingId ? { ...item, text: editingText } : item
      )
    );
    setEditingId(null);
    setEditingText("");
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditingText("");
  };

  // Extracted styles to avoid inline object creation
  const getTaskStyle = (completed) => ({
    cursor: "pointer",
    textDecoration: completed ? "line-through" : "none",
    color: completed ? "grey" : "black",
  });

  return (
    <div className="app-container">
      <h1 className="main-heading1">Welcome to EK's Daily-Do App</h1>
      <h2 className="main-heading2">Plan it. Do it. Done.</h2>
      <div className="todo-body">
        <h1>Make today's count.</h1>
        <div className="input">
          <input
            type="text"
            value={todo}
            placeholder="Add any task"
            onChange={(e) => setTodo(e.target.value)}
          />
          <button className="add-button" onClick={addTask}>
            Add
          </button>
        </div>

        <ul className="todo-items">
          {todoList.map((task) => {
            const isEditing = editingId === task.id;

            return (
              <li
                key={task.id}
                style={isEditing ? {} : getTaskStyle(task.completed)}
                onClick={isEditing ? undefined : () => invertStatus(task.id)}
              >
                {isEditing ? (
                  <div className="edit-input">
                    <input
                      type="text"
                      value={editingText}
                      onChange={(e) => setEditingText(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") saveTask();
                        if (e.key === "Escape") cancelEdit();
                      }}
                      autoFocus
                    />
                    <button
                      className="save-button"
                      onClick={(e) => {
                        e.stopPropagation();
                        saveTask();
                      }}
                    >
                      Save
                    </button>
                    <button
                      className="cancel-button"
                      onClick={(e) => {
                        e.stopPropagation();
                        cancelEdit();
                      }}
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <>
                    <span>{task.text}</span>
                    <button
                      className="edit-button"
                      onClick={(e) => {
                        e.stopPropagation();
                        startEdit(task.id);
                      }}
                    >
                      Edit
                    </button>
                    <button
                      className="delete-button"
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteItem(task.id);
                      }}
                    >
                      Delete
                    </button>
                  </>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default App;
