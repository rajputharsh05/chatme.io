import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {
  createBrowserRouter,
  RouterProvider
} from 'react-router-dom'
import ChatRoom from './components/chatroom/chatroom';
import PrivateChatRoom from './components/chatroom/PrivateChatRoom';

const router = createBrowserRouter([
  {
    path:"/",
    element:<App></App>
  },
  {
    path:"/chatroom",
    element:<ChatRoom></ChatRoom>
  },
  {
    path:"/privatechat",
    element:<PrivateChatRoom></PrivateChatRoom>
  }
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <RouterProvider router={router} ></RouterProvider>
);

