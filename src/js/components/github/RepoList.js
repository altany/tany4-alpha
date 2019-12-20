import React from 'react'
import PropTypes from 'prop-types'
import Repo from './Repo'

class RepoList extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      statusAll: false
    }

    this.toggleAll = this.toggleAll.bind(this)
  }

  toggleAll () {
    this.setState({
      statusAll: !this.state.statusAll
    })
  }

  render () {
    return (
      <div className='repos-container'>
        <a id='toggleAllRepos' onClick={this.toggleAll}>
          {this.state.statusAll ? 'collapse' : 'expand'} all
        </a>
        {this.props.data.map((repo, i) => {
          return (
            <Repo key={i} repo={repo} expandStatus={this.state.statusAll} />
          )
        })}
      </div>
    )
  }
}

RepoList.propTypes = {
  data: PropTypes.any
}

export default RepoList
