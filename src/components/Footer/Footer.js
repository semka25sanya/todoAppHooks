import './Footer.css'
import PropTypes from 'prop-types'
import TasksFilter from '../TasksFilter'

function Footer({ todoCount, onClear, filter, onFilterChange }) {
    return (
        <footer className="footer">
            <span className="todo-count">{todoCount} items left</span>
            <TasksFilter filter={filter} onFilterChange={onFilterChange} />
            <button type="button" onClick={onClear} className="clear-completed">
                Clear completed
            </button>
        </footer>
    )
}
Footer.defaultProps = {
    onFilterChange: () => {},
    onClear: () => {},
}
Footer.propTypes = {
    onFilterChange: PropTypes.func,
    onClear: PropTypes.func,
}
export default Footer
