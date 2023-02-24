import './TaskList.css'
import PropTypes from 'prop-types'
import Task from '../Task'

function TaskList({ todos, onDeleted, onToggleCompleted, onEdit, editTodoSubmit }) {
    const elements = todos.map((item) => {
        const { id, ...itemProps } = item
        return (
            <Task
                {...itemProps}
                edit={item.edit}
                id={id}
                key={id}
                editTodoSubmit={(event) => editTodoSubmit(event, id)}
                onDeleted={() => onDeleted(id)}
                onToggleCompleted={() => onToggleCompleted(id)}
                onEdit={() => onEdit(id)}
            />
        )
    })

    return <ul className="todo-list">{elements}</ul>
}

TaskList.defaultProps = {
    todos: [],
    editTodoSubmit: () => {},
    onDeleted: () => {},
    onToggleCompleted: () => {},
    onEdit: () => {},
}
TaskList.propTypes = {
    todos: PropTypes.arrayOf(Object),
    editTodoSubmit: PropTypes.func,
    onDeleted: PropTypes.func,
    onToggleCompleted: PropTypes.func,
    onEdit: PropTypes.func,
}
export default TaskList
