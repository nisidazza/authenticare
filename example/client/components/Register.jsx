import React, { useState } from 'react'
import authcare from 'authenticare/client'

import { GridForm, ColOne, ColTwo, Button } from './Styled'

const { register, isAuthenticated } = authcare.client({
  baseUrl: process.env.BASE_API_URL // see .env and webpack.config.js
})

export default function Register (props) {
  const [form, setForm] = useState({
    username: '',
    password: ''
  })

  const handleChange = e => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  const handleClick = () => {
    register({
      username: form.username,
      password: form.password
    }).then((token) => {
      if (isAuthenticated()) {
        props.history.push('/')
      }
    })
  }

  return (
    <React.Fragment>
      <h2>Register</h2>
      <GridForm>
        <ColOne>Username:</ColOne>
        <ColTwo name='username'
          value={form.username}
          onChange={handleChange} />

        <ColOne>Password:</ColOne>
        <ColTwo name='password' type='password'
          value={form.password}
          onChange={handleChange} />

        <Button type='button' onClick={handleClick}>Register</Button>
      </GridForm>
    </React.Fragment>
  )
}
