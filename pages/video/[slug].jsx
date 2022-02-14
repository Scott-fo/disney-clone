import React from 'react';
import { gql, GraphQLClient } from "graphql-request";

export const getServerSideProps = async (pageContext) => {
    const url = process.env.API_URL;
    const graphQLClient = new GraphQLClient(url, {
        headers: {
            "Authorization" : process.env.ACCESS_TOKEN
        }
    })

    const pageSlug = pageContext.query.slug;

    const videosQuery = gql`query($pageSlug: String!) {
        video(where: {
            slug: $pageSlug
        }) {
          id,
          title,
          description,
          seen,
          slug,
          tags,
          thumbnail {
            url
          },
          mp4 {
            url
          }
        }
      }`

    
    
    const variables = {
        pageSlug
    }

    const data = await graphQLClient.request(videosQuery, variables)
    const video = data.video

    return {
        props: {
            video
        }
    }
}

const changeToSeen = async (slug) => {
    await fetch("/api/changeToSeen", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ slug })
    })
}

const Video = ({ video }) => {
    console.log(video)
    const [watching, setWatching] = React.useState(false);
  return (
    <div>
        {!watching && (
            <div>
                <img className='video-img' src={video.thumbnail.url} alt={video.title} />
                <div className='info'>
                    <p>{video.tags}</p>
                    <p>{video.description}</p>
                    <a href="/"><p>Home</p></a>
                    <button 
                        className='play-btn'
                        onClick={() => {
                            changeToSeen(video.slug)
                            watching ? setWatching(false) : setWatching(true)
                        }}
                    >
                        Play
                    </button>
                </div>
            </div>
        )}
        {watching && (
            <video width="100%" controls>
                <source src={video.mp4.url} type="video/mp4" />
            </video>
        )}
        <div className='info-footer' onClick={() => watching ? setWatching(false) : null}>

        </div>
    </div>
  )
}

export default Video