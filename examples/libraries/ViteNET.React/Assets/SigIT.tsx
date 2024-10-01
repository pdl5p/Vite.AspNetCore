// ChatComponent.tsx
import { useEffect, useState } from 'react';
//import { sigr } from './SignalRService.js';
import { HubConnectionBuilder, HubConnection } from '@microsoft/signalr';
 class SignalRService {
    private connection: HubConnection;

    constructor() {
        this.connection = new HubConnectionBuilder()
            .withUrl('/sigr') // Replace with your hub URL
            .build();

        this.connection.on('ReceiveMessage', (user: string, message: string) => {
            console.log(`${user}: ${message}`);
            // You can also update your component state or do more here
            if (message === "DONE") {
                this.onDone();
            };
        });
        this.connection.on('Update', (_user: string, message: string) => {
            console.log(`UPDATE: ${message}`);
            this.onUpdate(message);
            // You can also update your component state or do more here
        });
     }

     public done?: () => void;
     public update?: (message: string) => void;

     private onDone = () => {
         if (this.done) {
             this.done();
         }
     }

     private onUpdate = (message: string) => {
         if (this.update) {
             this.update(message);
         }
     }

    public async startConnection(): Promise<void> {
        try {
            await this.connection.start();
            console.log('SignalR connected');
        } catch (error) {
            console.error('Connection failed: ', error);
        }
    }

    public async sendMessage(user: string, message: string): Promise<void> {
        try {
            await this.connection.invoke('SendMessage', user, message);
        } catch (error) {
            console.error('Send failed: ', error);
        }
    }
}

const sigr = new SignalRService();

const ChatComponent: React.FC = () => {
    const [user, setUser] = useState<string>('');
    const [message, setMessage] = useState<string>('');
    const [status, setStatus] = useState<string>("");

    useEffect(() => {
        sigr.startConnection();

        sigr.done = () => {
            setStatus("DONE and DUSTED");
        }

        sigr.update = (message) => {
            setStatus(message);
        }
        console.log(`SIGR: connected`);
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