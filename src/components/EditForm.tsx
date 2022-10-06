import React from "react";
import { CurrentTodo } from "../types/currentTodo";

type Props = {
  currentTodo: CurrentTodo;
  onSetCurrentTodo: (currentTodo: CurrentTodo) => void;
  onHandleUpdateButtonClick: () => void;
  onSetIsEdit: (e: boolean) => void;
  onSetTodo: (e: string) => void;
};

const EditForm: React.FC<Props> = ({
  currentTodo,
  onSetCurrentTodo,
  onHandleUpdateButtonClick,
  onSetIsEdit,
  onSetTodo,
}) => {
  return (
    <>
      {/* edtiモード時のinputフィールド */}
      <input
        type="text"
        placeholder="todo"
        value={currentTodo.text}
        onChange={(e) =>
          onSetCurrentTodo({ ...currentTodo, text: e.target.value })
        }
      />

      {/* 更新ボタン */}
      <button onClick={onHandleUpdateButtonClick}>Update</button>

      {/* xボタン */}
      <button
        onClick={() => {
          onSetIsEdit(false);
          onSetTodo("");
        }}
      >
        X
      </button>
    </>
  );
};

export default EditForm;
