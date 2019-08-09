import React, { Component } from 'react'

export default class index extends Component {
  render() {
    return (
      <div>
        <header>
          Podcasts
        </header>
        <h1>Hola next!</h1>
        <img src="/static/moto.png" alt="moto" />
        <style jsx global>{`
          body {
            background-color: gray;
          }
        `}</style>
        <style jsx>{`
          h1 {
            color: green;
          }

          img {
            max-width: 50%;
            display: block;
            margin: 0 auto;
          }
        `}</style>
        
      </div>
    )
  }
}
