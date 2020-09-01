import React from 'react'
import Instructions from './Instructions'
import PlayerInput from './PlayerInput'
import PlayerPreview from './PlayerPreview'
import Results from './Results'
import { Link } from 'react-router-dom'

export default class Battle extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      playerOne: null,
      playerTwo: null,
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleReset = this.handleReset.bind(this)
  }

  handleSubmit(id, player) {
    this.setState({
      [id]: player,
    })
  }

  handleReset(id) {
    this.setState({
      [id]: null,
    })
  }

  render() {
    const { playerOne, playerTwo } = this.state

    return (
      <>
        <Instructions />
        <div className='players-container'>
          <h1 className='center-text header-lg'>Players</h1>
          <div className='row space-around'>
            {playerOne === null ? (
              <PlayerInput
                label='Player One'
                onSubmit={(player) => this.handleSubmit('playerOne', player)}
              />
            ) : (
              <PlayerPreview
                username={playerOne}
                label='Player One'
                onReset={() => this.handleReset('playerOne')}
              />
            )}
            {playerTwo === null ? (
              <PlayerInput
                label='Player Two'
                onSubmit={(player) => this.handleSubmit('playerTwo', player)}
                onReset={() => this.handleReset('playerTwo')}
              />
            ) : (
              <PlayerPreview
                username={playerTwo}
                label='Player Two'
                onReset={() => this.handleReset('playerTwo')}
              />
            )}
          </div>
          {playerOne && playerTwo && (
            <Link
              className='btn dark-btn btn-space'
              to={{
                pathname: '/battle/results',
                search: `?playerOne=${playerOne}&playerTwo=${playerTwo}`,
              }}
            >
              Battle
            </Link>
          )}
        </div>
      </>
    )
  }
}
