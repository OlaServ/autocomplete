import React from 'react'
import '../styles/Suggestions.css'

function Suggestions (props) {
  const classes = 'suggestions ' + props.className

  return (
    <div className={classes} id='suggestions' tabIndex='-1'>
      {props.suggestionsContent}
    </div>
  )
}

export default Suggestions
