import { ApolloProvider } from "@apollo/client";
import client from "client";
import { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import CreateOrEditUser from "screens/CreateOrEditUser";
import Root from "screens/Root";
import ViewUsers from "screens/ViewUsers";

function App() {
  const [user, setUser] = useState();
  return (
    <ApolloProvider client={client}>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Root />
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    fontWeight: "800",
                  }}
                >
                  Paginated user Component
                </div>
                <ViewUsers setUser={setUser} />
                <CreateOrEditUser setUser={setUser} user={user} />
              </>
            }
          />
        </Routes>
      </Router>
    </ApolloProvider>
  );
}

export default App;
