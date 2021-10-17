import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Subscriptions from "./components/Subscriptions";
import New from "./components/New"
import Subscription from "./components/Subscription"
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient()

export default function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul className="navbar">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/new">Add Subscription</Link>
            </li>
          </ul>
        </nav>
        <QueryClientProvider client={queryClient}>
          <Switch>
            <Route path="/new" children={<New />} />
            <Route path="/subscription/:id" children={<Subscription />} />
            <Route path="/" children={<Subscriptions />} />
          </Switch>
        </QueryClientProvider>

      </div>
    </Router>
  );
}