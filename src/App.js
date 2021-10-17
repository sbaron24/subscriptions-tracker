import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Subscriptions from "./components/Subscriptions";
import New from "./components/New"
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

        <Switch>
          <Route path="/new">
            <QueryClientProvider client={queryClient}>
              <New />
            </QueryClientProvider>
          </Route>
          <Route path="/">
            <QueryClientProvider client={queryClient}>
              <Subscriptions />
            </QueryClientProvider>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}