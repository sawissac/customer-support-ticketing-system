import axios from "axios";

export function requestAxiosWithToken(url: string, token: string) {
  return async () => {
    const res = await axios
      .get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        return response.data;
      });
    return res;
  };
}
