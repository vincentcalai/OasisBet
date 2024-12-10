import React from 'react';
import SockJsClient from 'react-stomp';

const WebSocketConfig = () => {
    
    // const dispatch = useDispatch()
    const onConnect = () => {
        console.log("WebSocketConfig :: Connected!!")
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
            topics={['/topic/greetings']}
            onConnect={onConnect}
            onDisconnect={onDisconnect}
            onMessage={msg => onMessageReceived(msg)}
            debug={false}
        ></SockJsClient>
      </div>
    );
};

export default WebSocketConfig;