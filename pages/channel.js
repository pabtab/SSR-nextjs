import React, { Component } from 'react'
import Link from 'next/link'
import PodcastListWithClick from '../components/PodcastListWithClick';
import Layout from '../components/Layout';
import Error from './_error'
import PodcastPlayer from '../components/PodcastPlayer';

export default class channel extends Component {

  constructor(props) {
    super(props)
  
    this.state = {
       openPodcast: null
    }
  }
  

  static async getInitialProps({query, res}) {
    try {
      let idChannel = query.id

    let [reqChannel, reqAudio, reqSeries] = await Promise.all([
      fetch(`https://api.audioboom.com/channels/${idChannel}`),
      fetch(`https://api.audioboom.com/channels/${idChannel}/audio_clips`),
      fetch(`https://api.audioboom.com/channels/${idChannel}/child_channels`)
    ])

    if (reqChannel.status >= 400) {
      res.statusCode = reqChannel.status
      return {
        channel: null,
        audioClips: null,
        series: null,
        statusCode: 404
      }
    }

    let dataChannel = await reqChannel.json();
    let channel = dataChannel.body.channel

    let dataAudios = await reqAudio.json();
    let audioClips = dataAudios.body.audio_clips

    let dataSeries = await reqSeries.json();
    let series = dataSeries.body.channels

    return { channel, audioClips, series, statusCode: 200 }
    } catch (error) {
    return {
      channel: null,
      audioClips: null,
      series: null,
      statusCode: 503
    }
      
    }
  }

  openPodcast = (event, podcast) => {
    event.preventDefault()
    this.setState({ openPodcast: podcast })
  }

  closePodcast = (event) => {
    event.preventDefault();
    this.setState({ openPodcast: null })
  }

  render() {
    const { channel, audioClips, series, statusCode } = this.props
    const { openPodcast } = this.state
    

    if (statusCode !== 200) {
      return <Error statusCode={statusCode} />
    }

    return (
      <Layout title={channel.title}>
        <div className="banner" style={{backgroundImage: `url(${channel.urls.banner_image.original})`}}>
          
          { openPodcast 
            && <div>
              <PodcastPlayer
                clip={openPodcast}
                onClose={this.closePodcast}
              />
            </div>
          }

          <h1>{channel.title}</h1>

          <h2>Series</h2>
          <PodcastListWithClick podcasts={series} onClickPodcast={this.openPodcast}/>

          <h2>Ultimos podcasts</h2>
          <PodcastListWithClick podcasts={audioClips} onClickPodcast={this.openPodcast}/>
        </div>

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

          .modal {
            position: fixed;
            top: 0;
            left: 0;
            bottom: 0;
            right: 0;
            z-index: 999;
          }
        `}</style>
      </Layout>

      
    )
  }
}
