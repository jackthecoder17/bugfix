import "./globals.css";
import { AuthProvider } from "./(dashboard)/contexts/authContext";
import { UserProvider } from "./(dashboard)/contexts/UserProvider";
import GlobalToastProvider from "./contexts/GlobalToastProvider";
import ReactQueryProvider from "./contexts/query-provider";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`w-screen h-screen`}>
        <AuthProvider>
          <UserProvider>
            <GlobalToastProvider>
              <ReactQueryProvider>{children}</ReactQueryProvider>
            </GlobalToastProvider>
          </UserProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
