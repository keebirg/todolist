import React, {useState} from 'react';
import './App.css';
import {
    tasksPropsType,
    ToDoList
} from "./ToDoList";


export type FilterTaskPropsType = "All" | "Active" | "Completed";

function App() {

    const [tasks, setTasks] = useState<Array<tasksPropsType>>([
        {id: 1, title: "js", isCheck: true},
        {id: 2, title: "HTML/CSS", isCheck: true},
        {id: 3, title: "REACT", isCheck: false},
    ])

    const [filter, setFilter] = useState<FilterTaskPropsType>("All")

    const delTask = (id: number) => {
        setTasks(tasks.filter(item => id != item.id))
    }

    const filterTasks = (value: FilterTaskPropsType) => {
        setFilter(value);
    }

    let valueFilterTasks;
    switch (filter) {
        case "All":
            valueFilterTasks = tasks;
            break;
        case "Active":
            valueFilterTasks = tasks.filter(item => item.isCheck === false);
            break;
        case "Completed":
            valueFilterTasks = tasks.filter(item => item.isCheck === true);
            break;
    }


    return (
        <div className="App">
            <ToDoList
                title={"Job"}
                tasks={valueFilterTasks}
                delTask={delTask}
                filterTasks={filterTasks}/>
        </div>
    );
}

export default App;
