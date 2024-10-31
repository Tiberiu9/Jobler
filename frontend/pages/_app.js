import "@/styles/globals.css";
import {AuthProvider} from "@/contex/AuthContext";
import {JobProvider} from "@/contex/JobContext";
import Head from "next/head";


export default function App({Component, pageProps}) {
  return (
    <>
      <meta charSet="utf-8"/>
      <meta httpEquiv="X-UA-Compatible" content="IE=edge"/>
      <meta name="viewport" content="width=device-width, initial-scale=1"/>
      <title>
        Jobler
      </title>
      <meta
        name="description"
        content="Jobler is a job portal website."
        key="desc"
      />
      <AuthProvider>
        <JobProvider>
          <Component {...pageProps} />
        </JobProvider>
      </AuthProvider>
    </>
  )
}
