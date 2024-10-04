import React from 'react'
import Head from 'next/head'
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const Layout = ({children, title = "Jobler - Find Jobs"}) => {
  return (
    <div>
      <Head>
        <title>{title}</title>
      </Head>

      <Header/>

      {children}

      <Footer/>
    </div>
  )
}
export default Layout
