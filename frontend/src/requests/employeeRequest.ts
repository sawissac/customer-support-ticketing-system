import axios from "axios";

export function getAllEmployee({ token }: any) {
  return new Promise((resolve, reject) => {
    axios
      .post(`http://127.0.0.1:8000/api/user/employee`, {
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
  });
}
