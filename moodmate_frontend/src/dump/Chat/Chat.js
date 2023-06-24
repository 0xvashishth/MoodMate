import React, { useState, useEffect, useRef } from 'react';
import { HubConnectionBuilder } from '@microsoft/signalr';

import ChatWindow from './ChatWindow/ChatWindow';
import ChatInput from './ChatInput/ChatInput';

const Chat = () => {
    const [chat, setChat] = useState([]);
    const [room, setRoom] = useState('');
    const latestChat = useRef(null);

    latestChat.current = chat;

    useEffect(() => {
        const connection = new HubConnectionBuilder()
            .withUrl('https://localhost:44357/hubs/chat')
            .withAutomaticReconnect()
            .build();

        connection.start()
            .then(() => {
                console.log('Connected!');

                connection.on('ReceiveMessage', (receivedRoom, message) => {
                    if (receivedRoom === room) {
                        const updatedChat = [...latestChat.current];
                        updatedChat.push(message);

                        setChat(updatedChat);
                    }
                });

                connection.invoke("JoinRoom", room).then(()=>{
                    console.log("Joined room: ",room);
                }).catch(e => console.log('Joining room failed: ', e));
            })
            .catch(e => console.log('Connection failed: ', e));

        return () => {
            connection.stop();
        };
    }, [room]);

    const sendMessage = async (user, message) => {
        const chatMessage = {
            user: user,
            message: message
        };

        try {
            await fetch(`https://localhost:44357/chat/messages/${room}`, {
                method: 'POST',
                body: JSON.stringify(chatMessage),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        } catch (e) {
            console.log('Sending message failed.', e);
        }
    };

    return (
        <div>
            <hr />
            <input type='text' name="name" />
            <button onClick={() => setRoom(document.querySelector('input').value)}>Enter Room</button>
            <ChatInput sendMessage={sendMessage} />
            <hr />
            <ChatWindow chat={chat} />
        </div>
    );
};

export default Chat;
