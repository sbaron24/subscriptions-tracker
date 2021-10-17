import React, { useState } from 'react';
import { useMutation } from "react-query";
import axios from 'axios';

export default function New() {
  const [name, setName] = useState('')
  const [price, setPrice] = useState('')
  const [frequency, setFrequency] = useState('')
  const [description, setDescription] = useState('')
  
  const submitHandler = (e) => {
    e.preventDefault()
    mutate({ name, price, frequency, description }, {
      onSuccess: (data) => {
        console.log(data)
      }
    })
  }

  const { mutate } = useMutation(newSubscription => {
    return axios.post("http://localhost:3001/api/subscriptions", newSubscription)
  })

  return (
    <div>
      <form onSubmit={(e) => submitHandler(e)}>
        <div>
          <label>
            Name:
            <input 
              type="text" 
              name="name" 
              value={name}
              onChange={e => setName(e.target.value)}
            />
          </label>
        </div>

        <div>
          <label>
            Price:
            <input 
              type="text" 
              name="price" 
              value={price}
              onChange={e => setPrice(e.target.value)}
            />
          </label>
        </div>

        <div>
          Frequecncy:
          <input 
            type="radio" 
            name="fav_language" 
            value="monthly"
            onChange={e => setFrequency(e.target.value)}
          />
          <label>Monthly</label>

          <input 
            type="radio" 
            name="fav_language" 
            value="annual"
            onChange={e => setFrequency(e.target.value)}
          />
          <label>Annual</label>
        </div>

        <div>
          <label>
            Description:
            <input 
              type="text" 
              name="description" 
              value={description}
              onChange={e => setDescription(e.target.value)}
            />
          </label>
        </div>
        <button type="submit">Add!</button>
      </form>
    </div>
  )
}