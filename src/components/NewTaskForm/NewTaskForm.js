import React, {Component} from "react";
import './NewTaskForm.css'
import PropTypes from 'prop-types'

export default class NewTaskForm extends Component {
 static defaultProps = {
  onChangeDesc:() => {},
  onSubmitDesc:() => {}
 }

 static propTypes = {
  onChangeDesc: PropTypes.func,
  onSubmitDesc: PropTypes.func
 }

  state = {
    description:''
  }

  onChangeDesc = (e) => {
    this.setState({
      description:e.target.value
    })
 
  }
  onSubmitDesc = (e) => {
    e.preventDefault()
    this.props.onAddedItem(this.state.description)
    this.setState({
      description: ''
    })
  }
render(){
  
  return (
    <form onSubmit={this.onSubmitDesc}> 
    <input type ="text" 
            className="new-todo"
           placeholder="What needs to be done?" 
           autoFocus
           onChange={this.onChangeDesc}
           value = {this.state.description}
           />
    </form>

        )
}

}



// onAddedItem