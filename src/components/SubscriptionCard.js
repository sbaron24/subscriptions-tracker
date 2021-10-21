import React from "react";
import { Link } from "react-router-dom";

export default function SubscriptionCard(props) {
  
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
      </div>
    </>
  )
}