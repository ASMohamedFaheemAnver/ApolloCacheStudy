import { useMutation, useQuery } from "@apollo/client";
import { DELETE_USER_MUTATION } from "graphql/mutations/user";
import { GET_PAGINATED_USERS_QUERY } from "graphql/queries/user";
import { useState } from "react";

const PaginatedViewUsers = ({ setUser, currentPage, pageSize }) => {
  const { data } = useQuery(GET_PAGINATED_USERS_QUERY, {
    variables: {
      paginationDto: {
        page: currentPage,
        size: pageSize,
      },
    },
  });

  const [deleteUserMutation] = useMutation(DELETE_USER_MUTATION);

  return (
    <div style={{ marginTop: 20, marginBottom: 20 }}>
      {data?.getPaginatedUsers?.users?.map((user) => {
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
                    const cachedPaginatedUsers = cache.readQuery({
                      query: GET_PAGINATED_USERS_QUERY,
                      variables: {
                        paginationDto: {
                          page: currentPage,
                          size: pageSize,
                        },
                      },
                    })?.getPaginatedUsers;
                    cache.writeQuery({
                      query: GET_PAGINATED_USERS_QUERY,
                      variables: {
                        paginationDto: {
                          page: currentPage,
                          size: pageSize,
                        },
                      },
                      data: {
                        getPaginatedUsers: {
                          ...cachedPaginatedUsers,
                          users: cachedPaginatedUsers?.users.filter(
                            (cachedUser) => cachedUser._id !== user?._id
                          ),
                        },
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

export default PaginatedViewUsers;
