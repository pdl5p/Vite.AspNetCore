import { HubConnectionBuilder, HubConnection, HubConnectionState } from '@microsoft/signalr';

const f1 = (): void => {
    console.log("F1!");
}

function f2(): string {

    return "F2";
}

class f3x {

    private connection: HubConnection;

    constructor() {
        console.log("F3 ctor");

        this.connection = new HubConnectionBuilder()
            .withUrl('/sigr') // Replace with your hub URL
            .build();

        this.connection.on('ReceiveMessage', (user: string, message: string) => {
            console.log(`${user}: ${message}`);
        });

        console.log("F3 con");
    }

    public async run() {
        console.log("F3 run");

        try {
            await this.connection.start();
            console.log('SignalR connected');
        } catch (error) {
            console.error('Connection failed: ', error);
        }
    }
}

//import { HubConnectionBuilder, HubConnection } from '@microsoft/signalr';
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

     private onDone = async () => {
         if (this.done) {
             this.done();
             setTimeout(async () => { await this.stopConnection(); }, 10);
         }
     }

     private onUpdate = (message: string) => {
         if (this.update) {
             this.update(message);
         }
     }

    public async startConnection(): Promise<void> {
        try {
            if (this.connection.state == HubConnectionState.Disconnected) {
                await this.connection.start();
                console.log('SignalR connected');
            }
        } catch (error) {
            console.error('Connection failed: ', error);
        }
     }

     public async stopConnection(): Promise<void> {
         try {
             if (this.connection.state == HubConnectionState.Connected) {
                 await this.connection.stop();
                 console.log('SignalR disconnected');
             }
         } catch (error) {
             console.error('Connection failed: ', error);
         }
     }


    public async sendMessage(user: string, message: string): Promise<void> {
        try {
            await this.startConnection();
            await this.connection.invoke('SendMessage', user, message);
            
        } catch (error) {
            console.error('Send failed: ', error);
        }
    }
}

const sigr = new SignalRService();

const f3 = new f3x();

export { f2, f3, sigr };
export default f1;