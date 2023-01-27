import { ApolloProvider } from "@apollo/client";
import client from "client";
import { useState } from "react";
import { BrowserRouter as Router, Link, Route, Routes } from "react-router-dom";
import CreateOrEditChallenge from "screens/CreateOrEditChallenge";
import CreateOrEditUser from "screens/CreateOrEditUser";
import Root from "screens/Root";
import ViewChallenges from "screens/ViewChallenges";
import ViewUsers from "screens/ViewUsers";
import ViewUsersWithVariables from "screens/ViewUsersWithVariables";

function App() {
  console.log({ invoker: App.name });
  const [user, setUser] = useState();
  const [challenge, setChallenge] = useState();
  return (
    <ApolloProvider client={client}>
      <Router>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/variables">Variables</Link>
          </li>
        </ul>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Root />
                {/* <ViewUsersWithVariables /> */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    fontWeight: "800",
                  }}
                >
                  User Component
                </div>
                <ViewUsers setUser={setUser} />
                <CreateOrEditUser setUser={setUser} user={user} />
                <div
                  style={{
                    marginTop: 20,
                    display: "flex",
                    justifyContent: "center",
                    fontWeight: "800",
                  }}
                >
                  Challenge Component
                </div>
                <ViewChallenges setChallenge={setChallenge} />
                <CreateOrEditChallenge
                  setChallenge={setChallenge}
                  challenge={challenge}
                />
              </>
            }
          />
          {/* Query with different variables */}
          <Route path="variables" element={<ViewUsersWithVariables />} />
        </Routes>
      </Router>
    </ApolloProvider>
  );
}

export default App;
