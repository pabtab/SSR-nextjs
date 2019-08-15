import React, { Component } from 'react'
import Link from 'next/link';
import Head from 'next/head';

export default class Layout extends Component {
  render() {
    const { children, title } = this.props
    return (
      <div>
        <Head>
          <title>{title}</title>
        </Head>
        <header>
          <Link href="/">
            <a>Podcasts</a>
          </Link>
        </header>

        {children}

        <style jsx>{`
          header {
            text-align: center;
            color: #fff;
            background: #8756ca;
            padding: 15px;
          }

          header a {
            color: #fff;
          }
        `}</style>

        <style jsx global>{`
          body {
            margin: 0;
            font-family: system-ui;
            background: white;
          }
        `}</style>
      </div>
    )
  }
}