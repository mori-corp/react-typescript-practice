import { TodoType } from "../types/todo";

// propsで受け取るtodoと、各関数の型を指定
type Props = {
  todo: TodoType;
  onHandleDelete: (todo: TodoType) => void;
  onHandleStatusChange: (todo: TodoType) => void;
};

export const TodoRows: React.FC<Props> = ({
  todo,
  onHandleDelete,
  onHandleStatusChange,
}) => {
  return (
    <li key={todo.id}>
      <div>
        <span style={{ display: "inline", marginRight: "10px" }}>
          {todo.text}
        </span>

        {/* 削除ボタン */}
        <button
          onClick={() => {
            onHandleDelete(todo);
          }}
          style={{ display: "inline" }}
        >
          Delete
        </button>

        {/* ステータス変更ボタン */}
        <button
          onClick={() => onHandleStatusChange(todo)}
          style={{ display: "inline" }}
        >
          {todo.isCompleted ? "完" : "未"}
        </button>
      </div>
    </li>
  );
};
