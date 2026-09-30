import React, { useState, useEffect, useMemo, createContext, useContext } from "react";

/* =====================================================
   LOCAL STORAGE HOOK
===================================================== */

function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const stored = window.localStorage.getItem(key);

      return stored !== null
        ? JSON.parse(stored)
        : initialValue;
    } catch (error) {
      console.error(
        `useLocalStorage: failed to read "${key}"`,
        error
      );

      return initialValue;
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(
        key,
        JSON.stringify(value)
      );
    } catch (error) {
      console.error(
        `useLocalStorage: failed to write "${key}"`,
        error
      );
    }
  }, [key, value]);

  return [value, setValue];
}


/* =====================================================
   THEME CONTEXT
===================================================== */

const ThemeContext = createContext(null);

function ThemeProvider({ children }) {

  const [theme, setTheme] = useLocalStorage(
    "todo-theme",
    "light"
  );

  useEffect(() => {
    document.documentElement.setAttribute(
      "data-theme",
      theme
    );
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) =>
      prev === "light" ? "dark" : "light"
    );
  };

  return (
    <ThemeContext.Provider
      value={{
        theme,
        toggleTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}


function useTheme() {
  const ctx = useContext(ThemeContext);

  if (!ctx) {
    throw new Error(
      "useTheme must be used within a ThemeProvider"
    );
  }

  return ctx;
}


/* =====================================================
   THEME TOGGLE
===================================================== */

function ThemeToggle() {

  const {
    theme,
    toggleTheme,
  } = useTheme();

  return (
    <button
      className="theme-toggle"
      onClick={toggleTheme}
    >
      {theme === "light" ? "🌙 Dark" : "☀️ Light"}
    </button>
  );
}


/* =====================================================
   TODO FORM
===================================================== */

function TodoForm({ onAdd }) {

  const [text, setText] = useState("");

  const handleSubmit = (e) => {

    e.preventDefault();

    const trimmed = text.trim();

    if (trimmed === "") return;

    onAdd(trimmed);

    setText("");
  };

  return (
    <form
      className="todo-form"
      onSubmit={handleSubmit}
    >

      <input
        type="text"
        placeholder="Add a new task..."
        value={text}
        onChange={(e) =>
          setText(e.target.value)
        }
      />

      <button
        type="submit"
        className="btn primary"
      >
        Add
      </button>

    </form>
  );
}


/* =====================================================
   FILTER TABS
===================================================== */

function FilterTabs({
  current,
  onChange,
  counts,
}) {

  const filters = [
    "All",
    "Active",
    "Completed",
  ];

  return (
    <div className="filter-tabs">

      {filters.map((filter) => (

        <button
          key={filter}
          className={`filter-tab ${
            current === filter
              ? "active"
              : ""
          }`}
          onClick={() =>
            onChange(filter)
          }
        >

          {filter}

          <span className="count">
            {counts[filter]}
          </span>

        </button>

      ))}

    </div>
  );
}


/* =====================================================
   TODO ITEM
===================================================== */

function TodoItem({
  todo,
  onToggle,
  onDelete,
  onEdit,
  onDragStart,
  onDragOver,
  onDrop,
  isDragging,
}) {

  const [editing, setEditing] =
    useState(false);

  const [draft, setDraft] =
    useState(todo.text);


  const saveEdit = () => {

    const trimmed = draft.trim();

    if (trimmed === "") {

      onDelete(todo.id);

    } else {

      onEdit(
        todo.id,
        trimmed
      );

    }

    setEditing(false);
  };


  const handleKeyDown = (e) => {

    if (e.key === "Enter") {
      saveEdit();
    }

    if (e.key === "Escape") {

      setDraft(todo.text);

      setEditing(false);
    }
  };


  return (
    <li
      className={`todo-item ${
        todo.completed
          ? "completed"
          : ""
      } ${
        isDragging
          ? "dragging"
          : ""
      }`}

      draggable

      onDragStart={(e) =>
        onDragStart(
          e,
          todo.id
        )
      }

      onDragOver={(e) =>
        onDragOver(
          e,
          todo.id
        )
      }

      onDrop={(e) =>
        onDrop(
          e,
          todo.id
        )
      }
    >

      <span
        className="drag-handle"
        title="Drag to reorder"
      >
        ⠿
      </span>


      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() =>
          onToggle(todo.id)
        }
      />


      {editing ? (

        <input
          type="text"
          className="edit-input"
          value={draft}
          autoFocus

          onChange={(e) =>
            setDraft(e.target.value)
          }

          onBlur={saveEdit}

          onKeyDown={handleKeyDown}
        />

      ) : (

        <span
          className="todo-text"
          onDoubleClick={() =>
            setEditing(true)
          }
        >
          {todo.text}
        </span>

      )}


      <div className="todo-actions">

        <button
          className="icon-btn"
          onClick={() =>
            setEditing(true)
          }
          title="Edit"
        >
          ✎
        </button>


        <button
          className="icon-btn danger"
          onClick={() =>
            onDelete(todo.id)
          }
          title="Delete"
        >
          ✕
        </button>

      </div>

    </li>
  );
}


/* =====================================================
   TODO LIST
===================================================== */

function TodoList({
  todos,
  onToggle,
  onDelete,
  onEdit,
  onReorder,
}) {

  const [draggedId, setDraggedId] =
    useState(null);


  const handleDragStart = (
    e,
    id
  ) => {

    setDraggedId(id);

    e.dataTransfer.effectAllowed =
      "move";
  };


  const handleDragOver = (
    e,
    overId
  ) => {

    e.preventDefault();

    if (
      draggedId === null ||
      draggedId === overId
    ) {
      return;
    }

    onReorder(
      draggedId,
      overId
    );
  };


  const handleDrop = (
    e,
    id
  ) => {

    e.preventDefault();

    setDraggedId(null);
  };


  if (todos.length === 0) {

    return (
      <p className="empty-state">
        No tasks here. Add one above!
      </p>
    );
  }


  return (
    <ul className="todo-list">

      {todos.map((todo) => (

        <TodoItem

          key={todo.id}

          todo={todo}

          onToggle={onToggle}

          onDelete={onDelete}

          onEdit={onEdit}

          onDragStart={handleDragStart}

          onDragOver={handleDragOver}

          onDrop={handleDrop}

          isDragging={
            draggedId === todo.id
          }

        />

      ))}

    </ul>
  );
}


/* =====================================================
   MAIN TODO APP CONTENT
===================================================== */

function AppContent() {

  const [todos, setTodos] =
    useLocalStorage(
      "todos",
      []
    );

  const [filter, setFilter] =
    useState("All");


  /* ADD TODO */

  const addTodo = (text) => {

    const newTodo = {
      id: Date.now().toString(),
      text: text,
      completed: false,
    };

    setTodos((prev) => [
      newTodo,
      ...prev,
    ]);
  };


  /* TOGGLE TODO */

  const toggleTodo = (id) => {

    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id
          ? {
              ...todo,
              completed:
                !todo.completed,
            }
          : todo
      )
    );
  };


  /* EDIT TODO */

  const editTodo = (
    id,
    newText
  ) => {

    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id
          ? {
              ...todo,
              text: newText,
            }
          : todo
      )
    );
  };


  /* DELETE TODO */

  const deleteTodo = (id) => {

    setTodos((prev) =>
      prev.filter(
        (todo) =>
          todo.id !== id
      )
    );
  };


  /* REORDER TODO */

  const reorderTodos = (
    draggedId,
    overId
  ) => {

    setTodos((prev) => {

      const dragIndex =
        prev.findIndex(
          (todo) =>
            todo.id === draggedId
        );

      const overIndex =
        prev.findIndex(
          (todo) =>
            todo.id === overId
        );


      if (
        dragIndex === -1 ||
        overIndex === -1
      ) {
        return prev;
      }


      const updated = [
        ...prev,
      ];

      const [dragged] =
        updated.splice(
          dragIndex,
          1
        );

      updated.splice(
        overIndex,
        0,
        dragged
      );

      return updated;
    });
  };


  /* FILTER TODOS */

  const filteredTodos =
    useMemo(() => {

      if (filter === "Active") {

        return todos.filter(
          (todo) =>
            !todo.completed
        );
      }


      if (
        filter === "Completed"
      ) {

        return todos.filter(
          (todo) =>
            todo.completed
        );
      }


      return todos;

    }, [todos, filter]);


  /* COUNTS */

  const counts = useMemo(
    () => ({
      All: todos.length,

      Active:
        todos.filter(
          (todo) =>
            !todo.completed
        ).length,

      Completed:
        todos.filter(
          (todo) =>
            todo.completed
        ).length,
    }),

    [todos]
  );


  return (
    <div className="app">

      <div className="todo-card">

        <header className="todo-header">

          <h1>
            My Tasks
          </h1>

          <ThemeToggle />

        </header>


        <TodoForm
          onAdd={addTodo}
        />


        <FilterTabs
          current={filter}
          onChange={setFilter}
          counts={counts}
        />


        <TodoList
          todos={filteredTodos}
          onToggle={toggleTodo}
          onDelete={deleteTodo}
          onEdit={editTodo}
          onReorder={reorderTodos}
        />


        <p className="hint">
          Drag ⠿ to reorder ·
          Double-click a task to
          edit it
        </p>

      </div>

    </div>
  );
}


/* =====================================================
   APP
===================================================== */

export default function App() {

  return (
    <ThemeProvider>

      <AppContent />

    </ThemeProvider>
  );
}
