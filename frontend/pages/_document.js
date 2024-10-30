import {Html, Head, Main, NextScript} from "next/document";
import React from "react";
import Script from "next/script";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
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
        <link
          rel="stylesheet"
          href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css"
          integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh"
          crossOrigin="anonymous"
        />
        <Script
          strategy="beforeInteractive"
          src="https://code.jquery.com/jquery-3.5.1.slim.min.js"
        ></Script>
        {/*<Script*/}
        {/*  src="https://kit.fontawesome.com/9edb65c86a.js"*/}
        {/*  crossOrigin="anonymous"*/}
        {/*></Script>*/}
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css"
          integrity="sha384-k6RqeWeci5ZR/Lv4MR0sA0FfDOMkO3Y6qP/5aBzmQSt7ZZoQ6cF/2Hb/cz4x6Y3"
          crossOrigin="anonymous"
        />
        <Script
          strategy="beforeInteractive"
          src="https://cdn.jsdelivr.net/npm/popper.js@1.16.1/dist/umd/popper.min.js"
        ></Script>
        <Script
          strategy="beforeInteractive"
          src="https://cdn.jsdelivr.net/npm/bootstrap@4.4.1/dist/js/bootstrap.min.js"
        ></Script>
      </Head>
      <body className="antialiased">
        <Main/>
        <NextScript/>
      </body>
    </Html>
  );
}
