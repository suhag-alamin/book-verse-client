import jwtDecode from "jwt-decode";

interface DecodedAccessToken {
  _id: string;
  email: string;
  exp: number; // Expiration time (Unix timestamp)
}

const decodeAccessToken = (accessToken: string): DecodedAccessToken | null => {
  try {
    const decodedToken: DecodedAccessToken = jwtDecode(accessToken);
    return decodedToken;
  } catch (error) {
    // If the token cannot be decoded, it might be invalid or tampered
    // Handle the error or return null, depending on your use case
    console.log(error);
    return null;
  }
};

export default decodeAccessToken;
