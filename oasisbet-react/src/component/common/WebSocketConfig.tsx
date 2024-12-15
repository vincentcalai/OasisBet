import React, { useState } from 'react';
import SockJsClient from 'react-stomp';

const WebSocketConfig = () => {
    
    // const dispatch = useDispatch()
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