import React, {Component} from "react";
import './Task.css'
import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import PropTypes from "prop-types"

export default class Task extends Component {

  static defaultProps = {
editTodoSubmit: () => {},
onToggleCompleted: () => {},
onEdit: () => {},
onDeleted: () => {}
  }

  static propTypes = {
    editTodoSubmit: PropTypes.func,
    onToggleCompleted: PropTypes.func,
    onEdit: PropTypes.func,
    onDeleted: PropTypes.func
  }

state = {
 value: this.props.description,
 currentTime : null
  }

  newStateEdit = (ev) => {
    this.setState(({value}) => {
let newVal = ev.target.value
return {
  value: newVal
}
    })
  }

componentDidMount() {
  setInterval( () => {
    this.setState({
      currentTime : formatDistanceToNow(this.props.data, { includeSeconds: true })
    })
  },1000)
}


render(){
  const {description, onDeleted, onToggleCompleted, completed, onEdit, edit, editTodoSubmit} = this.props
  
    let className = 'todo-list-item'

    if(completed){
      className += " completed"
    }

  return edit ? (
    <span className="editing">
      <form onSubmit = {editTodoSubmit}>
        <input autoFocus type="text" defaultValue= {this.state.value} onChange={this.newStateEdit} className="edit" ></input>
      </form>
    </span>
  )
:
      <span className={className}
      >
      <div className="view">
       <input onClick={onToggleCompleted}
       className="toggle" type="checkbox"/>
       <label>
       <span className="description" onClick={onToggleCompleted}>
        {description}</span>
       <span className="created">created {this.state.currentTime} ago</span>
       </label>
     <button className="icon icon-edit"
     onClick={onEdit}></button>
     <button className="icon icon-destroy"
     onClick={onDeleted}></button> 
      </div>
 
     
      </span>
     
     
}

}


 








