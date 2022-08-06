import { useQuery } from "@apollo/client";
import { ROOT_QUERY } from "graphql/queries/root";

const Root = () => {
  const { loading, data } = useQuery(ROOT_QUERY);
  if (loading) {
    return <div>loading</div>;
  }
  return <div>{data?.root?.message}</div>;
};

export default Root;
