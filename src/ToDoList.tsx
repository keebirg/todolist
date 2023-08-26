import React, {
    ChangeEvent,
    useState
} from "react";
import {FilterTaskPropsType} from "./App";
import styled from "styled-components";



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
    updateCheckbox: (id: string, onCheck: boolean) => void,
    filter: FilterTaskPropsType,
}

export function ToDoList(props: toDoListPropsType) {
    const [newTaskTitle, setNewTaskTitle] = useState("")
    const [error, setError] = useState('')

    const onNewTitleChangeHandler = (event: ChangeEvent<HTMLInputElement>) => setNewTaskTitle(event.currentTarget.value);
    const onKeyPressHandler = () => setError('');

    const addTask = () => {
        if (!newTaskTitle.trim()) {
            setError("Title is required");
            return;
        }
        props.addTask(newTaskTitle.trim())
        setNewTaskTitle(" ");
    }


    const onAllClickHandler = () => props.filterTasks("All")
    const onActiveClickHandler = () => props.filterTasks("Active")
    const onCompletedClickHandler = () => props.filterTasks("Completed")

    return <div>
        <h3>{props.title}</h3>
        <div>
            <InputTextStyled
                error={error ? "red" : "black"}
                value={newTaskTitle}
                onChange={onNewTitleChangeHandler}
                onKeyPress={onKeyPressHandler}/>
            <button onClick={addTask}>+</button>
            {error ? <ErrorTextStyled>{error}</ErrorTextStyled> : ""}
        </div>
        <ul>
            {
                props.tasks.map((t: tasksPropsType) => {

                    const delTask = () => props.delTask(t.id);
                    const onChangeInputHandler = (event: ChangeEvent<HTMLInputElement>) => {
                        props.updateCheckbox(t.id, event.currentTarget.checked)
                    }

                    return <ItemStyled checked={t.isCheck}>
                        <input type="checkbox" checked={t.isCheck} onChange={onChangeInputHandler}/>
                        <span>{t.title}</span>
                        <button onClick={delTask}>X</button>
                    </ItemStyled>
                })
            }


        </ul>
        <div>
            <ButtonStyled isFilter={props.filter === 'All'}
                          onClick={onAllClickHandler}> All</ButtonStyled>
            <ButtonStyled isFilter={props.filter === 'Active' }
                          onClick={onActiveClickHandler}>Active</ButtonStyled>
            <ButtonStyled isFilter={props.filter === 'Completed'}
                          onClick={onCompletedClickHandler}>Completed</ButtonStyled>
        </div>
    </div>
}

type InputTextStyledPropsType = {
    error: string;
}
type ButtonStyledPropsType = {
    isFilter?: boolean;
}

type ItemStyledPropsType={
    checked:boolean,
}

const InputTextStyled = styled.input<InputTextStyledPropsType>`

  border-color: ${props => props.error};
`

const ErrorTextStyled = styled.div`
  color: red;
`

const ButtonStyled = styled.button<ButtonStyledPropsType>`
  background-color: ${props => props.isFilter? "aquamarine": "none"}
`

const ItemStyled=styled.li<ItemStyledPropsType>`
    opacity: ${props=> props.checked? 0.5:1 };
`
