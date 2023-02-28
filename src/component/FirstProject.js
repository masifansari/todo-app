import { useState } from "react";
import Header from "./Header";
import data from './data.json'
import ToDoList from "./ToDoList";

function FirstProject() {
    const [toDoList, setToDoList] = useState(data)
    
    const handleToggle=(id)=>{
        let mapped=toDoList.map(task=>{
            return task.id==id ? {...task,complete:!task.complete}:{...task};
        })
        setToDoList(mapped)
    }
    return (
        <div>
            <Header/>
            <ToDoList toDoList={toDoList}/>
        </div>
    );
}

export default FirstProject;
