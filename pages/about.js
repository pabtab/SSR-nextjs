import React, { Component } from 'react'

export default class about extends Component {
  render() {
    return (
      <div>
        <h2>About</h2>
        <p>
          Pagina Server Side Render created by pabtab
        </p>
        <img src="/static/about.png" alt="about my webpage" />
        <style jsx>{`
          div {
            text-align: center;
          }
          h2 {
            color: green;
          }  

          img {
            width: 50%;
          }
        `}</style>
      </div>
    )
  }
}
