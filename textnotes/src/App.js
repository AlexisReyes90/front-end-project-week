import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import './App.css'
import NotesContainer from './Components/NotesContainer'
import { getNotes } from './Action'

class App extends Component {
  state = { queue: '' }

  handleInputChange = e => {
    this.setState({ queue: e.target.value.substr(0, 20) })
  }

  filteredNotes = () => {
    return this.props.notes
      .filter(({ title }) => title.includes(this.state.queue))
      .map(note => (
        <Link key={note.id} to={`/Note/${note.id}`}>
          <NotesContainer key={note.id} note={note} />
        </Link>
      ))
  }

  async componentDidMount() {
    await this.props.getNotes()
  }

  render() {
    return (
      <div className="createPage">
        <form className="bar">
          <input
            placeholder="Searching..."
            value={this.state.queue}
            onChange={this.handleInputChange}
          />
        </form>
        <h3 className="home-logo">Your Notes: </h3>
        <nav>
          <ul>{this.filteredNotes()}</ul>
        </nav>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    loading: state.loading,
    notes: state.notes
  }
}

export default connect(mapStateToProps, { getNotes })(App)
