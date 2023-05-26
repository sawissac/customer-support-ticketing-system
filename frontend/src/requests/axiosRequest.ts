import axios from "axios";

export function getAxios(url: string, token: string, resolve: any, reject: any) {
  axios
    .get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then(function (response) {
      resolve(response.data);
    })
    .catch((reason) => {
      reject(reason);
    });
}
