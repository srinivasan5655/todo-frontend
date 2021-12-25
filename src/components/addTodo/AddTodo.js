import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

import Appbar from "../Appbar";
import Todos from "../addTodo/Todos/Todos";
import "./addTodo.css";

const List = (props) => {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");
  const [editId, setEditId] = useState("");

  const errorHandler = (err) => {
    if (err.request.responseText !== "") {
      const message = JSON.parse(err.request.responseText)?.message;
      return Swal.fire({ icon: "error", title: "Oops...", text: message });
    } else {
      return Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please Try again",
      });
    }
  };

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await axios({
          method: "GET",
          url: "https://todo-list-app5.herokuapp.com/task",
          headers: {
            authorization: `bearer ${localStorage.getItem("token")}`,
          },
        });
        console.log(res.data.task);
        setTodos(res.data.task);
      } catch (err) {
        errorHandler(err);
      }
    };
    fetch();
  }, []);

  const addTodo = async (e) => {
    try {
      e.preventDefault();
      console.log(localStorage.getItem("token"));
      const res = await axios({
        method: "post",
        url: "https://todo-list-app5.herokuapp.com/addtask",
        data: {
          task: input,
        },
        headers: {
          authorization: `bearer ${localStorage.getItem("token")}`,
        },
      });
      console.log(res.data.task);
      setTodos([...todos, res.data.task]);
      setInput("");
    } catch (err) {
      errorHandler(err);
    }
  };

  const deleteTodo = async (e, id) => {
    try {
      e.preventDefault();
      await axios({
        method: "delete",
        url: `https://todo-list-app5.herokuapp.com/task/${id}`,
        headers: {
          authorization: `bearer ${localStorage.getItem("token")}`,
        },
      });
      const updatedTodos = todos.filter((item) => {
        return item._id.toString() !== id.toString();
      });
      setTodos(updatedTodos);
    } catch (err) {
      errorHandler(err);
    }
  };

  const edit = (e, id) => {
    e.preventDefault();
    setEditId(id);
  };

  const saveChange = async (e, value) => {
    try {
      e.preventDefault();
      await axios({
        method: "put",
        url: `https://todo-list-app5.herokuapp.com/task/${editId}`,
        data: {
          task: value,
        },
        headers: {
          authorization: `bearer ${localStorage.getItem("token")}`,
        },
      });
      const updatedTodos = todos.map((item) => {
        if (item._id.toString() === editId.toString()) {
          item.value = value;
        }
        return item;
      });
      console.log(updatedTodos);
      setTodos(updatedTodos);
      setEditId(null);
    } catch (err) {
      errorHandler(err);
    }
  };

  return (
    <div>
      <Appbar logout={props.logout} />
      <form className="form-container">
        <div className="input_container">
          <input
            type="text"
            className="input-add"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          ></input>
          <input
            type="submit"
            className="btn-add"
            value="add"
            onClick={addTodo}
          ></input>
        </div>
      </form>

      <div
        style={{
          height: "65vh",
          overflow: "scroll",
          overflowX: "hidden",
        }}
      >
        {todos.map((item) => {
          return (
            <Todos
              id={item._id}
              task={item.value}
              delete={deleteTodo}
              key={item._id}
              editfun={edit}
              edit={editId}
              save={saveChange}
            />
          );
        })}
      </div>
    </div>
  );
};

export default List;
