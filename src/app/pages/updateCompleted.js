"use client";
import {useAtom} from "jotai";
import {EventExports12, getTodoList, updateTodo} from "@/app/pages/actionTodo";


const UpdateCompletedr = ({event}) => {
    const [, setTodos] = useAtom(EventExports12);

    const handleUpdateTodo = () => {
        setTodos(updateTodo(event.id));
    };
  return (
      <>
          <p>{event.completed ? "Completed" : "not Completed" }</p>
          <button onClick={() => handleUpdateTodo()}>Update Todo</button>
      </>
  )
}

export default UpdateCompletedr;