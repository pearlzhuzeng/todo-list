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
        <Heading>My Todo List</Heading>
        <form onSubmit={this.handleSubmit}>
          <Inputbox
            type="text"
            placeholder="add todo item"
            value={this.state.content}
            onChange={this.handleChange}
          />
          <Addbutton type="submit">+</Addbutton>
        </form>
        <ul>
          {this.state.todos.map((todo, i) =>
            <TodoItem
              key={todo.timestamp}
              i={i}
              todo={todo}
              onUpdate={this.handleUpdate}
              onDelete={this.handleDelete}
            />
          )}
        </ul>
      </div>
    )
  }
}

export default App

const Heading = styled.h1`
  color: rebeccapurple;
  margin-bottom: 1em;
`

const Inputbox = styled.input`
  font-size: 18px;
  border-radius: 5px;
  margin-bottom: 1em;
`

const Addbutton = styled.button`
  background-color: DarkSeaGreen;
  border-radius: 5px;
  border: solid 0.5px PaleGreen;
  padding: 1px 8px;
  color: white;
  font-size: 20px;
`

class TodoItem extends Component {
  handleCompletedStatusChange = () => {
    const { i, todo, onUpdate } = this.props
    onUpdate(i, { ...todo, completed: !todo.completed })
  }

  handleContentChange = (e: SyntheticInputEvent) => {
    const { i, todo, onUpdate } = this.props
    onUpdate(i, { ...todo, content: e.target.value })
  }

  handleDelete = () => {
    const { i, onDelete } = this.props
    onDelete(i)
  }

  render () {
    const { todo } = this.props
    return (
      <ListItem>
        <Checkbox
          type="checkbox"
          checked={todo.completed}
          onChange={this.handleCompletedStatusChange}
        />
        {' '}
        <Itembox
          style={{ color: todo.completed ? 'grey' : 'black' }}
          type="text"
          value={todo.content}
          onChange={this.handleContentChange}
        />
        <button onClick={this.handleDelete}>X</button>
      </ListItem>
    )
  }
}

const ListItem = styled.li`
  list-style: none;
`

const Itembox = styled.input`
  font-size: 20px;
  margin-bottom: 0.4em;
  margin-left: 1em;
  border: none;
  background-color: Mintcream;
`
const Checkbox = styled.input`
  font-size: 20px;
`
