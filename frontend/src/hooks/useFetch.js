import axios from "axios";
import { useEffect, useState } from "react";

export default function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setloading] = useState(false);
  const [error, seterror] = useState(null);

  const fetchdata = async () => {
    try {
      setloading(true);
      const response = await axios.get(url);
      if (response) {
        setData(response);
      } else {
        seterror({ message: "no response from server" });
      }
      setloading(false);
    } catch (err) {
      seterror(error);
      setloading(false);
    }
  };
  useEffect(() => {
    fetchdata();
  }, [url]);

  return { data, setData, loading, error };
}
