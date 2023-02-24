import { Component } from 'react'
import './Task.css'
import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import PropTypes from 'prop-types'

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
        setInterval(() => {
            this.setState({
                currentTime: formatDistanceToNow(this.props.data, {
                    includeSeconds: true,
                }),
            })
        }, 1000)
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
        const { description, onDeleted, onToggleCompleted, completed, onEdit, edit, editTodoSubmit, id } = this.props

        let className = 'todo-list-item'

        if (completed) {
            className += ' completed'
        }

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
            <li className={className}>
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

// 1
