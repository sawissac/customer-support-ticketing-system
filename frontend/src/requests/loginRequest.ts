import axios from "axios";

export function getLoginData({
  email,
  password,
}: any) {
  return new Promise((resolve, reject) => {
    axios
      .post(
        "http://127.0.0.1:8000/api/auth/login",
        {
          email,
          password,
        }
      )
      .then(function (response) {
        resolve(response.data);
      })
      .catch((reason) => {
        reject(reason);
      });
  });
}
