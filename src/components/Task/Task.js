import { useState, useEffect } from 'react'
import './Task.css'
import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import PropTypes from 'prop-types'
import classNames from 'classnames'
// import { setSeconds } from 'date-fns'

export default function Task({
    description,
    onDeleted,
    onToggleCompleted,
    onEdit,
    completed,
    edit,
    editTodoSubmit,
    id,
    min,
    sec,
    data,
    changeTimer,
}) {
    const [value, setValue] = useState(description)
    const [isPause, setIsPause] = useState(true)
    const [currentTime, setCurrentTime] = useState([])
    const [seconds, setSec] = useState(sec)
    const [minutes, setMin] = useState(min)

    useEffect(() => {
        if (sec === '') setSec(0)
        if (min === '') setMin(0)

        const timerID = setInterval(() => {
            setCurrentTime({
                currentTime: formatDistanceToNow(data, {
                    includeSeconds: true,
                }),
            })
        }, 1000)

        if (!isPause) {
            const interval = setInterval(() => {
                if (seconds === 0 && minutes !== 0) {
                    setSec((s) => s + 59)
                    setMin((m) => m - 1)
                } else if (seconds === 0 && minutes === 0) {
                    /* empty */
                } else {
                    setSec((s) => s - 1)
                }
            }, 1000)

            return () => {
                clearInterval(interval)
                changeTimer(id, minutes, seconds)
            }
        }

        return () => {
            clearInterval(timerID)
        }
    }, [seconds, minutes, isPause])

    const startTimer = () => {
        setIsPause(false)
    }

    const newStateEdit = (ev) => {
        setValue(ev.target.value)
    }

    const stopTimer = () => {
        setIsPause(true)
    }

    return edit ? (
        <li className="editing">
            <form onSubmit={editTodoSubmit}>
                <input autoFocus type="text" defaultValue={value} onChange={newStateEdit} className="edit" />
            </form>
        </li>
    ) : (
        <li className={classNames('todo-list-item', { ' completed': completed })}>
            <div className="view">
                <input id={id} className="toggle" type="checkbox" onClick={onToggleCompleted} />
                <label htmlFor={id}>
                    <span className="description">
                        {description}
                        <button
                            aria-label="play-button"
                            onClick={startTimer}
                            type="button"
                            className="icon icon-play"
                        />
                        <button
                            aria-label="pause-button"
                            type="button"
                            onClick={stopTimer}
                            className="icon icon-pause"
                        />
                        <span className="passedTime">
                            {' '}
                            min:{minutes} sec: {seconds}
                        </span>
                    </span>

                    <span className="created">created {currentTime.currentTime} ago</span>
                </label>
                <button aria-label="edit-button" type="button" className="icon icon-edit" onClick={onEdit} />
                <button
                    aria-label="destroy-button"
                    type="button"
                    className="icon icon-destroy"
                    onClick={() => onDeleted(id)}
                />
            </div>
        </li>
    )
}

Task.defaultProps = {
    editTodoSubmit: () => {},
    onToggleCompleted: () => {},
    onEdit: () => {},
    onDeleted: () => {},
}

Task.propTypes = {
    editTodoSubmit: PropTypes.func,
    onToggleCompleted: PropTypes.func,
    onEdit: PropTypes.func,
    onDeleted: PropTypes.func,
}
