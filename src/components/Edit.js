import React, { useEffect, useState } from 'react';
import { useMutation, useQuery } from "react-query";
import { useParams } from 'react-router-dom';
import axios from 'axios';

export default function Edit() {
  const [name, setName] = useState('')
  const [price, setPrice] = useState('')
  const [frequency, setFrequency] = useState('')
  const [description, setDescription] = useState('')

  useEffect(() => {
    if (frequency) {
      document.getElementById(`${frequency}`).checked = true
    }
  })

  const { id } = useParams();

  const setStateHandler = (data) => {
    setName(data.name)
    setPrice(data.price)
    setFrequency(data.frequency)
    setDescription(data.description)
  }
  
  const submitHandler = (e) => {
    e.preventDefault()
    mutation.mutate({ name, price, frequency, description })
  }

  const mutation = useMutation(newSubscription => {
    return axios.put(`http://localhost:3001/api/subscriptions/${id}?action=edit`, newSubscription)
  })

  const fetchSubscription = async () => {
    const res = await axios.get(`http://localhost:3001/api/subscriptions/${id}`);
    return res.data
  }

  useQuery(`getSubscription`, fetchSubscription, {onSuccess: (data) => {setStateHandler(data)}});

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
          Frequency:
          <input 
            type="radio" 
            name="frequency" 
            value="monthly"
            id="monthly"
            onChange={e => setFrequency(e.target.value)}
          />
          <label>Monthly</label>

          <input 
            type="radio"
            name="frequency" 
            value="annual"
            id="annual"
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
        <button type="submit">Add</button> {mutation.isSuccess ? <div>Subscription saved!</div> : null}
      </form>
    </div>
  )
}