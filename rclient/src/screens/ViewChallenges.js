import { useQuery } from "@apollo/client";
import { GET_ALL_CHALLENGES_QUERY } from "graphql/queries/challenge";

const ViewChallenges = ({ setChallenge }) => {
  const { data } = useQuery(GET_ALL_CHALLENGES_QUERY);

  return (
    <div style={{ marginTop: 20, marginBottom: 20 }}>
      {data?.getAllChallenges?.map((challenge) => {
        return (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
            key={challenge?._id}
          >
            <label style={{ marginBottom: 20 }}>
              {challenge._id} , {challenge.name}
            </label>
            <button
              onClick={() => {
                setChallenge(challenge);
              }}
              style={{ marginLeft: 5 }}
            >
              Edit
            </button>
            <button onClick={() => {}} style={{ marginLeft: 5 }}>
              Delete
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default ViewChallenges;
