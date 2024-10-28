import "@/styles/globals.css";
import {AuthProvider} from "@/contex/AuthContext";
import {JobProvider} from "@/contex/JobContext";


export default function App({Component, pageProps}) {
  return (
    <AuthProvider>
      <JobProvider>
        <Component {...pageProps} />
      </JobProvider>
    </AuthProvider>
  )
}
