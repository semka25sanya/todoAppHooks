import { Component } from 'react'
import './NewTaskForm.css'

export default class NewTaskForm extends Component {
    static defaultProps = {
        onChangeDesc: () => {},
        onSubmitDesc: () => {},
    }

    state = {
        description: '',
        min: '',
        sec: '',
    }

    onChangeDesc = (e) => {
        this.setState({
            description: e.target.value,
        })
    }

    onChangeMinTimer = (e) => {
        this.setState({
            min: Number(e.target.value),
        })
    }

    onChangeSecTimer = (e) => {
        this.setState({
            sec: Number(e.target.value),
        })
    }

    onSubmitDesc = (e) => {
        e.preventDefault()
        this.props.onAddedItem(this.state.description, this.state.min, this.state.sec)
        this.setState({
            description: '',
            min: '',
            sec: '',
        })
    }

    render() {
        return (
            <form onSubmit={this.onSubmitDesc}>
                <input
                    required
                    type="text"
                    className="new-todo"
                    placeholder="What needs to be done?"
                    autoFocus
                    onChange={this.onChangeDesc}
                    value={this.state.description}
                />
                <input
                    className="new-todo-form__timer"
                    onChange={this.onChangeMinTimer}
                    placeholder="Min"
                    value={this.state.min}
                />
                <input
                    className="new-todo-form__timer"
                    onChange={this.onChangeSecTimer}
                    placeholder="Sec"
                    value={this.state.sec}
                />
                <input type="submit" style={{ display: 'none' }} />
            </form>
        )
    }
}
