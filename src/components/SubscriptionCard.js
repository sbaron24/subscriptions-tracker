import React from "react";

export default function SubscriptionCard(props) {

  return (
    <div className="card">
      <h3>{props.name}</h3>
      <p>{props.price}</p>
      <p>{props.frequency}</p>
      <p>{props.description}</p>
      <br/>
    </div>
  )
}