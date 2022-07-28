import React, { useState, useEffect } from 'react';
import Chat from './Chat'
import ListGroup from 'react-bootstrap/ListGroup';


function Home(props) {

    const [isLogged, setIsLogged] = useState(false);
    const [friendList, setFriendList] = useState([]);
    const [userId, setUserId] = useState(props.user);

    useEffect(() => {
        setIsLogged(props.isLogged);
        setUserId(props.user);
    }, [props.isLogged])

    useEffect(() => {
        const loadFriends = async () => {

            const friends = await fetch(`http://localhost:8000/api/users/${userId}/friends`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('JWT')}`
                }
            }).then(async (res) => {
                console.log(await res.json())
                setFriendList(await res.json());
                console.log(friendList)
            })
        }
        if (isLogged) {
            loadFriends();
        }
    }, [isLogged, userId]);

    return (
        <>
            {
                isLogged ?
                    <>
                        <div>
                            <ListGroup defaultActiveKey="#link1">
                                <Friends list={friendList} />
                            </ListGroup>
                        </div>
                        <Chat socket={props.socket} user={props.user} />
                    </> : 'Not logged in'
            }
            {/* <h1>{isLogged ? 'Hello ' + props.name : 'NOT LOGGED'}</h1> */}
        </>
    );

}

export default Home;


const Friends = async ({list}) => {
    console.log(list)
    return (
      <div>
        {list.length && list.map((friend) => {
          return (
            <ListGroup.Item key={friend.id} onClick={() => setFriend(friend)}>
              <div>
                <div>{friend}</div>
              </div>
            </ListGroup.Item>
          )
        })}
      </div>
    )
  }