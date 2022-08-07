import { useQuery } from "@apollo/client";
import { GET_ALL_USERS_QUERY } from "graphql/queries/user";

const ViewChallenges = ({ setChallenge }) => {
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
            key={user?._id}
          >
            <label style={{ marginBottom: 20 }}>
              {user._id} , {user.name} , {user.age}
            </label>
            <button
              onClick={() => {
                setChallenge(user);
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

export default ViewChallenges;
