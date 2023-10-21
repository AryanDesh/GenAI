'use client';
import Message from  "@components/Message";
import { useEffect, useState } from "react";
const StartSession = () => {
  const [query, setQuery] = useState('')
  const [messages, setMessages] = useState([{
    sender: 'therapist',
    message: 'Hi! Is everything treating you well today?'
  }])
  const handleSubmit = (e) => {
    e.preventDefault();

    setMessages([ ...messages, { sender: 'user', message: query }]);
    setQuery('');
  }
  return (
    <div className=' w-full h-[545px] flex flex-col justify-between rounded-lg'>
      <div className='w-full h-full flex flex-col gap-4 overflow-y-auto pr-4'>
        {messages.map((message, index) => <Message key={index} sender={message.sender} message={message.message}/>)}
      </div>
      <div className='w-full mt-4'>
      <form onSubmit={handleSubmit} className='bg-[#030712] p-0.5 rounded-lg flex justify-center'>
        <textarea 
          type='text' 
          placeholder='Enter your query here...' 
          value={query}
          className='w-full bg-primary border-2 border-transparent p-2 outline-0 focus:border-accent rounded-lg resize-none' 
          onChange={(e) => setQuery(e.target.value)}
        />
        <div className='flex items-center mx-4 gap-8'>
          <button type='submit' className="text-white">Submit</button>
        </div>
      </form>
    </div>
  </div>
  )
}

export default StartSession