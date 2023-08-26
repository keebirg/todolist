import React, {useState} from 'react';
import './App.css';
import {
    tasksPropsType,
    ToDoList
} from "./ToDoList";
import {v1} from "uuid";


export type FilterTaskPropsType = "All" | "Active" | "Completed";

function App() {

    const [tasks, setTasks] = useState<Array<tasksPropsType>>([
        {id: v1(), title: "js", isCheck: true},
        {id: v1(), title: "HTML/CSS", isCheck: true},
        {id: v1(), title: "REACT", isCheck: false},
    ])


    const [filter, setFilter] = useState<FilterTaskPropsType>("All")

    const delTask = (id: string) => {
        setTasks(tasks.filter(item => id != item.id))
    }

    const filterTasks = (value: FilterTaskPropsType) => {
        setFilter(value);
    }

    const addTask = (newTaskTitle:string) => {
        let newTask = {id: v1(), title: newTaskTitle, isCheck: true};
        let newTasks=[newTask, ...tasks];
        setTasks(newTasks);
    }

    const updateCheckbox=(id:string, onCheck:boolean)=>{
        let task=tasks.find((t)=>t.id===id);
        if(task) task.isCheck=onCheck;
        setTasks([...tasks]);
    }

    let valueFilterTasks;
    switch (filter) {
        case "All":
            valueFilterTasks = tasks;
            break;
        case "Active":
            valueFilterTasks = tasks.filter(item => !item.isCheck);
            break;
        case "Completed":
            valueFilterTasks = tasks.filter(item => item.isCheck);
            break;
    }


    return (
        <div className="App">
            <ToDoList
                title={"Job"}
                tasks={valueFilterTasks}
                delTask={delTask}
                filterTasks={filterTasks}
                addTask={addTask}
                updateCheckbox={updateCheckbox}
                filter={filter}
            />
        </div>
    );
}

export default App;
