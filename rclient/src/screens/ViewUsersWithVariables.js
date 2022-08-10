import { useQuery } from "@apollo/client";
import { GET_ALL_USERS_QUERY } from "graphql/queries/user";

const ViewUsersWithVariables = () => {
  const { data: dataTypeOne } = useQuery(GET_ALL_USERS_QUERY, {
    variables: { ageDivider: 40 },
  });

  const { data: dataTypeTwo } = useQuery(GET_ALL_USERS_QUERY);

  return (
    <div style={{ marginTop: 20, marginBottom: 20 }}>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          fontWeight: "800",
          marginBottom: 20,
        }}
      >
        Filter One
      </div>
      {dataTypeOne?.getAllUsers?.map((user) => {
        return (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              background: "gray",
              marginBottom: 20,
              padding: 5,
            }}
            key={user?._id}
          >
            <label style={{ marginBottom: 20 }}>
              {user._id} , {user.name} , {user.age}
            </label>
          </div>
        );
      })}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          fontWeight: "800",
          marginBottom: 20,
        }}
      >
        Filter Two
      </div>
      {dataTypeTwo?.getAllUsers?.map((user) => {
        return (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              background: "gray",
              marginBottom: 20,
              padding: 5,
            }}
            key={user?._id}
          >
            <label style={{ marginBottom: 20 }}>
              {user._id} , {user.name} , {user.age}
            </label>
          </div>
        );
      })}
    </div>
  );
};

export default ViewUsersWithVariables;
