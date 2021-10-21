import React from "react";
import { Link } from "react-router-dom";
import { useQueryClient, useMutation } from "react-query";
import axios from "axios";

export default function SubscriptionCard(props) {

  const queryClient = useQueryClient()

  const deleteHandler = (e) => {
    e.preventDefault()
    mutate({}, { onSuccess: () => {
      queryClient.invalidateQueries('subscriptions')
    }})
  }

  const { mutate } = useMutation(() => {
    return axios.delete(`http://localhost:3001/api/subscriptions/${props.id}`)
  })

  return (
    <>
      <div className="card">
      <Link to={`/subscription/${props.id}`}>
        <h3>{props.name}</h3>
      </Link>
        <p>{props.price}</p>
        <p>{props.frequency}</p>
        <p>{props.description}</p>
        <br/>
        <Link to={`/subscription/${props.id}/edit`}>
          <p>Edit</p>
        </Link>
        <p onClick={(e) => deleteHandler(e)}>Delete</p>
      </div>
    </>
  )
}