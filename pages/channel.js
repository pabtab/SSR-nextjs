import React, { Component } from 'react'
import Link from 'next/link'


export default class channel extends Component {

  static async getInitialProps({query}) {
    let idChannel = query.id

    let [reqChannel, reqAudio, reqSeries] = await Promise.all([
      fetch(`https://api.audioboom.com/channels/${idChannel}`),
      fetch(`https://api.audioboom.com/channels/${idChannel}/audio_clips`),
      fetch(`https://api.audioboom.com/channels/${idChannel}/child_channels`)
    ])

    let dataChannel = await reqChannel.json();
    let channel = dataChannel.body.channel

    let dataAudios = await reqAudio.json();
    let audioClips = dataAudios.body.audio_clips

    let dataSeries = await reqSeries.json();
    let series = dataSeries.body.channels

    return { channel, audioClips, series }
  }

  render() {
    const { channel, audioClips, series } = this.props

    return (
      <div>
        <header>Podcast</header>
        <h1>{channel.title}</h1>

        <h2>Series</h2>
        {
          series.map(serie => (
            <Link href={`/podcast?id=${channel.id}`}>
              <a>{serie.title}</a>
            </Link>
          ))
        }
        <h2>Ultimos podcasts</h2>
        {
          audioClips.map(clip => (
            <Link href={`/podcast?id=${clip.id}`}>
              <a>{clip.title}</a>
            </Link>
          ))
        }
        <style jsx>{`
          header {
            text-align: center;
            color: #fff;
            background: #8756ca;
            padding: 15px;
          }

          .channels {
            display: grid;
            grid-gap: 15px;
            padding: 15px;
            grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
          }
          a.channel {
            display: block;
            margin-bottom: 0.5em;
            color: #333;
            text-decoration: none;
          }
          .channel img {
            border-radius: 3px;
            box-shadow: 0px 2px 6px rgba(0,0,0,0.15);
            width: 100%;
          }
          h1 {
            padding: 15px;
            font-weight: 600;
          }
          h2 {
            padding: 5px;
            font-size: 0.9em;
            font-weight: 600;
            margin: 0;
            text-align: center;
          }
        `}</style>
      </div>

      
    )
  }
}
