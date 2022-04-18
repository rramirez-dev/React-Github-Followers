// useFollowersSearch Hook
import { useEffect, useState } from "react";
import axios from "axios";

export default function useFollowersSearch(query, page) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [followers, setFollowers] = useState([]);
  const [hasMore, setHasMore] = useState(false);

  useEffect(() => {
    // Clear the followers array when a new query is set
    setFollowers([]);
  }, [query]);

  useEffect(() => {
    setLoading(true);
    setError(false);

    let cancel;
    axios({
      method: "GET",
      url: `https://api.github.com/users/${query}/followers?page=${page}`,
      params: { page: page },
      cancelToken: new axios.CancelToken((c) => (cancel = c)),
    })
      .then((res) => {
        setFollowers((prevFollowers) => {
          return [
            ...new Set([
              ...prevFollowers,
              ...res.data.map((follower) => follower),
            ]),
          ];
        });
        setHasMore(res.data.length > 0);
        setLoading(false);
      })
      .catch((e) => {
        if (axios.isCancel) return;
        setError(true);
      });
    return () => cancel(); // cancel request each time useEffect is called
    // run side effect everytime our query or page number changes
  }, [query, page]);

  // Return all the state from the hook
  return { loading, error, followers, hasMore };
}
