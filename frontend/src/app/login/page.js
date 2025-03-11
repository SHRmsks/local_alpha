"use client";

import LoginPage from "@/components/login/login";
import { GoogleOAuthProvider } from "@react-oauth/google";
export default function Login() {

  return (
    <GoogleOAuthProvider clientId="43488699135-6muejl3ggsu962hcav4qc1shuo3jesat.apps.googleusercontent.com">
      <LoginPage />
    </GoogleOAuthProvider>
  );
}
