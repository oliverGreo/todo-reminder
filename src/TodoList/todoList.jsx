import { useEffect, useState } from 'react'
import Todo from '../Todo/todo'
import Todos from '../todos'
import './todoList.css'



const TodoList = () => {
    const [doneList, setDoneList] = useState([])
    const [notDoneList, setNotDoneList] = useState([...Todos])

    const today = new Date(Date.now()).toLocaleDateString('en-GB', { weekday: 'long' });

    useEffect(() => {
        const savedData = localStorage.getItem('todoList')
        if (savedData) {
            const { doneList: savedDoneList, notDoneList: savedNotDoneList, today: savedDay } = JSON.parse(savedData)
            if (savedDay !== today) {
                setDoneList([])
                setNotDoneList([...Todos])
            }
            if (savedDay === today) {
                setDoneList(savedDoneList || [])
                setNotDoneList(savedNotDoneList || [])
            }
        } else {
            setDoneList([])
            setNotDoneList([...Todos])
        }
    }, [])

    const handleTodoName = ({ todo, isCompleted }) => {
        if (isCompleted) {
            setDoneList(prevDoneList => {
                const updatedDoneList = [...prevDoneList, todo]
                return updatedDoneList
            })
            setNotDoneList(prevNotDoneList => {
                const updatedNotDoneList = prevNotDoneList.filter(entry => entry.text !== todo.text)
                return updatedNotDoneList
            })
        } else {
            setNotDoneList(prevNotDoneList => {
                const updatedNotDoneList = [...prevNotDoneList, todo]
                return updatedNotDoneList
            })
            setDoneList(prevDoneList => {
                const updatedDoneList = prevDoneList.filter(entry => entry.text !== todo.text)
                return updatedDoneList
            })
        }
    }

    const saveToLocalStorage = () => {
        const dataToSave = {
            doneList,
            notDoneList,
            today
        }
        localStorage.setItem('todoList', JSON.stringify(dataToSave))
    }

    const deleteFromLocalStorage = () => {
        localStorage.removeItem('todoList')
        setDoneList([])
        setNotDoneList([...Todos])
    }

    const allNotDueToday = notDoneList.every(entry => !entry.days?.includes(today) && entry.days?.length > 0)


    return (
        <div className="todoList">
            <h1>Todo List</h1>
            <h1>Score: {doneList.length}</h1>
            <h3>To be done:</h3>
            {notDoneList.map((entry, index) => (
                <Todo
                    todo={entry}
                    key={index}
                    passValue={(todo) => handleTodoName({ todo, isCompleted: true })}
                />
            ))}
            {allNotDueToday && <div>Good job! No tasks due today.</div>}
            <h3>Already done:</h3>
            {doneList.map((entry, index) => (
                <Todo
                    todo={entry}
                    key={index}
                    passValue={(todo) => handleTodoName({ todo, isCompleted: false })}
                />
            ))}
            {doneList.length === 0 && <div>Nothing finished so far</div>}
            <div className="buttonsContainer">
                <button onClick={deleteFromLocalStorage}>Delete Save</button>
                <button onClick={saveToLocalStorage}>Save List</button>
            </div>
        </div>
    )
}

export default TodoList

