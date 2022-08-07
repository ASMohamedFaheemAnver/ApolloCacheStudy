import { useMutation } from "@apollo/client";
import {
  CREATE_USERS_MUTATION,
  UPDATE_USERS_MUTATION,
} from "graphql/mutations/user";

const CreateOrEditChallenge = ({ challenge, setChallenge }) => {
  console.log({ invoker: CreateOrEditChallenge.name });

  const [createUserMutation, { data, error }] = useMutation(
    CREATE_USERS_MUTATION
  );
  const [updateUserMutation] = useMutation(UPDATE_USERS_MUTATION);
  if (data) {
    console.log({ invoker: CreateOrEditChallenge.name, data });
  }

  return (
    <div style={{ marginTop: 20 }}>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          const elements = event.target.elements;
          const name = elements.name.value;
          const participants = elements.participants.value;
          if (typeof challenge?.name == "string") {
            // updateUserMutation({
            //   variables: {
            //     updateUserDto: { id: user._id, age: parseInt(age) },
            //   },
            // });
          } else {
            // createUserMutation({
            //   variables: { createUserDto: { name, age: parseInt(age) } },
            //   update: (cache, { data }) => {
            //     const cachedUsers = cache.readQuery({
            //       query: GET_ALL_USERS_QUERY,
            //     });
            //     cache.writeQuery({
            //       query: GET_ALL_USERS_QUERY,
            //       data: {
            //         getAllUsers: [
            //           data?.createUser,
            //           ...cachedUsers?.getAllUsers,
            //         ],
            //       },
            //     });
            //   },
            // });
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
          <label>Enter challenge name : </label>
          <input
            disabled={typeof challenge?.participants == "number"}
            name="name"
            defaultValue={challenge?.name}
          />
        </div>
        <div style={{ marginBottom: 20 }}>
          <label>Enter participants ids separated by comma : </label>
          <input name="participants" defaultValue={challenge?.participants} />
        </div>
        <button type="submit">
          {typeof challenge?.name == "number"
            ? "Update Challenge"
            : "Create Challenge"}
        </button>
        <button
          style={{ marginTop: 20 }}
          onClick={() => {
            setChallenge();
          }}
          type="reset"
        >
          Clear
        </button>
      </form>
    </div>
  );
};

export default CreateOrEditChallenge;
