import { useEffect, useState } from 'react';
import { sigr } from './funcy';

const ChatComponent: React.FC = () => {
    const [user, setUser] = useState<string>('');
    const [message, setMessage] = useState<string>('');
    const [status, setStatus] = useState<string>("");

    useEffect(() => {
        //sigr.startConnection();

        sigr.done = () => {
            setStatus("DONE and DUSTED");
        }

        sigr.update = (message) => {
            setStatus(message);
        }
        setStatus("K");
        //console.log(`SIGR: connected`);
        //f3.run();
    }, []);

    const handleSendMessage = () => {
        sigr.sendMessage(user, message);
        setMessage(''); // Clear message input
    };

    return (
        <div>
            <h2>Chat Room</h2>
            <input
                type="text"
                placeholder="Your name"
                value={user}
                onChange={e => setUser(e.target.value)}
            />
            <input
                type="text"
                placeholder="Type a message"
                value={message}
                onChange={e => setMessage(e.target.value)}
            />
            <button onClick={handleSendMessage}>Send</button>
            <div>STATUS: {status}</div>
        </div>
    );
};

export default ChatComponent;