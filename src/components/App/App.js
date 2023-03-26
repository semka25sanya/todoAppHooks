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
        setTodoData(() => {
            const idx = todoData.findIndex((el) => el.id === id)
            const oldItem = todoData[idx]
            const newItem = { ...oldItem, edit: !oldItem.edit }

            return [...todoData.slice(0, idx), newItem, ...todoData.slice(idx + 1)]
        })
    }

    const changeTimer = (id, min, sec) => {
        setTodoData(() => {
            const idx = todoData.findIndex((el) => el.id === id)

            const oldItem = todoData[idx]

            if (typeof oldItem === 'undefined') return
            const newItem = { ...oldItem, min, sec }

            // eslint-disable-next-line consistent-return
            return [...todoData.slice(0, idx), newItem, ...todoData.slice(idx + 1)]
        })
    }

    const editTodoSubmit = (event, id) => {
        event.preventDefault()
        setTodoData(() => {
            const index = todoData.findIndex((data) => data.id === id)
            const oldData = todoData[index]
            const newData = {
                ...oldData,
                edit: !oldData.edit,
                description: event.target.querySelector('input').value,
            }
            return [...todoData.slice(0, index), newData, ...todoData.slice(index + 1)]
        })
    }

    const onFilterChange = (val) => {
        setFilter(val)
    }

    const onToggleCompleted = (id) => {
        setTodoData(() => {
            const idx = todoData.findIndex((el) => el.id === id)

            const oldItem = todoData[idx]
            const newItem = { ...oldItem, completed: !oldItem.completed }

            return [...todoData.slice(0, idx), newItem, ...todoData.slice(idx + 1)]
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
