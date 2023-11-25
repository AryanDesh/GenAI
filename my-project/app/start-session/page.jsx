'use client';
import Message from  "@components/Message";
import Spinner from "@components/Spinner";
import { useState } from "react";


const StartSession = () => {

  const [query, setQuery] = useState('')
  const [loading, setLoading] = useState(false)
  const [messages, setMessages] = useState([{
    role: 'system',
    content: 'Hi! Is everything treating you well today?'
  }])
  const handleSubmit = async(e) => {
    e.preventDefault();
    setLoading(true);
    setMessages(prev => [...prev, { role: 'user', content: query}]);
    const therapistResponse = await fetch('/api/search',{
      method:'POST',
      headers:{
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ query: query })
    })
    const therapistData = await therapistResponse.json();
    console.log('therapistResponse ',therapistData);
    const chatData = await fetch('/api/chat', {
      method: 'POST',
      headers:{
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({data:therapistData, query: query, messages: messages})
    });
    const chatDataMessage = await chatData.json();
    console.log("chatdata = ", chatDataMessage);
    setMessages(prev => [...prev, { role: 'system', content: chatDataMessage.message}]);
    setQuery('');
    setLoading(false);
  }
  return (
    <div className=' w-full h-[545px] flex flex-col justify-between rounded-lg'>
      <div className='w-full h-full flex flex-col gap-4 overflow-y-auto pr-4'>
        {messages.map((message, index) => <Message key={index} sender={message.role} message={message.content}/>)}
      </div>
      <div className='w-full mt-4'>
      <form onSubmit={handleSubmit} className='bg-[#030712] p-0.5 rounded-lg flex justify-center'>
        <textarea 
          type='text' 
          placeholder='Enter your query here...' 
          value={query}
          disabled={loading}
          className='w-full bg-primary border-2 border-transparent p-2 outline-0 focus:border-accent rounded-lg resize-none' 
          onChange={(e) => setQuery(e.target.value)}
        />
        <div className='flex items-center mx-4 gap-8 relative'>
          
          {loading ? <Spinner/>:
          <button type='submit' disabled={loading} className="text-white">Submit</button>
          }
        </div>
      </form>
    </div>
  </div>
  )
}

export default StartSession