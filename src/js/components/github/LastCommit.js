import React from 'react'
import PropTypes from 'prop-types'

function LastCommitInfo (props) {
  let info = props.info

  if (info.link) {
    return (
      <span>
        Latest commit:
        <a href={info.link}>{' ' + info.message}</a>
      </span>
    )
  } else {
    return <div>Latest commit: {info.message}</div>
  }
}

function LastCommit (props) {
  return (
    <div className='lastCommit'>
      <LastCommitInfo info={props.data} />
      {' ' + props.data.date || ''}
    </div>
  )
}

LastCommit.propTypes = {
  data: PropTypes.object
}

export default LastCommit
