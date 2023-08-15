import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { appStateReducer } from './AppReducer';

const chatHistory = [
    {
      "id": "1",
      "title": "Customer Support Issue And Resolution and Customer Support",
      "messages": [
        {
          "role": "user",
          "content": "How can I reset my password?",
          "date": "2023-08-10T08:00:00Z"
        },
        {
          "role": "bot",
          "content": "To reset your password, please visit the 'Forgot Password' page and follow the instructions.",
          "date": "2023-08-10T08:05:00Z"
        }
      ],
      "date": "2023-08-10T07:55:00Z"
    },
    {
      "id": "2",
      "title": "Order Inquiry",
      "messages": [
        {
          "role": "user",
          "content": "Can you provide an update on my order?",
          "date": "2023-07-09T15:30:00Z"
        },
        {
          "role": "bot",
          "content": "Sure! Let me check the status of your order. Please provide me with your order number.",
          "date": "2023-07-09T15:32:00Z"
        },
        {
          "role": "user",
          "content": "My order number is 12345.",
          "date": "2023-07-09T15:35:00Z"
        },
        {
          "role": "bot",
          "content": "Thank you. I'm looking up the details for order #12345. Please wait a moment.",
          "date": "2023-07-09T15:40:00Z"
        }
      ],
      "date": "2023-07-09T15:25:00Z"
    },
    {
      "id": "3",
      "title": "August Entry 1",
      "messages": [
        {
          "role": "user",
          "content": "I have a question about my subscription.",
          "date": "2023-08-20T12:30:00Z"
        },
        {
          "role": "bot",
          "content": "Of course! Feel free to ask your question, and I'll be happy to help.",
          "date": "2023-08-20T12:35:00Z"
        }
      ],
      "date": "2023-08-20T12:25:00Z"
    },
    {
      "id": "4",
      "title": "August Entry 2",
      "messages": [
        {
          "role": "user",
          "content": "When will my order be delivered?",
          "date": "2023-08-15T09:45:00Z"
        },
        {
          "role": "bot",
          "content": "I can check the delivery status for you. Please provide your order number.",
          "date": "2023-08-15T09:50:00Z"
        }
      ],
      "date": "2023-08-15T09:40:00Z"
    },
    {
      "id": "5",
      "title": "June Entry 1",
      "messages": [
        {
          "role": "user",
          "content": "Is the product available in different colors?",
          "date": "2023-06-05T16:20:00Z"
        },
        {
          "role": "bot",
          "content": "Yes, the product is available in blue, red, and green.",
          "date": "2023-06-05T16:25:00Z"
        }
      ],
      "date": "2023-06-05T16:15:00Z"
    },
    // ... (additional entries)
  ];
export interface ChatEntry {
    id: string;
    title: string;
    messages: {
      role: string; // can be user or bot
      content: string; // question or answer
      date: string; // Date string, e.g., "2023-08-10T08:00:00Z"
    }[];
    date: string; // Date string, e.g., "2023-08-10T07:55:00Z"
  }
  
export interface AppState {
    isChatHistoryOpen: boolean;
    chatHistory: ChatEntry[];
    currentChat: ChatEntry | null;
  }

export type Action =
    | { type: 'TOGGLE_CHAT_HISTORY' } // | { type: 'NEW_TYPE' };
    | { type: 'UPDATE_CURRENT_CHAT', payload: ChatEntry }
    | { type: 'UPDATE_CHAT_TITLE', payload: ChatEntry }
    | { type: 'DELETE_CHAT_ENTRY', payload: string }
    | { type: 'DELETE_CHAT_HISTORY'}

const initialState: AppState = {
    isChatHistoryOpen: true,
    chatHistory: chatHistory,
    currentChat: null
};

export const AppStateContext = createContext<{
    state: AppState;
    dispatch: React.Dispatch<Action>;
  } | undefined>(undefined);

type AppStateProviderProps = {
    children: ReactNode;
  };
  
  export const AppStateProvider: React.FC<AppStateProviderProps> = ({ children }) => {
    const [state, dispatch] = useReducer(appStateReducer, initialState);
  
    return (
      <AppStateContext.Provider value={{ state, dispatch }}>
        {children}
      </AppStateContext.Provider>
    );
  };

