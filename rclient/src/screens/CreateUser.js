import { useMutation } from "@apollo/client";
import { CREATE_USERS_MUTATION } from "graphql/mutations/user";

const CreateUser = ({ user }) => {
  console.log({ invoker: CreateUser.name });
  const [createUserMutation, { data, error }] = useMutation(
    CREATE_USERS_MUTATION
  );
  if (data) {
    console.log({ invoker: CreateUser.name, data });
  }
  if (error) {
    console.log({ invoker: CreateUser.name, error });
  }
  return (
    <div>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          const elements = event.target.elements;
          const name = elements.name.value;
          const age = elements.age.value;
          createUserMutation({ variables: { name, age: parseInt(age) } });
        }}
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div style={{ marginBottom: 20 }}>
          <label>Enter name : </label>
          <input name="name" defaultValue={user?.name} />
        </div>
        <div style={{ marginBottom: 20 }}>
          <label>Enter age : </label>
          <input name="age" type="number" defaultValue={user?.age} />
        </div>
        <button type="submit">
          {typeof user?.age == "number" ? "Update User" : "Create User"}
        </button>
      </form>
    </div>
  );
};

export default CreateUser;
