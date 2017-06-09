/**
 * @providesModule App
 * @flow
 */

import React, { Component } from 'react'
import { append, remove, update } from 'ramda'
import styled from 'styled-components'
import './App.css'

type Item = {
  content: string,
  completed: boolean,
  timestamp: Date,
}

class App extends Component {
  state: { content: string, todos: Item[] } = {
    content: '',
    todos: [],
  }

  handleChange = (e: SyntheticInputEvent) => {
    this.setState({ content: e.target.value })
  }

  handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault()
    const todos = append(
      { content: this.state.content, completed: false, timestamp: new Date() },
      this.state.todos
    )
    this.setState({ content: '', todos })
  }

  handleDelete = (i: number) => {
    const todos = remove(i, 1, this.state.todos)
    this.setState({ todos })
  }

  handleUpdate = (i: number, updatedContent: Item) => {
    const todos = update(i, updatedContent, this.state.todos)
    this.setState({ content: '', todos })
  }

  render () {
    return (
      <div>
        <h1>My Todo List</h1>
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            value={this.state.content}
            onChange={this.handleChange}
          />
          <button type="submit">+</button>
        </form>
        <ul>
          {this.state.todos.map((todo, i) =>
            <li key={todo.timestamp}>
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={(e: SyntheticInputEvent) => {
                  this.handleUpdate(i, { ...todo, completed: !todo.completed })
                }}
              />
              {' '}
              <input
                style={{ color: todo.completed ? 'grey' : 'black' }}
                type="text"
                value={todo.content}
                onChange={(e: SyntheticInputEvent) => {
                  this.handleUpdate(i, { ...todo, content: e.target.value })
                }}
              />
              <button onClick={() => this.handleDelete(i)}>X</button>
            </li>
          )}
        </ul>
      </div>
    )
  }
}

export default App
