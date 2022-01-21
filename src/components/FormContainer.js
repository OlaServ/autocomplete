import React from 'react'
import '../styles/FormContainer.css'
import Form from './Form'

import Background from '../assets/woman.jpg'

function FormContainer () {
  return (
    <div className='container'>
      <img src={Background} alt='bg' className='bg-img' />
      <div className='container-left'></div>
      <div className='container-right'>
        <Form />
      </div>
    </div>
  )
}

export default FormContainer
