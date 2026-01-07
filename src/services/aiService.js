export async function getSummary(text){
const response = await fetch("https://api.groq.com/openai/v1/chat/completions",{
    method:"POST",
    headers:{
        "Content-Type":"application/json",
        "Authorization":`Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`
    },

    body:JSON.stringify({
        model: "llama-3.1-8b-instant",

        messages:[
            { role: "user",
            content: `Summarise the following content in 4-5 lines:\n${text.substring(0, 3000)}`}
        ],
          temperature: 0.5,
        max_tokens:150
    })

});
const data = await response.json();

  // 🔴 IMPORTANT: debug if API fails
  if (!response.ok) {
    console.error("Groq API error:", data);
    throw new Error("Groq API failed");
  }
return data.choices[0].message.content;
}