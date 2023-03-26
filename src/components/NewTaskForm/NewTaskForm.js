import { useState } from 'react'
import './NewTaskForm.css'
// import PropTypes from 'prop-types'

export default function NewTaskForm({ onAddedItem }) {
    const [description, setDescription] = useState('')
    const [min, setMin] = useState('')
    const [sec, setSec] = useState('')

    const onChangeDesc = (e) => {
        setDescription(e.target.value)
    }

    const onChangeMinTimer = (e) => {
        setMin(Number(e.target.value))
    }

    const onChangeSecTimer = (e) => {
        setSec(Number(e.target.value))
    }

    const onSubmitDesc = (e) => {
        e.preventDefault()
        onAddedItem(description, min, sec)
        setDescription('')
        setMin('')
        setSec('')
    }

    return (
        <form onSubmit={onSubmitDesc}>
            <input
                required
                type="text"
                className="new-todo"
                placeholder="What needs to be done?"
                autoFocus
                onChange={onChangeDesc}
                value={description}
            />
            <input
                type="number"
                min="0"
                max="720"
                className="new-todo-form__timer"
                onChange={onChangeMinTimer}
                placeholder="Min"
                value={min}
            />
            <input
                type="number"
                min="0"
                max="60"
                className="new-todo-form__timer"
                onChange={onChangeSecTimer}
                placeholder="Sec"
                value={sec}
            />
            <input type="submit" style={{ display: 'none' }} />
        </form>
    )
}

NewTaskForm.defaultProps = {
    onChangeDesc: () => {},
    onSubmitDesc: () => {},
}

// NewTaskForm.propTypes = {
//     onChangeDesc: PropTypes.func,
//     onSubmitDesc: PropTypes.func,
// }
