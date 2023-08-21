import React, {
    ChangeEvent,
    useState
} from "react";
import {FilterTaskPropsType} from "./App";

export type tasksPropsType = {
    id: string,
    title: string,
    isCheck: boolean,
}

type toDoListPropsType = {
    title: string,
    tasks: Array<tasksPropsType>,
    delTask: (id: string) => void,
    filterTasks: (value: FilterTaskPropsType) => void,
    addTask: (newTaskTitle: string) => void,
}

export function ToDoList(props: toDoListPropsType) {
    const [newTaskTitle, setNewTaskTitle] = useState("")

    const onNewTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => setNewTaskTitle(e.currentTarget.value);
    const addTask = () => {
        props.addTask(newTaskTitle)
        setNewTaskTitle(" ");
    }

    const onAllClickHandler = () => props.filterTasks("All")
    const onActiveClickHandler = () => props.filterTasks("Active")
    const onCompletedClickHandler = () => props.filterTasks("Completed")

    return <div>
        <h3>{props.title}</h3>
        <div>
            <input value={newTaskTitle} onChange={onNewTitleChangeHandler}/>
            <button onClick={addTask}>+</button>
        </div>
        <ul>
            {
                props.tasks.map((t: tasksPropsType) => {

                    const delTask = () => props.delTask(t.id);

                    return <li>
                        <input type="checkbox" checked={t.isCheck}/>
                        <span>{t.title}</span>
                        <button onClick={delTask}>X</button>
                    </li>
                })
            }


        </ul>
        <div>
            <button onClick={onAllClickHandler}> All</button>
            <button onClick={onActiveClickHandler}>Active</button>
            <button onClick={onCompletedClickHandler}>Completed</button>
        </div>
    </div>
}