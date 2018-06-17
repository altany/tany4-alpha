import React from 'react';
import Fetcher from '../shared/Fetcher.js';
import LastCommit from './LastCommit.js';

function ReadMe(props) {
  if (props.error) {
    return (
      <div className='readme' >
        {props.error}
      </div>
    );
  }
  return (
    <div className='readme' dangerouslySetInnerHTML={{ __html: props.data }} />
  );
}

class Repo extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isExpanded: props.expandStatus
    };

    this.toggleExpand = this.toggleExpand.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.expandStatus !== this.props.expandStatus) {
      this.setState({
        isExpanded: nextProps.expandStatus
      });
    }
  }

  toggleExpand(){
    this.setState({
      isExpanded: !this.state.isExpanded
    });
  }

  render() {
    let repo = this.props.repo;
    let className = 'repoContainer';
    if (this.state.isExpanded) {
      className += ' expanded';
    }
    return (
      <div className={className} onClick={ this.toggleExpand }>
        <h3 className='repoName'>
          <a href={ repo.html_url }>
            { repo.name }
          </a>
          <Fetcher url={ window.location.origin + '/api/github/last-commit/' + repo.name }>
            <LastCommit data={ {} }/>
          </Fetcher>
        </h3>
        { this.state.isExpanded &&
          <Fetcher
            url={ window.location.origin + '/api/github/readme/' + repo.name }
            errorMessage='No description available' showDefaultError={ false }
          >
          <ReadMe data={ {} }/>
        </Fetcher>
        }

      </div>
    );

  }
}

export default Repo;
