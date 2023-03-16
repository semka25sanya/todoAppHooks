import { Component } from 'react'
import './Task.css'
import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import PropTypes from 'prop-types'
import classNames from 'classnames'

export default class Task extends Component {
    static defaultProps = {
        editTodoSubmit: () => {},
        onToggleCompleted: () => {},
        onEdit: () => {},
        onDeleted: () => {},
    }

    static propTypes = {
        editTodoSubmit: PropTypes.func,
        onToggleCompleted: PropTypes.func,
        onEdit: PropTypes.func,
        onDeleted: PropTypes.func,
    }

    state = {
        value: this.props.description,
        currentTime: null,
        sec: this.props.sec,
        min: this.props.min,
        // pause: false,
    }

    componentDidMount() {
        this.timerID = setInterval(() => {
            this.setState({
                currentTime: formatDistanceToNow(this.props.data, {
                    includeSeconds: true,
                }),
            })
        }, 1000)
    }

    componentWillUnmount() {
        clearInterval(this.timerID)
    }

    newStateEdit = (ev) => {
        this.setState(() => {
            const newVal = ev.target.value
            return {
                value: newVal,
            }
        })
    }

    startTimer = () => {
        this.timer = setInterval(this.countUp, 1000)
    }

    stopTimer = () => {
        // this.setState({
        //     pause: false,
        // })
        clearInterval(this.timer)
    }

    countUp = () => {
        const { sec, min } = this.state

        if (sec || min) {
            if (sec <= 0) {
                this.setState({ sec: 59, min: min - 1 })
            } else if (sec < 60) {
                this.setState({ sec: sec - 1 })
            }
        } else {
            clearInterval(this.timer)
        }
    }

    render() {
        const { description, onDeleted, onToggleCompleted, onEdit, completed, edit, editTodoSubmit, id } = this.props

        return edit ? (
            <li className="editing">
                <form onSubmit={editTodoSubmit}>
                    <input
                        autoFocus
                        type="text"
                        defaultValue={this.state.value}
                        onChange={this.newStateEdit}
                        className="edit"
                    />
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
                                onClick={this.startTimer}
                                type="button"
                                className="icon icon-play"
                            />
                            <button
                                aria-label="pause-button"
                                type="button"
                                onClick={this.stopTimer}
                                className="icon icon-pause"
                            />
                            <span className="passedTime">
                                {' '}
                                min:{this.state.min} sec: {this.state.sec}
                            </span>
                        </span>

                        <span className="created">created {this.state.currentTime} ago</span>
                    </label>
                    <button aria-label="edit-button" type="button" className="icon icon-edit" onClick={onEdit} />
                    <button
                        aria-label="destroy-button"
                        type="button"
                        className="icon icon-destroy"
                        onClick={onDeleted}
                    />
                </div>
            </li>
        )
    }
}
