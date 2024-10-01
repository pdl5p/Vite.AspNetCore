// signalRService.ts
//import { HubConnectionBuilder, HubConnection } from '@microsoft/signalr';
// class SignalRService {
//    private connection: HubConnection;

//    constructor() {
//        this.connection = new HubConnectionBuilder()
//            .withUrl('/sigr') // Replace with your hub URL
//            .build();

//        this.connection.on('ReceiveMessage', (user: string, message: string) => {
//            console.log(`${user}: ${message}`);
//            // You can also update your component state or do more here
//        });
//    }

//    public async startConnection(): Promise<void> {
//        try {
//            await this.connection.start();
//            console.log('SignalR connected');
//        } catch (error) {
//            console.error('Connection failed: ', error);
//        }
//    }

//    public async sendMessage(user: string, message: string): Promise<void> {
//        try {
//            await this.connection.invoke('SendMessage', user, message);
//        } catch (error) {
//            console.error('Send failed: ', error);
//        }
//    }
//}

//export function sigr(): string {
//    return "1";
//}

//const sigr = new SignalRService(); 
//export { SignalRService, sigr };
//export { sigr };