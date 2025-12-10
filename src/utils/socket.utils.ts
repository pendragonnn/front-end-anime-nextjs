// src/utils/socket.utils.ts
import { io, Socket } from "socket.io-client";
import { Message } from "@/models/chat.model";
import { API_BASE_URL } from "@/constant/constants";

class SocketClient {
  private socket: Socket | null = null;
  private pendingRoom: string | null = null;
  private activeRoom: string | null = null;
  private messageCallbacks: ((msg: Message) => void)[] = [];

  disconnect() {
    if (!this.socket) return;

    console.log("🔌 Socket fully disconnected");

    this.socket.removeAllListeners();
    this.socket.disconnect();

    this.socket = null;
    this.pendingRoom = null;
    this.activeRoom = null;
    this.messageCallbacks = [];
  }

  connect(token: string) {
    if (this.socket?.connected) return;

    this.socket = io(API_BASE_URL!, {
      transports: ["polling", "websocket"], // ⬅ penting! mulai polling dulu
      extraHeaders: {
        Authorization: `Bearer ${token}`, // ⬅ header akhirnya TERKIRIM via polling
      },
    });

    this.socket.on("connect", () => {
      console.log("🔥 Socket connected:", this.socket?.id);

      if (this.pendingRoom) {
        this.joinRoom(this.pendingRoom);
        this.pendingRoom = null;
      }

      if (this.activeRoom) this.joinRoom(this.activeRoom);
    });

    this.socket.on("newMessage", (msg) => {
      this.messageCallbacks.forEach((cb) => cb(msg));
    });

    this.socket.on("disconnect", () => console.log("❌ Socket disconnected"));
  }

  joinRoom(roomId: string) {
    this.activeRoom = roomId;

    if (!this.socket?.connected) {
      this.pendingRoom = roomId;
      return;
    }

    this.socket.emit("joinRoom", roomId);
  }

  leaveRoom(roomId: string) {
    if (!this.socket?.connected) return;
    this.socket.emit("leaveRoom", roomId);
    if (this.activeRoom === roomId) this.activeRoom = null;
  }

  onNewMessage(cb: (msg: Message) => void) {
    this.messageCallbacks.push(cb);
    return () => {
      this.messageCallbacks = this.messageCallbacks.filter((x) => x !== cb);
    };
  }
}

export const socketClient = new SocketClient();
