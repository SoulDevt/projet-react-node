import React, { useState, useContext, useEffect } from 'react';
import DOMPurify from 'dompurify';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

const NewMessage = ({ socket, friend, user }) => {
  const [value, setValue] = useState('');

  const sendMessage = () => {
    if (value.trim().length === 0) return;
    const sanitizedMessage = () => ({
      __html: DOMPurify.sanitize(value.replace(/\n/g, '<br>'))
    })
    console.log('SDSDFSDFSF', friend, user)
    socket.emit('message', {
      receiver: friend,
      sender: user,
      content: sanitizedMessage().__html
    });
    setValue('');
  };

  useEffect(() => {
    const textarea = document.getElementById('textareaMessage');
    const handleMessage = (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        sendMessage();
      } else if (e.key === 'Enter' && e.shiftKey) {
        e.preventDefault();
        setValue(value + "\n");
      }
    }
    if (textarea) {
      textarea.addEventListener('keydown', handleMessage);
    }
    return () => {
      textarea.removeEventListener('keydown', handleMessage);
    }
  }, [value]);

  return (
    <div>
      <div
        sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: '100%' }}
      >
        <InputGroup className="mb-3">
          <Form.Control
            id='textareaMessage'
            placeholder="Send a message"
            value={value}
            onChange={(e) => {
              setValue(e.currentTarget.value);
            }}
          />
          <Button onClick={() => { sendMessage() }} variant="outline-secondary" id="button-addon2">
            Send
          </Button>
        </InputGroup>
      </div>
    </div>
  );
};

export default NewMessage;
