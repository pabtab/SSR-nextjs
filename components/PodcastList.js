import React, { Component } from 'react'
import Link from 'next/link';

export default class PodcastList extends Component {
  render() {
    const { podcasts } = this.props
    return (
      <div>
        {
          podcasts.map(clip => (
            <Link href={`/podcast?id=${clip.id}`}>
              <a>{clip.title}</a>
            </Link>
          ))
        }
      </div>
    )
  }
}
