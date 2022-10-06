import { TodoType } from "../types/todo";

// propsで受け取るtodoと、各関数の型を指定
type Props = {
  todo: TodoType;
  onHandleDeleteButtonClick: (todo: TodoType) => void;
  onHandleStatusButtonClick: (todo: TodoType) => void;
  onHandleEditButtonClick: (todo: TodoType) => void;
};

export const TodoRows: React.FC<Props> = ({
  todo,
  onHandleDeleteButtonClick,
  onHandleStatusButtonClick,
  onHandleEditButtonClick,
}) => {
  return (
    <li key={todo.id} style={{ marginBottom: "10px" }}>
      <div>
        {/* ステータス変更ボタン */}
        <button
          onClick={() => onHandleStatusButtonClick(todo)}
          style={{
            display: "inline",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            backgroundColor: "blue",
            color: "white",
            marginRight: "5px",
          }}
        >
          {todo.isCompleted ? "完" : "未"}
        </button>
        <span style={{ display: "inline", marginRight: "10px" }}>
          {todo.text}
        </span>
        {/* 編集ボタン */}
        <button
          onClick={() => {
            onHandleEditButtonClick(todo);
          }}
          style={{ display: "inline" }}
        >
          Edit
        </button>

        {/* 削除ボタン */}
        <button
          onClick={() => {
            onHandleDeleteButtonClick(todo);
          }}
          style={{ display: "inline" }}
        >
          X
        </button>
      </div>
    </li>
  );
};
