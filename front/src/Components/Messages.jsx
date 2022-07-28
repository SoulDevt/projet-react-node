import React, { useEffect, useState, useContext, useRef } from 'react';
import DOMPurify from 'dompurify';
import { useParams } from 'react-router-dom';
import useDebounce from './useDebounce';

function Messages({ socket, oldMessages, friend, user }) {
    const [messages, setMessages] = useState([]);
    let params = useParams();
    const bottomRef = useRef(null);

    const [isTyping, setIsTyping] = useState(false)

    const isTypingDebounced = useDebounce(isTyping, 4000)

    useEffect(() => {
        setMessages(oldMessages);
    }, [params, oldMessages]);

    useEffect(() => {
        const messageListener = (message) => {
            if (message.sender.id === params.friendId || message.sender.id === user.id) {
                setIsTyping(false)
                setMessages((prevMessages) => {
                    const newMessages = { ...prevMessages };
                    newMessages[message.id] = message;
                    return newMessages;
                });
            }
        };

        const isTypingListener = (message) => {
            if (message.sender.id === params.friendId || message.sender.id === user.id) {
                if ( message.text !== '') {
                    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
                    setIsTyping(message.id)
                } else {
                    setIsTyping(false)
                }
            }
        }

        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });

        const deleteMessageListener = (messageID) => {
            setMessages((prevMessages) => {
                const newMessages = { ...prevMessages };
                delete newMessages[messageID];
                return newMessages;
            });
        };

        socket.on('message', messageListener);
        socket.on('deleteMessage', deleteMessageListener);
        socket.on('isTyping', isTypingListener);

        socket.emit('getMessages');

        return () => {
            socket.off('message', messageListener);
            socket.off('deleteMessage', deleteMessageListener);
            socket.off('isTyping', isTypingListener);
            setIsTyping(false)
        }
    }, [socket, params, messages]);

    useEffect(() => {
        if (isTyping) {
            setIsTyping(false)
        }
    }, [isTypingDebounced])

    const sanitizedData = (data) => ({
        __html: DOMPurify.sanitize(data)
    })

    const daysBetween = (messageDate) => {
        const today = new Date();
        const message = new Date(messageDate);
        const one = new Date(today.getFullYear(), today.getMonth(), today.getDate());
        const two = new Date(message.getFullYear(), message.getMonth(), message.getDate());
        const millisecondsPerDay = 1000 * 60 * 60 * 24;
        const millisBetween = two.getTime() - one.getTime();
        const days = millisBetween / millisecondsPerDay;
        return Math.floor(days);
    }

    return (
        <div sx={{ flex: '1 0 0', overflowY: 'auto' }}>
            {[...Object.values(messages)]
                .sort((a, b) => a.createdAt - b.createdAt)
                .map((message) => (
                    <div sx={{ display: 'box', marginY: '15px', marginX: '15px' }} key={message.id}>
                        <p
                            sx={{ display: 'inline' }}
                            component="span"
                            variant="subtitle2"
                            color="text.primary"
                        >
                            {message.sender
                                ? message.sender.id === user.id ? 'Moi' : message.sender.username
                                : message.receiver.username}
                        </p>
                        <p
                            sx={{ display: 'inline' }}
                            component="span"
                            variant="subtitle2"
                            color="text.secondary"
                        >
                            {`${daysBetween(message.createdAt) === 0
                                ? ' Today'
                                : daysBetween(message.createdAt) === -1
                                    ? ' Yesterday '
                                    : `${new Date(message.createdAt).toLocaleDateString()}`
                            } at ${new Date(message.createdAt).toLocaleTimeString()}`}
                        </p>
                        <div
                            sx={{ width: "fit-content", padding: '8px', marginTop: '3px' }}
                        >
                            <div dangerouslySetInnerHTML={sanitizedData(message.text)}></div>
                        </div>

                    </div>
                ))
            }
            <div ref={bottomRef} />
        </div>
    );
}

export default Messages;
