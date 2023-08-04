import ApolloProviderWrapper from "@/components/ApolloProviderWrapper";
import "@/styles/globals.css";
import { SessionProvider } from "next-auth/react";
import { AppProps } from "next/app";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  // const { session, ...restPageProps } = pageProps;
  return (
    <SessionProvider session={session}>
      {/* <ApolloProviderWrapper> */}
        <Component {...pageProps} />
      {/* </ApolloProviderWrapper> */}
    </SessionProvider>
  );
}
