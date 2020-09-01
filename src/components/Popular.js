import React from 'react'
import LanguagesNav from './LanguagesNav'
import ReposGrid from './ReposGrid'
import { fetchPopularRepos } from '../utils/api'
import Loading from './Loading'

export default class Popular extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      selectedLanguage: 'All',
      repos: {},
      error: null,
    }
    this.updateLanguage = this.updateLanguage.bind(this)
    this.isLoading = this.isLoading.bind(this)
  }

  componentDidMount() {
    this.updateLanguage(this.state.selectedLanguage)
  }

  updateLanguage(selectedLanguage) {
    this.setState({
      selectedLanguage,
      error: null,
    })

    if (!this.state.repos[selectedLanguage]) {
      fetchPopularRepos(selectedLanguage)
        .then((data) => {
          this.setState((prevState) => ({
            repos: {
              ...prevState.repos,
              [selectedLanguage]: data,
            },
          }))
        })
        .catch(() => {
          this.setState({
            error: 'Error fetching repository',
          })
        })
    }
  }

  isLoading() {
    const { selectedLanguage, error, repos } = this.state
    return !repos[selectedLanguage] && error === null
  }

  render() {
    const { repos, error } = this.state
    return (
      <>
        <LanguagesNav
          selectedLanguage={this.state.selectedLanguage}
          updateLanguage={this.updateLanguage}
        />
        {this.isLoading() && <Loading text='Fetching Repos' />}
        {error && <p className='center-text error'>{error}</p>}
        {repos[this.state.selectedLanguage] && (
          <ReposGrid repos={repos[this.state.selectedLanguage]} />
        )}
      </>
    )
  }
}
