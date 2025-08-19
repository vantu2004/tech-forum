import { useGoogleLogin } from "@react-oauth/google";

const useGoogleAuth = () => {
  const login = useGoogleLogin({
    onSuccess: (tokenResponse) => console.log(tokenResponse),
    onError: (err) => console.error("Google OAuth Error:", err),
  });

  return login;
};

export default useGoogleAuth;
