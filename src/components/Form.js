import React from 'react';
import '../styles/Form.css';
import { FormData } from '../data/FormData.js';

import Tag from './Tag';
import { useState } from 'react';
import '../styles/Suggestion.css';
import { selectedItems } from '../data/SelectedItems';

function Form (props) {
  const [tags, setTags] = useState(props.tags);

  const showSuggestions = e => {
    const inputValue = e.target.value.trim();
    const suggestions = document.getElementById('suggestions');
    suggestions.innerHTML = ''

    if (inputValue.length > 0) {
      suggestions.classList.add('active');
    } else {
      suggestions.classList.remove('active');
    }

    let usedItems = []

    for (const item of FormData) {
      if (
        inputValue.length > 0 &&
        item.startsWith(inputValue.trim().toLowerCase())
      ) {
        usedItems.push(item)
      } else {
        /* continue; */
        suggestions.innerHTML = ''
        const inputSuggestion = document.createElement('span');
        inputSuggestion.classList.add('suggestion');

        inputSuggestion.setAttribute('tabindex', '-2');
        inputSuggestion.addEventListener('keydown', keyboardSelection);
        inputSuggestion.innerText = inputValue;

        const addedTags = document.querySelectorAll('.tag');

        addedTags.forEach(tag => {
          if (tag.textContent === inputValue) {
            inputSuggestion.classList.add('added');
          }
        })
        suggestions.appendChild(inputSuggestion);
      }
    }

    const sortedItems = usedItems.sort();

    sortedItems.forEach(item => {
      const suggestion = document.createElement('span');
      suggestion.setAttribute('tabindex', '-2');
      suggestion.addEventListener('keydown', keyboardSelection);
      suggestion.innerText = item;
      suggestion.classList.add('suggestion');
      suggestions.appendChild(suggestion);
    })

    createTags();
  }

  const createTags = () => {
    const suggestionItems = document.querySelectorAll('.suggestion');
    suggestionItems.forEach(suggestionItem => {
      suggestionItem.addEventListener('click', () => {
        if (selectedItems.has(suggestionItem.innerText)) {
          selectedItems.delete(suggestionItem.innerText);
          suggestionItem.classList.remove('added');
        } else {
          selectedItems.add(suggestionItem.innerText);
          suggestionItem.classList.add('added');
        }

        updateTags();
      })
    })
  }

  const updateTags = () => {
    const addedSuggestions = document.querySelectorAll('.suggestion.added');

    let tagsArray = Array.from(selectedItems);
    addedSuggestions.forEach(suggestion => {
      if (tagsArray.includes(suggestion.textContent)) {
        return;
      } else {
        suggestion.classList.remove('added');
      }
    })

    setTags(
      tagsArray.map(item => (
        <Tag
          name={item}
          key={tagsArray.indexOf(item)}
          onDeleteTag={updateTags}
        />
      ))
    )
  }

  const keyboardSelection = e => {
    if (e.code === 'ArrowDown') {
      if (!e.target.nextElementSibling) {
        return;
      } else {
        e.target.nextElementSibling.focus();

        e.target.classList.remove('focused');
        e.target.nextElementSibling.classList.add('focused');
      }
    } else if (e.code === 'ArrowUp') {
      if (!e.target.previousElementSibling) {
        return;
      } else {
        e.target.previousElementSibling.focus();
        e.target.classList.remove('focused');
        e.target.previousElementSibling.classList.add('focused');
      }
    } else if (e.code === 'Enter' || e.code === 'NumpadEnter') {
      selectedItems.add(e.target.textContent);
      e.target.classList.add('added');
      updateTags();
    } else if (e.code === 'Delete') {
      if (selectedItems.has(e.target.textContent)) {
        selectedItems.delete(e.target.textContent);
        updateTags();
      }
    }
  }

  const addTypedInput = e => {
    if (e.code === 'ArrowDown') {
      document.querySelector('.suggestions .suggestion').focus()
    } else if (e.code === 'Enter' || e.code === 'NumpadEnter') {
      selectedItems.add(e.target.value.trim());
      const suggestions = document.querySelectorAll('.suggestion');

      suggestions.forEach(suggestion => {
        if (suggestion.textContent === e.target.value) {
          suggestion.classList.add('added')
        }
      })

      updateTags();
    } else {
      return;
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
          <div className='suggestions' id='suggestions' tabIndex='-1'></div>
        </div>
      </div>

      <div className='tags-container' id='tags-container'>
        {tags}
      </div>
    </form>
  )
}

export default Form
