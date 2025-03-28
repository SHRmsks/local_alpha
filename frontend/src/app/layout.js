import { GoogleOAuthProvider } from "@react-oauth/google"
import { Suspense } from 'react'

export const metadata = {
    title: "Iperuranium",
    description: "version alpha",
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body><Suspense><GoogleOAuthProvider clientId="70931151165-akujq6qnfukkn66heiuj51lfju7lvnod.apps.googleusercontent.com">{children}</GoogleOAuthProvider></Suspense></body>
        </html>
    );
}
