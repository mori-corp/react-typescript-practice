import { useState, useEffect } from "react";
import { uid } from "uid";
import { TodoRows } from "./components/TodoRows";
import { TodoType } from "./types/todo";

function App() {
  // todoは文字列として受け取るので、string型を指定
  const [todo, setTodo] = useState<string>("");

  // todosは配列型なので、Array型を宣言し、外部ファイル（src/types/todo.ts）で記載したTodoTypeを指定
  const [todos, setTodos] = useState<Array<TodoType>>(() => {

    //ローカルストレージに保存されているtodoを読み込み、todos配列に格納
    const savedTodos = localStorage.getItem("todos");
    if (savedTodos) {
      return JSON.parse(savedTodos);
    } else {
      return [];
    }
  });

  const [isCompleted, setIsCompleted] = useState(false);

  // ローカルストレージへの保存
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  // タスクの追加
  const handleAddTodo = () => {
    const uuid = uid();
    if (todo !== "") {
      setTodos([
        ...todos,
        {
          id: uuid,
          text: todo,
          isCompleted,
        },
      ]);
    }
    setTodo("");
  };

  // deleteボタンをクリックした時の関数
  // 引数todoの型は、上記で宣言したTodoTypeを指定
  const handleDelete = (todo: TodoType) => {
    const removeItem = todos.filter((t) => {
      return t.id !== todo.id;
    });
    setTodos(removeItem);
  };

  // ステータス更新ボタンの関数
  // 引数todoの型は、上記で宣言したTodoTypeを指定
  const handleStatusChange = (todo: TodoType) => {
    setIsCompleted(!isCompleted);
    todo.isCompleted = !todo.isCompleted;
  };

  return (
    <div className="App">
      <div style={{ margin: "10px" }}>
        <input
          type="text"
          placeholder="todo"
          value={todo}
          onChange={(e) => {
            setTodo(e.target.value);
          }}
        />
        <button onClick={handleAddTodo}>追加</button>
      </div>
      <ul>
        {todos.map((todo) => (
          <TodoRows
            todo={todo}
            onHandleDelete={handleDelete}
            onHandleStatusChange={handleStatusChange}
          />
        ))}
      </ul>
    </div>
  );
}

export default App;
