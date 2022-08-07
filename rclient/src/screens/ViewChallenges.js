import { useMutation, useQuery } from "@apollo/client";
import { DELETE_CHALLENGE_MUTATION } from "graphql/mutations/challenge";
import { GET_ALL_CHALLENGES_QUERY } from "graphql/queries/challenge";

const ViewChallenges = ({ setChallenge }) => {
  const { data } = useQuery(GET_ALL_CHALLENGES_QUERY);

  const [deleteChallengeMutation] = useMutation(DELETE_CHALLENGE_MUTATION);

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
            <button
              onClick={() => {
                deleteChallengeMutation({
                  variables: { challengeId: challenge?._id },
                  update: (cache, { data }) => {
                    const cachedChallenges = cache.readQuery({
                      query: GET_ALL_CHALLENGES_QUERY,
                    })?.getAllChallenges;
                    cache.writeQuery({
                      query: GET_ALL_CHALLENGES_QUERY,
                      data: {
                        getAllChallenges: cachedChallenges?.filter(
                          (cachedChallenge) =>
                            cachedChallenge._id !== challenge?._id
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

export default ViewChallenges;
