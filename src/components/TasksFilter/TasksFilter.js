import { Component } from 'react'
import './TasksFilter.css'
import PropTypes from 'prop-types'

export default class TasksFilter extends Component {
    static defaultProps = {
        onFilterChange: () => {},
    }

    static propTypes = {
        onFilterChange: PropTypes.func,
    }

    buttons = [
        { name: 'all', label: 'All' },
        { name: 'active', label: 'Active' },
        { name: 'completed', label: 'Completed' },
    ]

    render() {
        const { filter, onFilterChange } = this.props
        const buttons = this.buttons.map(({ name, label }) => {
            const isActive = filter === name
            const clazz = isActive ? 'selected' : ''
            return (
                <li key={name}>
                    <button type="button" onClick={() => onFilterChange(name)} className={`${clazz}`}>
                        {label}
                    </button>
                </li>
            )
        })

        return <ul className="filters">{buttons}</ul>
    }
}
