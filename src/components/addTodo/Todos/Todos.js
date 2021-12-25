import React, { useState } from "react";
import "./todos.css";

const Todos = (props) => {
  const [editedTodo, setEditedTodo] = useState(props.task);

  const renderEdit = () => {
    if (!props.edit === undefined) return;
    if (props.edit === props.id) {
      return (
        <form>
          <div className="edit-todo">
            <input
              type="text"
              className="input"
              onChange={(e) => setEditedTodo(e.target.value)}
              value={editedTodo}
            ></input>
            <input
              type="submit"
              className="btn"
              value="Save"
              onClick={(e) => {
                props.save(e, editedTodo);
              }}
            ></input>
          </div>
        </form>
      );
    }
  };

  return (
    <div>
      <form className="form-todos" id={props.id}>
        <div className="input_div">
          <input
            readOnly
            type="text"
            className="input"
            value={props.task}
          ></input>
          <input
            type="submit"
            className="btn"
            value="Edit"
            onClick={(e) => {
              props.editfun(e, props.id);
            }}
          ></input>
          <input
            type="submit"
            className="btn"
            value="Delete"
            onClick={(e, id) => props.delete(e, props.id)}
          ></input>
        </div>
      </form>
      {renderEdit()}
    </div>
  );
};

export default Todos;
