import { fetchAuthSession } from 'aws-amplify/auth';
import axios from 'axios';
import { useEffect, useState } from 'react';

export enum Method {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
}

/**
 * Sends a request to the specified URL using the specified HTTP method.
 * @param method - The HTTP method to use for the request.
 * @param url - The URL to send the request to.
 * @param data - The data to send with the request (optional).
 * @returns A Promise that resolves to the response data.
 */
const sendRequest = async (method: Method, url: string = '', data?: unknown) => {
  const { tokens } = await fetchAuthSession();
  const fullURL = `${import.meta.env.VITE_API_FQDN}${url}`;
  const config = {
    headers: {
      Authorization: `Bearer ${tokens!.idToken}`,
    },
  };

  if (method === Method.GET) {
    const response = await axios.get(fullURL, config);
    return response.data;
  } else if (method === Method.POST) {
    const response = await axios.post(fullURL, data, config);
    return response.data;
  } else if (method === Method.PUT) {
    const response = await axios.put(fullURL, data, config);
    return response.data;
  } else if (method === Method.DELETE) {
    const response = await axios.delete(fullURL, config);
    return response.data;
  }
};

/**
 * Custom hook for making API requests.
 *
 * @param method - The HTTP method for the request.
 * @param url - The URL for the request.
 * @param postData - The data to be sent with the request.
 * @returns An object containing the response data, loading state, and error state.
 */
const useAPI = (method: Method, url?: string, postData?: unknown) => {
  const [data, setData] = useState<unknown>();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | unknown>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const result = await sendRequest(method, url, postData);
        setData(result);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url, method, postData]);

  return { data, loading, error };
};

export { sendRequest, useAPI };
