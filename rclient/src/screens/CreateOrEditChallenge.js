import { useMutation } from "@apollo/client";
import {
    CREATE_CHALLENGE_MUTATION,
    UPDATE_CHALLENGE_MUTATION
} from "graphql/mutations/challenge";
import { GET_ALL_CHALLENGES_QUERY } from "graphql/queries/challenge";
import { useEffect } from "react";

const CreateOrEditChallenge = ({ challenge, setChallenge }) => {
  useEffect(() => {
    console.log({ invoker: CreateOrEditChallenge.name });
  }, []);

  const [createChallengeMutation, { data }] = useMutation(
    CREATE_CHALLENGE_MUTATION
  );
  const [updateChallengeMutation] = useMutation(UPDATE_CHALLENGE_MUTATION);

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
            updateChallengeMutation({
              variables: {
                updateChallengeDto: {
                  id: challenge._id,
                  name,
                  participants: participants
                    .split(",")
                    .filter((participant) => participant),
                },
              },
              update: (cache, { data }) => {
                const cachedChallenges = cache.readQuery({
                  query: GET_ALL_CHALLENGES_QUERY,
                });
                cache.writeQuery({
                  query: GET_ALL_CHALLENGES_QUERY,
                  data: {
                    getAllChallenges: [
                      ...cachedChallenges?.getAllChallenges.map(
                        (cachedChallenge) => {
                          if (
                            cachedChallenge._id === data.updateChallenge._id
                          ) {
                            return data.updateChallenge;
                          }
                          return cachedChallenge;
                        }
                      ),
                    ],
                  },
                });
              },
            });
          } else {
            createChallengeMutation({
              variables: { createChallengeDto: { name } },
              update: (cache, { data }) => {
                const cachedChallenges = cache.readQuery({
                  query: GET_ALL_CHALLENGES_QUERY,
                });
                cache.writeQuery({
                  query: GET_ALL_CHALLENGES_QUERY,
                  data: {
                    getAllChallenges: [
                      ...cachedChallenges?.getAllChallenges,
                      data?.createChallenge,
                    ],
                  },
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
          <label>Enter challenge name : </label>
          <input name="name" defaultValue={challenge?.name} />
        </div>
        <div style={{ marginBottom: 20 }}>
          <label>Enter participants ids separated by comma : </label>
          <input
            disabled={typeof challenge?.name !== "string"}
            name="participants"
            defaultValue={challenge?.participants
              .map((participant) => participant._id)
              .join(",")}
          />
        </div>
        <button type="submit">
          {typeof challenge?.name === "string"
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
