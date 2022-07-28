import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import Messages from './Messages';
import MessageInput from './MessageInput';
import ListGroup from 'react-bootstrap/ListGroup';

export default function Chat({ socket, user }) {
  let params = useParams();
  const [messages, setMessages] = useState([]);
  const [friend, setFriend] = useState([]);

  useEffect(() => {
    const loadFriendChat = async () => {
      // if (friend.id === params.friendId) return;

      // const friend = await fetch(`http://localhost:8000/api/users/${user}/friends`, {
      //   method: 'GET',
      //   headers: {
      //     'Content-Type': 'application/json',
      //     'Authorization': `Bearer ${localStorage.getItem('JWT')}`
      //   }
      // }).then(async res => {
      //   const r = await res.json();
      //   return r;
      // });

      // console.log(friend)
      // setFriendList(friend);
      // if (friend.length > 0) {
      //   console.log('friend list', friendList);
      // } else {
      //   setFriendList([]);
      // }
    }

    loadFriendChat();
  }, []);

  return (
    <div sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
      {socket && friend ? (
        <div>
          <div sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>

            <div sx={{ display: 'flex', flexDirection: 'row', padding: '8px', alignItems: 'center', height: '48px' }}>
              {/* <AlternateEmailIcon sx={{ color: 'gray', height: '24px'}} /> */}
              <p
                sx={{ display: 'inline', fontWeight: '500', fontSize: '16px', marginX: '8px' }}
              >
                {friend.username}
              </p>
            </div>
            <hr />
            <div sx={{ display: 'flex', flexDirection: 'column', flex: '1 1 auto' }}>
              <Messages socket={socket} oldMessages={messages} friend={friend} user={user} sx={{ flex: '1 1 auto' }} />
              <MessageInput socket={socket} friend={friend} fixed sx={{ bottom: '0px', margin: '10px' }} />
            </div>
          </div>
        </div>
      ) : (
        <div>Not Connected</div>
      )}
    </div>
  );
}
