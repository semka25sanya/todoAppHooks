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
                        <span className="description">{description}</span>
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
