"use client";
import { ApolloProvider } from "@apollo/client";
import { Inter } from "next/font/google";
import Theme from "./theme-provider";
import AppProvider from "./app-provider";
import "./css/style.css";
import apolloClient from "@/lib/apollo-client";
import { AuthProvider } from "@/lib/auth-context";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

// export const metadata = {
//   title: "Create Next App",
//   description: "Generated by create next app",
// };

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable}`} suppressHydrationWarning>
      <body className="font-inter antialiased bg-gray-100 dark:bg-gray-900 text-gray-600 dark:text-gray-400">
        <Theme>
          <AppProvider>
            <ApolloProvider client={apolloClient}>
              <AuthProvider>{children}</AuthProvider>
            </ApolloProvider>
          </AppProvider>
        </Theme>
      </body>
    </html>
  );
}
