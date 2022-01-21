import React from 'react'
import '../styles/Tag.css'
import CloseIcon from '../assets/times-solid.svg'

function Tag (props) {
  return (
    <div className='tag' id={props.name}>
      {props.name}
      <img
        src={CloseIcon}
        alt='x'
        className='close-btn'
        onClick={props.onRemoveTag}
      />
    </div>
  )
}

export default Tag
