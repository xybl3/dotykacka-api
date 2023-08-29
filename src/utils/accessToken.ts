import axios, { AxiosError } from "axios";
import { accessTokenURL } from "../constants";

async function getAccessToken(
  cloudId: number,
  refreshToken: string
): Promise<string> {
  try {
    const request = await axios.post(
      accessTokenURL,
      {
        _cloudId: cloudId,
      },
      {
        headers: {
          Authorization: `User ${refreshToken}`,
        },
      }
    );

    return request.data.accessToken;
  } catch (error) {
    // console.log(error);
    throw new Error(
      `Error fetching access token. Try checking your refreshToken. and cloudId ${error}`
    );
  }
}

export { getAccessToken };

// getAccessToken(356274219, "26c57afacdda9d141d1217567e9bc235").then((res) =>
//   console.log(res)
// );
