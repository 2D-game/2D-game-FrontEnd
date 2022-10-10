import { Socket } from "socket.io-client";

export default class SocketSingleton {
    static instance: Socket | null = null;

    socket:any; 

    static getInstance() {
        if (SocketSingleton.instance == null) {
            SocketSingleton.instance = new SocketSingleton() as any;
        }
        return this.instance;
    }

    getSocket() {
        return this.socket;
    }

    setSocket(socket: Socket) {
        this.socket = socket;
    }
}