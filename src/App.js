import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Subscriptions from "./components/Subscriptions";
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
          </ul>
        </nav>

        <Switch>
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