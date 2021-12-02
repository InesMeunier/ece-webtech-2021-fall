
/** @jsxImportSource @emotion/react */
import {useContext, useEffect} from 'react';
import axios from 'axios';
// Layout
import {Link} from '@mui/material';
// Local
import Context from './Context'

const styles = {
  // root: {
  //   minWidth: '200px',
  // },
  channel: {
    padding: '.2rem .5rem',
    whiteSpace: 'nowrap', 
  }
}

export default function Channels() {
  const {
    oauth,
    channels, setChannels,
    setCurrentChannel
  } = useContext(Context)
  useEffect( () => {
    const fetch = async () => {
      try{
        const {data: channels} = await axios.get('http://localhost:3001/channels', {
          headers: {
            'Authorization': `Bearer ${oauth.access_token}`
          }
        })
        setChannels(channels)
      }catch(err){
        console.error(err)
      }
    }
    fetch()
  }, [oauth, setChannels])
  return (
    <ul style={styles.root}>
      { channels.map( (channel, i) => (
        <li key={i} css={styles.channel}>
          <Link
            href="#"
            onClick={ (e) => {
              e.preventDefault()
              setCurrentChannel(channel.id)
            }}
          >
            {channel.name}
          </Link>
        </li>
      ))}
    </ul>
  );
}
