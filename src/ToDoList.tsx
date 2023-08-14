import React from "react";
import {FilterTaskPropsType} from "./App";

export type tasksPropsType = {
    id: number,
    title: string,
    isCheck: boolean,
}

type toDoListPropsType = {
    title: string,
    tasks: Array<tasksPropsType>,
    delTask: (id: number) => void,
    filterTasks: (value: FilterTaskPropsType) => void,
}

export function ToDoList(props: toDoListPropsType) {
    return <div>
        <h3>{props.title}</h3>
        <div>
            <input/>
            <button>+</button>
        </div>
        <ul>
            {
                props.tasks.map((t: tasksPropsType) => <li>
                    <input type="checkbox" checked={t.isCheck}/>
                    <span>{t.title}</span>
                    <button onClick={() => {
                        props.delTask(t.id)
                    }}>x
                    </button>
                </li>)
            }


        </ul>
        <div>
            <button onClick={() => {
                props.filterTasks("All")
            }}>All
            </button>
            <button onClick={() => {
                props.filterTasks("Active")
            }}>Active
            </button>
            <button onClick={() => {
                props.filterTasks("Completed")
            }}>Completed
            </button>
        </div>
    </div>
}