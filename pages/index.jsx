import { gql, GraphQLClient} from "graphql-request";
import Image from "next/image";
import Link from "next/link";
import Navbar from "../components/Navbar";
import Section from "../components/Section";

import disneyLogo from '../public/disney-button.png'
import marvelLogo from '../public/marvel-button.png'
import natgeoLogo from '../public/natgeo-button.png'
import starwarsLogo from '../public/star-wars-button.png'
import pixarLogo from '../public/pixar.png'
import starLogo from "../public/Picture9.png"


export const getStaticProps = async () => {
  const url = process.env.API_URL
  const graphQLClient = new GraphQLClient(url, {
    headers: {
      "Authorization" : process.env.ACCESS_TOKEN,
    }
  })
  
  const videosQuery = gql`query {
    videos {
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

  const accountQuery = gql`query {
    account(where:{ id:"ckzmi4hjk34q40c520gmi4jnp"}){
      username,
      avatar {
        url
      }
    }
  }`

  const accountData = await graphQLClient.request(accountQuery);
  const account = accountData.account;

  const data = await graphQLClient.request(videosQuery)
  const videos = data.videos

  return {
    props: {
      videos,
      account,
    }
  }
}


const Home = ({ videos, account }) => {
  console.log({ videos })

  const randomVideo = (videos) => {
    return videos[Math.floor(Math.random() * videos.length)];
  }

  const filterVideos = (videos, genre) => {
    return videos.filter((video) => video.tags.includes(genre))
  }

  const unSeenVideos = (videos) => {
    return videos.filter(video => video.seen == false || video.seen == null)
  }


  return (
    <div>
      <Navbar account={account} />
      <div className='app'>
        <div className='main-video'>
          <img src={randomVideo(videos).thumbnail.url} alt={randomVideo(videos).title} />
        </div>
      
        <div className="video-feed">
          <Link href="#disney">
            <div className="franchise">
              <Image src={disneyLogo}/>
            </div>
          </Link>
          <Link href="#pixar">
            <div className="franchise">
              <Image src={pixarLogo}/>
            </div>
          </Link>
          <Link href="#marvel">
            <div className="franchise">
              <Image src={marvelLogo}/>
            </div>
          </Link>
          <Link href="#starwars">
            <div className="franchise">
              <Image src={starwarsLogo}/>
            </div>
          </Link>
          <Link href="#natgeo">
            <div className="franchise">
              <Image src={natgeoLogo}/>
            </div>
          </Link>
          <Link href="#star">
            <div className="franchise">
              <Image src={starLogo}/>
            </div>
          </Link>
        </div>

        <Section genre={"Recommended for you"} videos={unSeenVideos(videos)} />
        <div id="disney">
          <Section genre={"Disney"} videos={filterVideos(videos, "disney")} />
        </div>
        <div id="pixar">
          <Section genre={"Pixar"} videos={filterVideos(videos, "pixar")} />
        </div>
        <div id="marvel">
          <Section genre={"Marvel"} videos={filterVideos(videos, "marvel")} />
        </div>
        <div id="starwars">
          <Section genre={"Star Wars"} videos={filterVideos(videos, "star wars")} />
        </div>
        <div id="natgeo">
          <Section genre={"National Geographic"} videos={filterVideos(videos, "national geographic")} />
        </div>
        <div id="star">
          <Section genre={"Star"} videos={filterVideos(videos, "star")} />
        </div>
      </div>
    </div>
  )
}

export default Home;