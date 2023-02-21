import React from "react";
import './AppHeader.css'
import NewTaskForm from "../NewTaskForm";
import PropTypes from 'prop-types'

const AppHeader = ({onAddedItem}) => {

return (
  <header className="header">
    <h1>todos</h1>
    <NewTaskForm onAddedItem={onAddedItem}/>
    </header>

)
}

AppHeader.defaultProps = {
  onAddedItem: () => {}
}

AppHeader.propTypes = {
onAddedItem: PropTypes.func
}
export default AppHeader