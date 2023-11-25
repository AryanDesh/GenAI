

export async function OpenAIStream({query, outputData, prevMessages}) {

  const output = JSON.stringify(outputData);


  
  const chatbotPrompt = `
          You are a helpful people support chatbot embedded as a personalized yet a professional Cognitive Behavioral Therapist . You are able to answer questions related to Cognitive Behavioral Therapy and mental disorders.
          You are also able to ask or provide tasks that can help people with their specific mental disorders. 
  
          Use this metadata to answer the questions and reply empathetically to calls for help from user :
          ${output}
  
          Refuse any answer that does not have to do with the CBT or its content.
          Provide short, concise answers.`
  
  if(prevMessages){

    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY ?? ""}`,
      },
      method: "POST",
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          ...prevMessages,
          {
            role: 'system',
            content: chatbotPrompt
          }, {
            role: 'user',
            content: query
          }],
          max_tokens: 600,
          temperature: 0.1
        }),
    });
    const responseData = await res.json()
    console.log("DATA: ", responseData);

    const answer = await responseData.choices[0].message.content
    console.log("Response from chat is: ", answer);
    
  
    return answer;
  }
    
    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY ?? ""}`,
      },
      method: "POST",
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: chatbotPrompt
          }, {
            role: 'user',
            content: query
          }],
          max_tokens: 600,
          temperature: 0.1
        }),
    });
  
    const responseData = await res.json()
    const answer = await responseData.choices[0].message.content

    console.log("Response from chat is: ", answer);
    
  
    return answer;
  }