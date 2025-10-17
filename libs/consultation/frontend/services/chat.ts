import {
  collection,
  addDoc,
  query,
  orderBy,
  onSnapshot,
  doc,
  updateDoc,
  serverTimestamp,
  where,
  getDocs,
  limit,
  Timestamp
} from 'firebase/firestore';
import {
  getDownloadURL,
  ref,
  uploadBytes,
  deleteObject
} from 'firebase/storage';
import { db, storage, auth } from '../../../shared/firebase-config/src/index';

export interface ChatMessage {
  id: string;
  conversationId: string;
  senderId: string;
  senderName: string;
  senderAvatar?: string;
  content: string;
  type: 'text' | 'image' | 'file' | 'system';
  timestamp: Timestamp;
  read: boolean;
  readBy: string[];
  metadata?: {
    fileName?: string;
    fileSize?: number;
    fileType?: string;
    imageWidth?: number;
    imageHeight?: number;
    mimeType?: string;
    downloadURL?: string;
  };
}

export interface ChatConversation {
  id: string;
  participants: string[];
  participantNames: { [userId: string]: string };
  participantAvatars?: { [userId: string]: string };
  lastMessage?: ChatMessage;
  lastMessageTime: Timestamp;
  unreadCount: { [userId: string]: number };
  createdAt: Timestamp;
  updatedAt: Timestamp;
  status: 'active' | 'archived' | 'deleted';
  metadata?: {
    bookingId?: string;
    consultantId?: string;
    clientId?: string;
    sessionType?: string;
  };
}

export interface TypingIndicator {
  conversationId: string;
  userId: string;
  userName: string;
  timestamp: Timestamp;
}

export class ChatService {
  private static instance: ChatService;
  private messageListeners: Map<string, () => void> = new Map();
  private conversationListeners: Map<string, () => void> = new Map();
  private typingListeners: Map<string, () => void> = new Map();

  private constructor() {}

  static getInstance(): ChatService {
    if (!ChatService.instance) {
      ChatService.instance = new ChatService();
    }
    return ChatService.instance;
  }

  // Message Operations
  async sendMessage(
    conversationId: string,
    senderId: string,
    senderName: string,
    content: string,
    type: 'text' | 'image' | 'file' | 'system' = 'text',
    metadata?: any
  ): Promise<string> {
    try {
      const messageData = {
        conversationId,
        senderId,
        senderName,
        content,
        type,
        timestamp: serverTimestamp(),
        read: false,
        readBy: [],
        metadata: metadata || {}
      };

      const docRef = await addDoc(collection(db, 'messages'), messageData);

      // Update conversation last message
      await this.updateConversationLastMessage(conversationId, {
        id: docRef.id,
        ...messageData,
        timestamp: new Date() as any // This will be updated by the listener
      } as ChatMessage);

      return docRef.id;
    } catch (error) {
      console.error('Error sending message:', error);
      throw new Error('Failed to send message');
    }
  }

  async uploadFile(
    conversationId: string,
    file: File,
    senderId: string,
    senderName: string
  ): Promise<string> {
    try {
      const timestamp = Date.now();
      const fileName = `${timestamp}_${file.name}`;
      const storageRef = ref(storage, `chat/${conversationId}/${fileName}`);

      const snapshot = await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(snapshot.ref);

      const metadata: any = {
        fileName: file.name,
        fileSize: file.size,
        fileType: file.type,
        mimeType: file.type,
        downloadURL
      };

      // For images, we could get dimensions
      if (file.type.startsWith('image/')) {
        const img = new Image();
        img.src = URL.createObjectURL(file);
        await new Promise(resolve => {
          img.onload = resolve;
        });
        metadata.imageWidth = img.width;
        metadata.imageHeight = img.height;
      }

      return await this.sendMessage(
        conversationId,
        senderId,
        senderName,
        downloadURL,
        file.type.startsWith('image/') ? 'image' : 'file',
        metadata
      );
    } catch (error) {
      console.error('Error uploading file:', error);
      throw new Error('Failed to upload file');
    }
  }

  async markMessageAsRead(messageId: string, userId: string): Promise<void> {
    try {
      const messageRef = doc(db, 'messages', messageId);
      await updateDoc(messageRef, {
        read: true,
        readBy: [userId]
      });
    } catch (error) {
      console.error('Error marking message as read:', error);
    }
  }

  async markConversationAsRead(conversationId: string, userId: string): Promise<void> {
    try {
      const messagesQuery = query(
        collection(db, 'messages'),
        where('conversationId', '==', conversationId),
        where('read', '==', false)
      );

      const messagesSnapshot = await getDocs(messagesQuery);

      const updatePromises = messagesSnapshot.docs.map(async (messageDoc) => {
        const messageRef = doc(db, 'messages', messageDoc.id);
        const messageData = messageDoc.data();

        if (!messageData.readBy.includes(userId)) {
          await updateDoc(messageRef, {
            read: true,
            readBy: [...messageData.readBy, userId]
          });
        }
      });

      await Promise.all(updatePromises);

      // Update conversation unread count
      const conversationRef = doc(db, 'conversations', conversationId);
      await updateDoc(conversationRef, {
        [`unreadCount.${userId}`]: 0
      });
    } catch (error) {
      console.error('Error marking conversation as read:', error);
    }
  }

  // Conversation Operations
  async createConversation(
    participants: string[],
    participantNames: { [userId: string]: string },
    metadata?: any
  ): Promise<string> {
    try {
      const conversationData = {
        participants,
        participantNames,
        participantAvatars: {},
        unreadCount: participants.reduce((acc, userId) => {
          acc[userId] = 0;
          return acc;
        }, {} as { [userId: string]: number }),
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
        status: 'active',
        metadata: metadata || {}
      };

      const docRef = await addDoc(collection(db, 'conversations'), conversationData);
      return docRef.id;
    } catch (error) {
      console.error('Error creating conversation:', error);
      throw new Error('Failed to create conversation');
    }
  }

  async getOrCreateConversation(
    currentUserId: string,
    otherUserId: string,
    currentUserName: string,
    otherUserName: string,
    metadata?: any
  ): Promise<string> {
    try {
      // Check if conversation already exists
      const existingQuery = query(
        collection(db, 'conversations'),
        where('participants', 'array-contains', currentUserId)
      );

      const existingSnapshot = await getDocs(existingQuery);

      for (const doc of existingSnapshot.docs) {
        const conversation = doc.data() as ChatConversation;
        if (
          conversation.participants.includes(otherUserId) &&
          conversation.participants.length === 2
        ) {
          return doc.id;
        }
      }

      // Create new conversation
      const participants = [currentUserId, otherUserId];
      const participantNames = {
        [currentUserId]: currentUserName,
        [otherUserId]: otherUserName
      };

      return await this.createConversation(participants, participantNames, metadata);
    } catch (error) {
      console.error('Error getting or creating conversation:', error);
      throw new Error('Failed to get or create conversation');
    }
  }

  private async updateConversationLastMessage(
    conversationId: string,
    lastMessage: ChatMessage
  ): Promise<void> {
    try {
      const conversationRef = doc(db, 'conversations', conversationId);
      await updateDoc(conversationRef, {
        lastMessage,
        lastMessageTime: serverTimestamp(),
        updatedAt: serverTimestamp()
      });
    } catch (error) {
      console.error('Error updating conversation last message:', error);
    }
  }

  // Real-time Listeners
  subscribeToMessages(
    conversationId: string,
    callback: (messages: ChatMessage[]) => void
  ): () => void {
    const messagesQuery = query(
      collection(db, 'messages'),
      where('conversationId', '==', conversationId),
      orderBy('timestamp', 'asc')
    );

    const unsubscribe = onSnapshot(messagesQuery, (snapshot) => {
      const messages: ChatMessage[] = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      } as ChatMessage));

      callback(messages);
    });

    this.messageListeners.set(conversationId, unsubscribe);
    return unsubscribe;
  }

  subscribeToConversations(
    userId: string,
    callback: (conversations: ChatConversation[]) => void
  ): () => void {
    const conversationsQuery = query(
      collection(db, 'conversations'),
      where('participants', 'array-contains', userId),
      orderBy('lastMessageTime', 'desc')
    );

    const unsubscribe = onSnapshot(conversationsQuery, (snapshot) => {
      const conversations: ChatConversation[] = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      } as ChatConversation));

      callback(conversations);
    });

    this.conversationListeners.set(userId, unsubscribe);
    return unsubscribe;
  }

  subscribeToTyping(
    conversationId: string,
    callback: (typingUsers: TypingIndicator[]) => void
  ): () => void {
    // This would typically use a separate typing collection
    // For now, we'll simulate it
    const unsubscribe = () => {
      // Cleanup
    };

    this.typingListeners.set(conversationId, unsubscribe);
    return unsubscribe;
  }

  // Typing Indicators
  async setTypingStatus(
    conversationId: string,
    userId: string,
    userName: string,
    isTyping: boolean
  ): Promise<void> {
    // This would update a typing indicators collection
    console.log(`User ${userName} ${isTyping ? 'started' : 'stopped'} typing in ${conversationId}`);
  }

  // Cleanup
  unsubscribeFromMessages(conversationId: string): void {
    const unsubscribe = this.messageListeners.get(conversationId);
    if (unsubscribe) {
      unsubscribe();
      this.messageListeners.delete(conversationId);
    }
  }

  unsubscribeFromConversations(userId: string): void {
    const unsubscribe = this.conversationListeners.get(userId);
    if (unsubscribe) {
      unsubscribe();
      this.conversationListeners.delete(userId);
    }
  }

  unsubscribeFromTyping(conversationId: string): void {
    const unsubscribe = this.typingListeners.get(conversationId);
    if (unsubscribe) {
      unsubscribe();
      this.typingListeners.delete(conversationId);
    }
  }

  // Utility functions
  async deleteMessage(messageId: string): Promise<void> {
    try {
      // Delete from Firestore
      await updateDoc(doc(db, 'messages', messageId), {
        type: 'system',
        content: 'This message was deleted'
      });
    } catch (error) {
      console.error('Error deleting message:', error);
      throw new Error('Failed to delete message');
    }
  }

  async archiveConversation(conversationId: string): Promise<void> {
    try {
      const conversationRef = doc(db, 'conversations', conversationId);
      await updateDoc(conversationRef, {
        status: 'archived',
        updatedAt: serverTimestamp()
      });
    } catch (error) {
      console.error('Error archiving conversation:', error);
      throw new Error('Failed to archive conversation');
    }
  }

  async searchMessages(
    conversationId: string,
    searchTerm: string,
    limitCount: number = 50
  ): Promise<ChatMessage[]> {
    try {
      const messagesQuery = query(
        collection(db, 'messages'),
        where('conversationId', '==', conversationId),
        orderBy('timestamp', 'desc'),
        limit(limitCount)
      );

      const messagesSnapshot = await getDocs(messagesQuery);
      const messages: ChatMessage[] = [];

      messagesSnapshot.docs.forEach(doc => {
        const message = { id: doc.id, ...doc.data() } as ChatMessage;
        if (
          message.type === 'text' &&
          message.content.toLowerCase().includes(searchTerm.toLowerCase())
        ) {
          messages.push(message);
        }
      });

      return messages.reverse(); // Return in chronological order
    } catch (error) {
      console.error('Error searching messages:', error);
      throw new Error('Failed to search messages');
    }
  }
}

export const chatService = ChatService.getInstance();
