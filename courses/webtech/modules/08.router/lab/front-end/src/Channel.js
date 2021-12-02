
/** @jsxImportSource @emotion/react */
import {useContext, useRef, useState} from 'react';
import axios from 'axios';
// Layout
import { useTheme } from '@mui/styles';
import {Fab} from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
// Local
import Form from './channel/Form'
import List from './channel/List'
import Context from './Context'

const useStyles = (theme) => ({
  root: {
    height: '100%',
    flex: '1 1 auto',
    display: 'flex',
    flexDirection: 'column',
    background: 'rgba(0,0,0,.2)',
    position: 'relative',
  },
  fab: {
    position: 'absolute !important',
    top: theme.spacing(2),
    right: theme.spacing(2),
  },
  fabDisabled: {
    display: 'none !important',
  }
})

export default function Channel() {
  const { currentChannel } = useContext(Context)
  const styles = useStyles(useTheme())
  const listRef = useRef()
  const channelId = useRef()
  const [messages, setMessages] = useState([])
  const [scrollDown, setScrollDown] = useState(false)
  const addMessage = (message) => {
    fetchMessages()
  }
  const fetchMessages = async () => {
    setMessages([])
    const {data: messages} = await axios.get(`http://localhost:3001/channels/${currentChannel.id}/messages`)
    setMessages(messages)
    if(listRef.current){
      listRef.current.scroll()
    }
  }
  if(channelId.current !== currentChannel.id){
    fetchMessages()
    channelId.current = currentChannel.id
  }
  const onScrollDown = (scrollDown) => {
    setScrollDown(scrollDown)
  }
  const onClickScroll = () => {
    listRef.current.scroll()
  }
  return (
    <div css={styles.root}>
      <List
        channel={currentChannel}
        messages={messages}
        onScrollDown={onScrollDown}
        ref={listRef}
      />
      <Form addMessage={addMessage} channel={currentChannel} />
      <Fab
        color="primary"
        aria-label="Latest messages"
        css={[styles.fab, scrollDown || styles.fabDisabled]}
        onClick={onClickScroll}
      >
        <ArrowDropDownIcon />
      </Fab>
    </div>
  );
}
