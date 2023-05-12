import axios from "axios";

export function getUserData({ email, password }: any) {
  return new Promise((resolve, reject) => {
    axios
      .post("http://127.0.0.1:8000/api/auth/login", null, {
        params: {
          email,
          password,
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
