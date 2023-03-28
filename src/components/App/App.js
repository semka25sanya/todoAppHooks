import { useState } from 'react'

import './App.css'
import AppHeader from '../AppHeader'
import TaskList from '../TaskList'
import Footer from '../Footer'

export default function App() {
    // let maxId = 1
    // console.log(maxId)

    const [todoData, setTodoData] = useState([])
    const [filter, setFilter] = useState('all')

    const editItem = (id) => {
        setTodoData((arr) => {
            const idx = arr.findIndex((el) => el.id === id)
            const oldItem = arr[idx]
            const newItem = { ...oldItem, edit: !oldItem.edit }

            return [...arr.slice(0, idx), newItem, ...arr.slice(idx + 1)]
        })
    }

    const changeTimer = (id, min, sec) => {
        setTodoData((arr) => {
            const idx = arr.findIndex((el) => el.id === id)

            const oldItem = arr[idx]

            if (typeof oldItem === 'undefined') return
            const newItem = { ...oldItem, min, sec }

            // eslint-disable-next-line consistent-return
            return [...arr.slice(0, idx), newItem, ...arr.slice(idx + 1)]
        })
    }

    const editTodoSubmit = (event, id) => {
        event.preventDefault()
        setTodoData((arr) => {
            const index = arr.findIndex((data) => data.id === id)
            const oldData = arr[index]
            const newData = {
                ...oldData,
                edit: !oldData.edit,
                description: event.target.querySelector('input').value,
            }
            return [...arr.slice(0, index), newData, ...arr.slice(index + 1)]
        })
    }

    const onFilterChange = (val) => {
        setFilter(val)
    }

    const onToggleCompleted = (id) => {
        setTodoData((arr) => {
            const idx = arr.findIndex((el) => el.id === id)

            const oldItem = arr[idx]
            const newItem = { ...oldItem, completed: !oldItem.completed }

            return [...arr.slice(0, idx), newItem, ...arr.slice(idx + 1)]
        })
    }

    const deleteItem = (id) => {
        setTodoData((arr) => {
            const idx = arr.findIndex((el) => el.id === id)

            return [...arr.slice(0, idx), ...arr.slice(idx + 1)]
        })
    }

    const idx = `id ${new Date().getTime()}`

    const createItem = (text, min, sec) => ({
        description: text,
        completed: false,
        id: idx,
        edit: false,
        data: new Date(),
        min,
        sec,
    })

    const addItem = (text, min, sec) => {
        const newItem = createItem(text, min, sec)

        setTodoData(() => [...todoData, newItem])
    }

    const clearAllCompleted = () => {
        todoData.forEach((element) => {
            if (element.completed) {
                deleteItem(element.id)
            }
        })
    }

    const filterItems = (items) => {
        switch (filter) {
            case 'all':
                return items
            case 'active':
                return items.filter((el) => !el.completed)
            case 'completed':
                return items.filter((el) => el.completed)
            default:
                return items
        }
    }

    const completedTaskCount = todoData.filter((el) => el.completed).length
    const uncompletedTask = todoData.length - completedTaskCount
    const visibleItems = filterItems(todoData)

    return (
        <section className="todoapp">
            <AppHeader onAddedItem={addItem} />
            <section className="main">
                <TaskList
                    todos={visibleItems}
                    onDeleted={deleteItem}
                    onToggleCompleted={onToggleCompleted}
                    onEdit={editItem}
                    editTodoSubmit={editTodoSubmit}
                    changeTimer={changeTimer}
                />
                <Footer
                    todoCount={uncompletedTask}
                    onClear={clearAllCompleted}
                    filter={filter}
                    onFilterChange={onFilterChange}
                />
            </section>
        </section>
    )
}
