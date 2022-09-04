import { useEffect, useState } from "react";
import SpringApiUrl from '../api/SpringApiUrl';

export const useFetch = (rota, queryParam) => {
  const [url, setUrl] = useState("");
  const [data, setData] = useState(null);
  const [dataItem, setDataItem] = useState(null);

  const [config, setConfig] = useState(null);
  const [method, setMethod] = useState(null);
  const [callFetch, setCallFetch] = useState(false);

  const [loading, setLoading] = useState(false);

  const [itemId, setItemId] = useState(null);

  const httpConfig = (data, method, id) => {
    if (method === "POST") {
      setConfig({
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      setMethod("POST");
    } else if (method === "GET") {
      setConfig({
        method: "GET",
      });

      setMethod("GET");
      setItemId(id);
    } else if (method === "PUT") {
      console.log(data);
      setConfig({
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      setMethod("PUT");
      setItemId(id);
    } else if (method === "DELETE") {
      setConfig({
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      setMethod("DELETE");
      setItemId(id);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      try {
        if (queryParam !== null)
          setUrl(SpringApiUrl(rota + queryParam));
        else
          setUrl(SpringApiUrl(rota));
        
        const res = await fetch(url);
        const status = await res.status;
        const json = await res.json();
        
        if (status === 200)
          setData(json);
        
        setMethod(null);
      } catch (error) {
        console.log(error.message);
      }

      setLoading(false);
    };
    
    fetchData();
  }, [rota, queryParam, url, callFetch]);
  
  useEffect(() => {
    const httpRequest = async () => {
      setLoading(true);

      try {
        if (method === "POST") {
          let fetchOptions = [SpringApiUrl(rota), config];

          const res = await fetch(...fetchOptions);

          const json = await res.json();

          setDataItem(json);
          setCallFetch(json);
        } else if (method === "GET") {
          const getUrl = `${SpringApiUrl(rota)}/${itemId}`;
          
          let fetchOptions = [getUrl, config];

          const res = await fetch(...fetchOptions);

          const json = await res.json();

          setDataItem(json);
          setCallFetch(json);
        } else if (method === "PUT") {
          const updateUrl = `${SpringApiUrl(rota)}/${itemId}`;

          let fetchOptions = [updateUrl, config];

          const res = await fetch(...fetchOptions);

          const json = await res.json();

          setDataItem(json);
          setCallFetch(json);
        } else if (method === "DELETE") {
          const deleteUrl = `${SpringApiUrl(rota)}/${itemId}`;

          const res = await fetch(deleteUrl, config);

          const json = await res.status;

          setDataItem(null);
          setCallFetch(json);
        }

        setMethod(null);
        setLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    
    httpRequest();
  }, [itemId, method, rota, config]);

  return { data, dataItem, httpConfig, loading };
};
