import Image from "next/image";
import localFont from "next/font/local";
import Layout from "@/components/layout/Layout";
import Home from "@/components/Home";
import axios from "axios";
import process from "next/dist/build/webpack/loaders/resolve-url-loader/lib/postcss";


const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function Index({data}) {
  // console.log(data)
  return (
    <Layout>

      <Home data={data}/>

    </Layout>
  );
}

export async function getServerSideProps({query}) {
  const keyword = query.keyword || ""
  const location = query.location || ""
  const page = query.page || 1

  const queryStr = `?keyword=${keyword}&location=${location}&page=${page}`

  const res = await axios.get(`${process.env.API_URL}/api/jobs/${queryStr}`)
  const data = res.data

  return { props: { data } }
}
