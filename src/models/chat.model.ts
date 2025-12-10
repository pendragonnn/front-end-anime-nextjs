export type MessageType = 'TEXT' | 'IMAGE';

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string | null;
}

export interface Message {
  id: string;
  content: string;
  type: MessageType;
  roomChatId: string;
  userId: string;
  user: User;
  createdAt: string;
  updatedAt: string;
}

export interface RoomChat {
  id: string;
  users: User[];
  createdAt: string;
  updatedAt: string;
  lastMessage: Message | null;
}

export interface RoomChatDetail {
  id: string;
  createdAt: string;
  updatedAt: string;
  users: User[];
  messages: Message[];
  _count: {
    messages: number;
  };
}

// Backend Response Wrapper
export interface ChatApiResponse<T> {
  message: string;
  error: string | null;
  statusCode: number;
  data: T;
  pagination: any | null;
  filterQuery: any | null;
}

// DTOs for Create/Update
export interface CreateRoomChatDto {
  users: string[];
}

export interface SendMessageDto {
  roomChatId: string;
  content: string;
  type: MessageType;
}

export interface UploadImageResponse {
  id: string;
  url: string;
  key: string;
  hash: string;
  mimeType: string;
  size: number;
  createdAt: string;
  isDuplicate: boolean;
}