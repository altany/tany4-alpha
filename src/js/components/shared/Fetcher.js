import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import ShowError from './ShowError.js';

class Fetcher extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      hasFailed: false,
      error: null,
      data: null
    };
  }

  componentDidMount() {
    axios.get(this.props.url)
      .then(res => {
        this.setState({
          data: res.data,
          isLoading: false,
          hasFailed: false,
          error: null
        });
      }).catch((error) => {
        this.setState({
          isLoading: false,
          hasFailed: true,
          error: error.message,
          data: null
        });
      });
  }

  render() {
    let state = this.state;
    
    if (this.state.hasFailed) {
      return <ShowError error={state.error}/>
    }

    if (this.state.isLoading) {
      return <p>Loading...</p>;
    }
    if (this.props.children) {
      return (
        <div className="Loader">
          {
            React.Children.map(this.props.children, function (child) {
              return React.cloneElement(child, state);
            })
          }
        </div>
      );
    }
    else {
      return(
        <pre>{JSON.stringify(this.state.data, null, 2) }</pre>
      );
    }
  }
}

export default Fetcher;