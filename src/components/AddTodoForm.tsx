import React from "react";

// プロップスで受け取る要素の型指定
type Props = {
  todo: string;
  onSetTodo: (e: string) => void;
  onHandleAddTodo: () => void;
};

// ファンクショナルコンポーネントとして型を指定
const AddTodoForm: React.FC<Props> = ({ todo, onSetTodo, onHandleAddTodo }) => {
  return (
    <>
      {/* タスク追加のinputフィールド */}
      <input
        type="text"
        placeholder="todo"
        value={todo}
        onChange={(e) => onSetTodo(e.target.value)}
      />

      {/* 追加ボタン */}
      <button onClick={onHandleAddTodo}>Add</button>
    </>
  );
};

export default AddTodoForm;
