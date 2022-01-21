import React from 'react'
import '../styles/Form.css'
import { FormData } from '../data/FormData.js'
import Tag from './Tag'
import { useState } from 'react'
import { selectedItems } from '../data/SelectedItems'
import Suggestions from './Suggestions'
import Suggestion from './Suggestion'

function Form () {
  const [tags, setTags] = useState()
  const [suggestions, setSuggestions] = useState()
  const [suggestionsClass, setSuggestionsClass] = useState()

  const createSuggestion = suggestionName => {
    return (
      <Suggestion
        name={suggestionName}
        key={suggestionName}
        onSwitchSuggestion={keyboardSelection}
        onAddTag={createTags}
      />
    )
  }

  const showSuggestions = e => {
    const inputValue = e.target.value.trim()
    setSuggestions('')

    if (inputValue.length > 0) {
      setSuggestionsClass('active')
    } else {
      setSuggestionsClass('')
    }

    const usedItems = []
    let userInputSuggestion

    for (const item of FormData) {
      if (
        inputValue.length > 0 &&
        item.startsWith(inputValue.trim().toLowerCase())
      ) {
        usedItems.push(item)
      } else {
        setSuggestions('')
        userInputSuggestion = createSuggestion(inputValue)
      }

      const sortedItems = usedItems.map(item => createSuggestion(item)).sort()
      setSuggestions([userInputSuggestion, sortedItems])
    }
  }

  const createTags = e => {
    const suggestionText = e.target.innerText
    if (selectedItems.has(suggestionText)) {
      selectedItems.delete(suggestionText)
      e.target.classList.remove('added')
    } else {
      selectedItems.add(suggestionText)
      e.target.classList.add('added')
    }
    updateTags()
  }

  const updateTags = () => {
    const tagsArray = Array.from(selectedItems)
    const addedSuggestions = document.querySelectorAll('.suggestion.added')

    addedSuggestions.forEach(suggestion => {
      if (tagsArray.includes(suggestion.textContent)) {
        return
      } else {
        suggestion.classList.remove('added')
      }
    })

    setTags(
      tagsArray.map(item => (
        <Tag
          name={item}
          key={tagsArray.indexOf(item)}
          onRemoveTag={removeTag}
        />
      ))
    )
  }

  const removeTag = e => {
    const name = e.target.parentElement.textContent
    if (selectedItems.has(name)) {
      selectedItems.delete(name)
    }

    updateTags()
  }

  const keyboardSelection = e => {
    switch (e.code) {
      case 'ArrowDown':
        if (!e.target.nextElementSibling) {
          return
        } else {
          e.target.nextElementSibling.focus()
        }
        break

      case 'ArrowUp':
        if (!e.target.previousElementSibling) {
          return
        } else {
          e.target.previousElementSibling.focus()
        }
        break

      case 'Enter' || 'NumpadEnter':
        selectedItems.add(e.target.textContent)
        e.target.classList.add('added')
        updateTags()

        break

      case 'Delete':
        if (selectedItems.has(e.target.textContent)) {
          selectedItems.delete(e.target.textContent)
          e.target.classList.remove('added')
          updateTags()
        }
        break
    }
  }

  const addTypedInput = e => {
    if (e.code === 'ArrowDown') {
      document.querySelector('.suggestions .suggestion').focus()
    } else if (e.code === 'Enter' || e.code === 'NumpadEnter') {
      selectedItems.add(e.target.value.trim())
      const suggestions = document.querySelectorAll('.suggestion')

      suggestions.forEach(suggestion => {
        if (suggestion.textContent === e.target.value) {
          suggestion.classList.add('added')
        }
      })

      updateTags()
    } else {
      return
    }
  }

  return (
    <form
      className='form'
      autoComplete='off'
      onSubmit={e => e.preventDefault()}
    >
      <div className='items-form'>
        <h2 className='title'>Autocomplete form</h2>
        <div className='input-container'>
          <input
            id='form-input'
            type='text'
            name='form-input'
            placeholder='Add your item'
            onChange={showSuggestions}
            onKeyDown={addTypedInput}
          />
          <Suggestions
            suggestionsContent={suggestions}
            className={suggestionsClass}
          />
        </div>
      </div>

      <div className='tags-container' id='tags-container'>
        {tags}
      </div>
    </form>
  )
}

export default Form
