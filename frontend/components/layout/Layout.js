import React from 'react'
import Head from 'next/head'
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

import  { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Layout = ({children, title = "Find Jobs"}) => {
  return (
    <div>
      <Head>
        {/*<title>{title} - Jobler</title>*/}
      </Head>


      <Header/>
      <ToastContainer position="bottom-center"/>

      {children}

      <Footer/>
    </div>
  )
}
export default Layout
