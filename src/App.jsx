import React, { Component } from 'react'
import { append, remove, update } from 'ramda'
import styled from 'styled-components'
import './App.css'

class App extends Component {
  state = {
    content: '',
    todos: [],
  }

  handleChange = (e: SyntheticInputEvent) => {
    this.setState({ content: e.target.value })
  }

  handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault()
    const content = this.state.content
    const currenttodos = this.state.todos
    const todos = append(content, currenttodos)
    this.setState({ content: '', todos })
  }

  render () {
    const todos = this.state.todos

    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <h1>My Todo List</h1>
          <input
            type="text"
            value={this.state.content}
            onChange={this.handleChange}
          />
          <button type="submit">+</button>
        </form>
        <ul>
          {todos.map(todo => <li>{todo}</li>)}
        </ul>
      </div>
    )
  }
}

export default App
