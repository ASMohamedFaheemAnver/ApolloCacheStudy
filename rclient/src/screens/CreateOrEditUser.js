import { useMutation } from "@apollo/client";
import {
  CREATE_USER_MUTATION,
  UPDATE_USERS_MUTATION,
} from "graphql/mutations/user";
import { GET_ALL_USERS_QUERY } from "graphql/queries/user";

const CreateOrEditUser = ({ user, setUser }) => {
  console.log({ invoker: CreateOrEditUser.name });
  const [createUserMutation, { data, error }] =
    useMutation(CREATE_USER_MUTATION);
  const [updateUserMutation] = useMutation(UPDATE_USERS_MUTATION);
  if (data) {
    console.log({ invoker: CreateOrEditUser.name, data });
  }
  if (error) {
    console.log({ invoker: CreateOrEditUser.name, error });
  }
  return (
    <div>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          const elements = event.target.elements;
          const name = elements.name.value;
          const age = elements.age.value;
          if (typeof user?.age == "number") {
            updateUserMutation({
              variables: {
                updateUserDto: { id: user._id, age: parseInt(age) },
              },
            });
          } else {
            createUserMutation({
              variables: { createUserDto: { name, age: parseInt(age) } },
              update: (cache, { data }) => {
                const cachedUsers = cache.readQuery({
                  query: GET_ALL_USERS_QUERY,
                });
                cache.writeQuery({
                  query: GET_ALL_USERS_QUERY,
                  data: {
                    getAllUsers: [
                      ...cachedUsers?.getAllUsers,
                      data?.createUser,
                    ],
                  },
                  // broadcast: false
                });
              },
            });
          }
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
          <input
            disabled={typeof user?.age == "number"}
            name="name"
            defaultValue={user?.name}
          />
        </div>
        <div style={{ marginBottom: 20 }}>
          <label>Enter age : </label>
          <input name="age" type="number" defaultValue={user?.age} />
        </div>
        <button type="submit">
          {typeof user?.age == "number" ? "Update User" : "Create User"}
        </button>
        <button
          style={{ marginTop: 20 }}
          onClick={() => {
            setUser();
          }}
          type="reset"
        >
          Clear
        </button>
      </form>
    </div>
  );
};

export default CreateOrEditUser;
