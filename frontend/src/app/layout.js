import { GoogleOAuthProvider } from "@react-oauth/google"
import { Suspense } from 'react'

export const metadata = {
    title: "Iperuranium",
    description: "version alpha",
};

export default function RootLayout({ children }) {
    return (
      <html lang="en">
        <body>
          <Suspense>
            <GoogleOAuthProvider clientId="43488699135-6muejl3ggsu962hcav4qc1shuo3jesat.apps.googleusercontent.com">
              {children}
            </GoogleOAuthProvider>
          </Suspense>
        </body>
      </html>
    );
}
