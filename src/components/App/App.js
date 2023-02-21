import React, {Component} from "react";


import './App.css'
import AppHeader from "../AppHeader";
import TaskList from "../TaskList";
import Footer from '../Footer'
// import formatDistanceToNow from 'date-fns/formatDistanceToNow'


export default class App extends Component  {

 maxId = 1

  state = {
    todoData : [
      this.createItem('Completed task'),
      this.createItem('Editing task'),
      this.createItem('Active task')
    ],
    filter:'all'
    
  }


filterItems (items, filter) {
  switch(filter){
    case 'all':
      return items;
    case 'active':
      return items.filter((el) => !el.completed);
    case 'completed':
      return items.filter((el) => el.completed);
    default: return items;  
  }
}
createItem(text){
  return {
    description:text,
    completed:false,
    id: this.maxId++,
    edit:false,
    data: new Date()
  }
}

editItem = (id) => {
  this.setState(({todoData}) => {
    let idx = todoData.findIndex((el) => el.id === id )
    let oldItem = todoData[idx]
    let newItem = {...oldItem, edit: !oldItem.edit}

    let newArr = [...todoData.slice(0, idx),
    newItem,
  ...todoData.slice(idx+1)]

  return {
    todoData:newArr
  }
  })
}

// newTime = (id) => {
//   setInterval(() => {
//     this.getCreationTime()
//   }, 1000)
// }
// getCreationTime = (id) => {
// this.setState(({todoData}) => {
//   let idx = todoData.findIndex((el) => el.id === id )
//   let oldItem = todoData[idx]
//   let newData = formatDistanceToNow(this.state.date, { includeSeconds: true });
//   let newItem = {...oldItem, data: newData}

//   let newArr = [...todoData.slice(0, idx),
//   newItem,
// ...todoData.slice(idx+1)]

// return {
//   todoData:newArr
// }

// })

// }
editTodoSubmit = (event, id) => {
  event.preventDefault();
  this.setState(({ todoData }) => {
    const index = todoData.findIndex((data) => data.id === id);
    const oldData = todoData[index];
    const newData = { ...oldData, edit: !oldData.edit, description: event.target.querySelector('input').value };
    const newArray = [...todoData.slice(0, index), newData, ...todoData.slice(index + 1)];
    return {
      todoData: newArray,
    };
  });
};
addItem = (text) => {
  let newItem = this.createItem(text)

  this.setState(({todoData}) => {
    let newArr = [...todoData, newItem]

    return {
      todoData: newArr
    }
  })
}
onFilterChange = (filter) => {
this.setState({filter})
}
clearAllCompleted = () => {
this.state.todoData.forEach(element => {
if(element.completed){
this.deleteItem(element.id)
}

 });
}
onToggleCompleted = (id) =>{
  this.setState(({todoData})=>{
    let idx = todoData.findIndex((el) => el.id === id)

    let oldItem = todoData[idx]
let newItem = {...oldItem, completed:!oldItem.completed}

let newArr = [...todoData.slice(0,idx),
newItem,
...todoData.slice(idx + 1)]

return {
  todoData:newArr
}
  })
}
deleteItem = (id) => {
    this.setState(({todoData}) => {
      let idx = todoData.findIndex((el) => el.id === id)

      let before = todoData.slice(0, idx)
      let after = todoData.slice(idx+1)

      let newArr = [...before, ...after]

      return {
        todoData:newArr
      }
    })
  } 
render(){

  let completedTaskCount = this.state.todoData.filter((el) => el.completed).length
  let uncompletedTask = this.state.todoData.length - completedTaskCount
  let visibleItems = this.filterItems(this.state.todoData, this.state.filter)
  return (

    <section className="todoapp">
        <AppHeader onAddedItem = {this.addItem}/>
        <section className="main">
        <TaskList todos={visibleItems}
        onDeleted = {this.deleteItem} 
        onToggleCompleted = {this.onToggleCompleted}
        onEdit = {this.editItem}
        editTodoSubmit = {this.editTodoSubmit}
        />
        <Footer todoCount={uncompletedTask}
        creationTime = {this.getCreationTime}
        // newTime = {this.newTime}
        // getTime = {this.state.data}
        onClear={this.clearAllCompleted}
        filter = {this.state.filter}
        onFilterChange= {this.onFilterChange}
        />
       </section>
    </section>
  
  
  )
}


}

