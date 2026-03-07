import { useState, useEffect } from "react"
import "./App.css"

function App() {
  const [newItem, setNewItem] = useState("")
  const [todos, setTodos] = useState(() => {
    const localValue = localStorage.getItem("ITEMS")
    if (localValue == null) return []
    return JSON.parse(localValue)
  })

  useEffect(() => {
    localStorage.setItem("ITEMS", JSON.stringify(todos))
  }, [todos])

  function handleSubmit(e) {
    e.preventDefault()
    if (newItem === "") return

    setTodos(currentTodos => {
      return [
        ...currentTodos,
        { id: crypto.randomUUID(), title: newItem, completed: false },
      ]
    })

    setNewItem("")
  }

  function toggleTodo(id, completed) {
    setTodos(currentTodos => {
      return currentTodos.map(todo => {
        if (todo.id === id) {
          return { ...todo, completed }
        }
        return todo
      })
    })
  }

  function deleteTodo(id) {
    setTodos(currentTodos => {
      return currentTodos.filter(todo => todo.id !== id)
    })
  }

  return (
    <div className="container">
      <h2 className="header">My React To-Do List</h2>
      
      <form onSubmit={handleSubmit} className="new-item-form">
        <div className="form-row">
          <input
            value={newItem}
            onChange={e => setNewItem(e.target.value)}
            type="text"
            id="item"
            placeholder="O que precisa ser feito?"
          />
          <button className="btn">Add</button>
        </div>
      </form>

      <ul className="list">
        {todos.length === 0 && <li className="empty-msg">Nenhuma tarefa pendente!</li>}
        {todos.map(todo => {
          return (
            <li key={todo.id} className={todo.completed ? "done" : ""}>
              <label>
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={e => toggleTodo(todo.id, e.target.checked)}
                />
                <span className="todo-text">{todo.title}</span>
              </label>
              <button
                onClick={() => deleteTodo(todo.id)}
                className="btn btn-danger"
              >
                &times;
              </button>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default App