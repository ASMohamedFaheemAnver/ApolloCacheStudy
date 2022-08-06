import { useQuery } from "@apollo/client";
import { GET_ALL_USERS_QUERY } from "graphql/queries/user";

const ViewUsers = ({ setUser }) => {
  const { data } = useQuery(GET_ALL_USERS_QUERY);

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
            key={user?.name}
          >
            <label style={{ marginBottom: 20 }}>
              {user.name}, {user.age}
            </label>
            <button
              onClick={() => {
                setUser(user);
              }}
              style={{ marginLeft: 5 }}
            >
              Edit
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default ViewUsers;