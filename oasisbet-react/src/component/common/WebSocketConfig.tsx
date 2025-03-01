import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import SockJsClient from 'react-stomp';

const WebSocketConfig = () => {
    
    const dispatch = useDispatch()
    const [topics, setTopics] = useState([] as String[]) ;

    const onConnect = () => {
        console.log("WebSocketConfig :: Connected!!")
        setTopics(['/topic/odds']);
    }

    const onDisconnect = () => {
        console.log("WebSocketConfig :: Disconnect!!")
    }

    const onMessageReceived = (msg) => {
        console.log("WebSocketConfig :: Message Received ", msg)
        const updatedEventsMap = new Map();
        msg?.map(event => updatedEventsMap.set(event.eventId, event.h2hEventOdds));
        dispatch({ type: 'UPDATE_ODDS', payload: updatedEventsMap });
    }

    return (
        <div>
        <SockJsClient 
            url='http://localhost:8804/websocket' 
            topics={topics}
            onConnect={onConnect}
            onDisconnect={onDisconnect}
            onMessage={msg => onMessageReceived(msg)}
            debug={false}
        ></SockJsClient>
      </div>
    );
};

export default WebSocketConfig;