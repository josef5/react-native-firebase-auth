import axios from "axios";

// API key available in Firebase project settings
// https://console.firebase.google.com/project/react-native-expenses-ap-ea168/settings/general

async function authenticate(mode: string, email: string, password: string) {
  const url = `https://identitytoolkit.googleapis.com/v1/accounts:${mode}?key=${process.env.EXPO_PUBLIC_FIREBASE_API_KEY}`;

  const response = await axios.post(url, {
    email,
    password,
    returnSecureToken: true,
  });

  // console.log("response.data :", response.data);
  const token = response.data.idToken;

  return token;
}

export function createUser(email: string, password: string) {
  return authenticate("signUp", email, password);
}

export function loginUser(email: string, password: string) {
  return authenticate("signInWithPassword", email, password);
}
