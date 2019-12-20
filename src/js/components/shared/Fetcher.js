import React from 'react'
import axios from 'axios'
import Loading from 'react-loading'
import ShowError from './ShowError.js'

class Fetcher extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      isLoading: true,
      hasFailed: false,
      error: null,
      data: null,
      showDefaultError:
        'showDefaultError' in props ? props.showDefaultError : true
    }
  }

  componentDidMount () {
    axios
      .get(this.props.url)
      .then(res => {
        this.setState({
          data: res.data,
          isLoading: false,
          hasFailed: false,
          error: null
        })
      })
      .catch(error => {
        this.setState({
          isLoading: false,
          hasFailed: true,
          error: this.props.errorMessage || error.message,
          data: null
        })
      })
  }

  render () {
    let state = this.state

    if (state.hasFailed) {
      if (state.showDefaultError) {
        return <ShowError error={state.error} />
      }
      return (
        <div className='ErrorLoader'>
          {React.Children.map(this.props.children, function (child) {
            return React.cloneElement(child, state)
          })}
        </div>
      )
    }

    if (this.state.isLoading) {
      return <Loading type='bubbles' color='#e3e3e3' width={30} />
    }
    if (this.props.children) {
      return (
        <div className='Loader'>
          {React.Children.map(this.props.children, function (child) {
            return React.cloneElement(child, state)
          })}
        </div>
      )
    } else {
      return <pre>{JSON.stringify(this.state.data, null, 2)}</pre>
    }
  }
}

export default Fetcher
