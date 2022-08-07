import { ApolloProvider } from "@apollo/client";
import client from "client";
import { useState } from "react";
import CreateOrEditChallenge from "screens/CreateOrEditChallenge";
import CreateOrEditUser from "screens/CreateOrEditUser";
import Root from "screens/Root";
import ViewChallenges from "screens/ViewChallenges";
import ViewUsers from "screens/ViewUsers";

function App() {
  console.log({ invoker: App.name });
  const [user, setUser] = useState();
  return (
    <ApolloProvider client={client}>
      <Root />
      <div
        style={{ display: "flex", justifyContent: "center", fontWeight: "800" }}
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
      <ViewChallenges />
      <CreateOrEditChallenge />
    </ApolloProvider>
  );
}

export default App;
