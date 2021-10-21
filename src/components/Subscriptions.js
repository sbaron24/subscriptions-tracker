import React from "react";
import { useQuery } from "react-query";
import SubscriptionCard from "./SubscriptionCard";

const fetchSubscriptions = async () => {
  const res = await fetch("http://localhost:3001/api/subscriptions");
  // const res = await fetch("http://swapi.dev/api/planets");
  return res.json();
}

export default function Subscriptions() {
  const { data, status } = useQuery('subscriptions', fetchSubscriptions);

  return (
    <div>
      <h2 className="title">Subscriptions</h2>
      {status === "loading" && (
        <div>Loading subscriptions</div>
      )}
      {status === "error" && (
        <div>Loading error</div>
      )}
      {status === "success" && (
        <div className="sub-index">
          {data.map(subscription => {
            return (
              <SubscriptionCard
                id={subscription.id}
                key={subscription.id}
                name={subscription.name}
                price={subscription.price}
                frequency={subscription.frequency}
                description={subscription.description}
              />
            )
          })}
        </div>
      )}
    </div>
  )
}