import React from "react";
import './Footer.css'
import TasksFilter from '../TasksFilter'
import PropTypes from 'prop-types'

const Footer = ({todoCount, onClear, filter, onFilterChange}) => {
 

return (
  <footer className="footer">
  <span className="todo-count">{todoCount} items left</span>
 <TasksFilter filter={filter} onFilterChange={onFilterChange}/>
  <button onClick={onClear}
  className="clear-completed">Clear completed</button>
</footer>
)
}
Footer.defaultProps = {
  onFilterChange: () => {},
  onClear: () => {}
}
Footer.propTypes = {
  onFilterChange: PropTypes.func,
  onClear: PropTypes.func
}
export default Footer

