import React from "react";
import './TaskList.css'
import Task from '../Task'
import PropTypes from "prop-types"

const TaskList = ({todos, onDeleted, onToggleCompleted, onEdit, editTodoSubmit}) => {

  const elements = todos.map((item) => {
  const {id, ...itemProps} = item
  return (
    <li key = {id} className='list-group-item'>
      
    <Task {...itemProps} 
    edit = {item.edit}
    editTodoSubmit = {(event) => editTodoSubmit(event, id)}
    onDeleted = {() => onDeleted(id)}
    onToggleCompleted = {() => onToggleCompleted(id)}
    onEdit = {() => onEdit(id)}
 
    />
 </li>

  )
  })


return (
<ul className="todo-list">
{elements}
</ul>
)
}

TaskList.defaultProps = {
  todos: [],
  editTodoSubmit: () => {},
  onDeleted: () => {},
  onToggleCompleted: () => {},
  onEdit: () => {}
}
TaskList.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.object),
  editTodoSubmit: PropTypes.func,
  onDeleted: PropTypes.func,
  onToggleCompleted: PropTypes.func,
  onEdit: PropTypes.func
}
export default TaskList