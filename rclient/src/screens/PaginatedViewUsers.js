import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
import { DELETE_USER_MUTATION } from "graphql/mutations/user";
import { GET_PAGINATED_USERS_QUERY } from "graphql/queries/user";
import { useEffect } from "react";

const PaginatedViewUsers = ({
  setUser,
  currentPage,
  pageSize,
  setPageSize,
  setCurrentPage,
}) => {
  const [getPaginatedUsers, { data, loading, fetchMore }] = useLazyQuery(
    GET_PAGINATED_USERS_QUERY
  );

  const [deleteUserMutation] = useMutation(DELETE_USER_MUTATION);
  const info = data?.getPaginatedUsers?.info;
  const isLastPage =
    info?.total / (info?.page * info?.size) <= 1 ? true : false;
  console.log({ isLastPage, info });

  useEffect(() => {
    if (info) {
      setCurrentPage(info?.page);
      setPageSize(info?.size);
    }
  }, [info]);

  useEffect(() => {
    getPaginatedUsers({
      variables: {
        paginationDto: {
          page: currentPage,
          size: pageSize,
        },
      },
    });
  }, []);

  const onFetchMoreUser = () => {
    fetchMore({
      variables: {
        paginationDto: {
          page: info?.page + 1,
          size: info?.size,
        },
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev;
        const users = [
          ...prev?.getPaginatedUsers?.users,
          ...fetchMoreResult?.getPaginatedUsers?.users,
        ];
        const info = fetchMoreResult?.getPaginatedUsers?.info;
        return {
          ...prev,
          getPaginatedUsers: {
            users,
            info,
          },
        };
      },
    });
  };

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
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <button disabled={isLastPage || loading} onClick={onFetchMoreUser}>
          Load More
        </button>
      </div>
    </div>
  );
};

export default PaginatedViewUsers;
