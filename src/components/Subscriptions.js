import React from "react";
import { useQuery } from "react-query";

const fetchSubscriptions = async () => {
  const res = await fetch("http://swapi.dev/api/planets");
  return res.json();
}

const Subscriptions = () => {
  const { data, status } = useQuery('subscriptions', fetchSubscriptions);
  console.log(data)

  return (
    <div>
      <h2>Subscriptions</h2>
    </div>
  )
}

export default Subscriptions;