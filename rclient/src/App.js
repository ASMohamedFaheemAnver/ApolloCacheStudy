import { ApolloProvider } from "@apollo/client";
import client from "client";
import { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import CreateOrEditPaginatedUser from "screens/CreateOrEditPaginatedUser";
import PaginatedViewUsers from "screens/PaginatedViewUsers";
import Root from "screens/Root";

function App() {
  const [user, setUser] = useState();
  const [pageSize, setPageSize] = useState(2);
  const [currentPage, setCurrentPage] = useState(1);
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
                <PaginatedViewUsers
                  setUser={setUser}
                  currentPage={currentPage}
                  pageSize={pageSize}
                  setPageSize={setPageSize}
                  setCurrentPage={setCurrentPage}
                />
                <CreateOrEditPaginatedUser
                  currentPage={currentPage}
                  pageSize={pageSize}
                  setUser={setUser}
                  user={user}
                />
              </>
            }
          />
        </Routes>
      </Router>
    </ApolloProvider>
  );
}

export default App;
