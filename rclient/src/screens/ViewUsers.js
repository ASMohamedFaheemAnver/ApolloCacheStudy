import { useMutation, useQuery } from "@apollo/client";
import { DELETE_USER_MUTATION } from "graphql/mutations/user";
import { GET_ALL_USERS_QUERY } from "graphql/queries/user";

const ViewUsers = ({ setUser }) => {
  const { data } = useQuery(GET_ALL_USERS_QUERY);

  const [deleteUserMutation] = useMutation(DELETE_USER_MUTATION);

  return (
    <div style={{ marginTop: 20, marginBottom: 20 }}>
      {data?.getAllUsers?.map((user) => {
        return (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
            key={user?._id}
          >
            <label style={{ marginBottom: 20 }}>
              {user._id} , {user.name} , {user.age}
            </label>
            <button
              onClick={() => {
                setUser(user);
              }}
              style={{ marginLeft: 5 }}
            >
              Edit
            </button>
            <button
              onClick={() => {
                deleteUserMutation({
                  variables: { userId: user?._id },
                  update: (cache, { data }) => {
                    const cachedUsers = cache.readQuery({
                      query: GET_ALL_USERS_QUERY,
                    })?.getAllUsers;
                    cache.writeQuery({
                      query: GET_ALL_USERS_QUERY,
                      data: {
                        getAllUsers: cachedUsers?.filter(
                          (cachedUser) => cachedUser._id !== user?._id
                        ),
                      },
                    });
                  },
                });
              }}
              style={{ marginLeft: 5 }}
            >
              Delete
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default ViewUsers;
