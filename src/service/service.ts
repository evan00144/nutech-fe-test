
export const fetchData = (url: any, options?: any) => {
  const update = { ...options };
  const jwt = JSON.parse(localStorage.getItem('token') as string)?.token;
  update.headers = {
    ...update.headers,
    Accept: "application/json,multipart/form-data",
    "Content-Type": "application/json",
    Authorization: `Bearer ${jwt}`
  };
  update.require='2xx'
  return fetch(url, update);
};
