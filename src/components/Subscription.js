import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import axios from 'axios';

export default function Subscription() {
  const { id } = useParams();

  const fetchSubscription = async () => {
    const res = await axios.get(`http://localhost:3001/api/subscriptions/${id}`);
    return res.data
  }

  const { data } = useQuery(
    `getSubscription`, 
    fetchSubscription);

  return (
    <div>
      <div>
        {data && 
          <div>
            <div>{data.name}</div>
            <div>{data.price}</div>
            <div>{data.frequency}</div>
            <div>{data.description}</div>
          </div>
        }
      </div>
    </div>
  )
}