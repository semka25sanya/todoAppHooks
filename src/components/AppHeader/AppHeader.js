import './AppHeader.css'
import PropTypes from 'prop-types'
import NewTaskForm from '../NewTaskForm'

function AppHeader({ onAddedItem }) {
    return (
        <header className="header">
            <h1>todos</h1>
            <NewTaskForm onAddedItem={onAddedItem} />
        </header>
    )
}

AppHeader.defaultProps = {
    onAddedItem: () => {},
}

AppHeader.propTypes = {
    onAddedItem: PropTypes.func,
}
export default AppHeader
