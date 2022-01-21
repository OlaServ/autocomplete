import React from 'react'
import '../styles/Suggestion.css'

function Suggestion (props) {
  return (
    <span
      className='suggestion'
      tabIndex={-2}
      onKeyDown={props.onSwitchSuggestion}
      onClick={props.onAddTag}
    >
      {props.name}
    </span>
  )
}

export default Suggestion
