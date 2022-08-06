import { ApolloProvider } from "@apollo/client";
import client from "client";
import { useState } from "react";
import CreateUser from "screens/CreateUser";
import Root from "screens/Root";
import ViewUsers from "screens/ViewUsers";

function App() {
  console.log({ invoker: App.name });
  const [user, setUser] = useState();
  return (
    <ApolloProvider client={client}>
      <Root />
      <ViewUsers setUser={setUser} />
      <CreateUser user={user} />
    </ApolloProvider>
  );
}

export default App;
