'use client'

import React, { useState, useEffect, useRef } from 'react'
import { useSession } from 'next-auth/react'
import { Manager, Socket } from 'socket.io-client'

let socket: Socket

const connectToServer = (token: string) => {
  const manager = new Manager('http://localhost:3001/socket.io/socket.io.js', {
    extraHeaders: {
      hola: 'mundo',
      authentication: token,
    },
  })
  socket?.removeAllListeners()
  socket = manager.socket('/')
  addListeners()
}

const addListeners = () => {
  const serverStatusLabel = document.getElementById('server-status')!
  const clientsUl = document.getElementById('clients-ul')!
  const messageForm = document.getElementById('message-form')!
  const messageInput = document.getElementById('message-input')! as HTMLInputElement
  const messagesUl = document.getElementById('messages-ul')!

  socket.on('connect', () => {
    serverStatusLabel.innerHTML = 'Connected'
  })

  socket.on('disconnect', () => {
    serverStatusLabel.innerHTML = 'Disconnected'
  })

  socket.on('clients-updated', (clients: string[]) => {
    let clientsHtml = ''
    clients.forEach((clientId) => {
      clientsHtml += `<li>${clientId}</li>`
    })
    clientsUl.innerHTML = clientsHtml
  })

  messageForm.addEventListener('submit', (event) => {
    event.preventDefault()
    if (messageInput.value.trim().length <= 0) return

    socket.emit('message-from-client', {
      id: 'ID',
      message: messageInput.value,
    })

    messageInput.value = ''
  })

  socket.on('message-from-server', (payload: { fullName: string; message: string }) => {
    const newMessage = `
      <li>
        <strong>${payload.fullName}</strong>
        <span>${payload.message}</span>
      </li>
    `
    const li = document.createElement('li')
    li.innerHTML = newMessage
    messagesUl.append(li)
  })
}

const Chat: React.FC = () => {
  const { data: session } = useSession()
  const messagesUlRef = useRef<HTMLUListElement>(null)

  useEffect(() => {
    const fetchChatData = async () => {
      if (session && session.user.token) {
        const token = session.user.token
        connectToServer(token)
      }
    }
    if (session?.user.token) fetchChatData()
  }, [session])

  return (
    <div className="flex flex-col h-screen w-full">
      <h1 className="text-4xl font-bold mb-6 text-center">WebSocket Client</h1>
      {session?.user.token ? (
        <div className="flex flex-col items-center space-y-4">
          <span className="text-green-500">User is active</span>
          <span id="server-status">Offline</span>
          <ul id="clients-ul"></ul>
          <form id="message-form">
            <input
              type="text"
              placeholder="Message"
              id="message-input"
              className="px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
            <button
              type="submit"
              id="send-button"
              className="ml-2 px-4 py-2 rounded-md bg-orange-500 text-white hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500"
            >
              Send
            </button>
          </form>
          <h3>Messages</h3>
          <ul id="messages-ul" ref={messagesUlRef}></ul>
        </div>
      ) : (
        <div className="flex justify-center items-center h-full">
          <span className="text-red-500">User is not active</span>
        </div>
      )}
    </div>
  )
}

export default Chat