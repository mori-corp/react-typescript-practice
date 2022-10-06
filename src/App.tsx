import { useState, useEffect } from "react";
import { uid } from "uid";
import { TodoRows } from "./components/TodoRows";
import { TodoType } from "./types/todo";
import { CurrentTodo } from "./types/currentTodo";
import AddTodoForm from "./components/AddTodoForm";
import EditForm from "./components/EditForm";

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

  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  const [currentTodo, setCurrentTodo] = useState<CurrentTodo>({
    id: "",
    text: "",
    isCompleted: false,
  });
  const [isEdit, setIsEdit] = useState(false);

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
  const handleDeleteButtonClick = (todo: TodoType) => {
    const removeItem = todos.filter((t) => {
      return t.id !== todo.id;
    });
    setTodos(removeItem);
  };

  // ステータス更新ボタンの関数
  // 引数todoの型は、上記で宣言したTodoTypeを指定
  const handleStatusButtonClick = (todo: TodoType) => {
    setIsCompleted(!isCompleted);
    todo.isCompleted = !todo.isCompleted;
  };

  // Editボタンクリック
  const handleEditButtonClick = (todo: TodoType) => {
    setIsEdit(true);
    setCurrentTodo({ ...todo });
  };

  // updateボタンのクリック
  const handleUpdateButtonClick = () => {
    // currentTodoに格納されているidを取得
    const id = currentTodo.id;

    const updatedItem = todos.map((todo) => {
      //idが一致するものは、currentTodoに更新し、そうでないものは、そのままupdatedItemへリターン
      return todo.id === id ? currentTodo : todo;
    });

    setIsEdit(false);
    setTodos(updatedItem);
  };

  return (
    <div className="App">
      <div style={{ margin: "10px" }}>
        {isEdit ? (
          <EditForm
            currentTodo={currentTodo}
            onSetCurrentTodo={setCurrentTodo}
            onHandleUpdateButtonClick={handleUpdateButtonClick}
            onSetIsEdit={setIsEdit}
            onSetTodo={setTodo}
          />
        ) : (
          <AddTodoForm
            todo={todo}
            onSetTodo={setTodo}
            onHandleAddTodo={handleAddTodo}
          />
        )}
      </div>
      <ul>
        {todos.map((todo) => (
          <TodoRows
            key={todo.id}
            todo={todo}
            onHandleDeleteButtonClick={handleDeleteButtonClick}
            onHandleStatusButtonClick={handleStatusButtonClick}
            onHandleEditButtonClick={handleEditButtonClick}
          />
        ))}
      </ul>
    </div>
  );
}

export default App;
