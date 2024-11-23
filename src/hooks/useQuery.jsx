import { useContext } from "react";
import QueryContext from "../context/QueryProvider";

const useQuery = () => {
    return useContext(QueryContext);
}

export default useQuery;