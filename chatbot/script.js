const chatInput= document.querySelector(".chat-input textarea");
const sendChatBtn = document.querySelector(".chat-input span");
const chatBox = document.querySelector(".chatbox");

let userMessage;
const API_KEY="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";

const createChatLi =(message, className) =>{
//create a chat <li> element with passed message and classname
    const chatLi = document.createElement('li');
    chatLi.classList.add("chat", className);
    let chatContent = className ==="outgoing" ? `<p> ${message}</p>`:`<span class="material-symbols-outlined">smart_toy</span><p> ${message}</p> `;
     chatLi.innerHTML = chatContent;
     return chatLi;

}

const generateResponse =()=>{
    const API_URL = "https://api.openai.com/v1/chat/completions";
    // const messageElement = incommingChatLi.querySelector("p");
     const requestOptions ={
        method: "POST",
        headers:{
            "Content-Type":"application/json" ,
            "Authorization": `Bearer ${API_KEY}`
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo",
          messages: [
            // {
            //   role: "system",
            //   content: "You are a helpful assistant."
            // },
            {
              role: "user",
              content: userMessage
            }
          ] 
        } )
         
     }
     //send POST request to API, get response
     fetch(API_URL,requestOptions).then(res => res.json()).then(data =>{
        console.log(data);
        // messageElement.textContent= data.choices[0].message .content;
     }).catch((error)=>{
        console.log(error);
        // messageElement.textContent= "Somethings went wrong";
     })

}
const handleChat=()=>{
userMessage = chatInput.value.trim();
//console.log(userMessage); 
//This line checks if userMessage is empty (i.e., if it's a falsy value). If userMessage is empty (e.g., if the user has entered no text or only whitespace), the function will return early, and nothing further will happen. This prevents sending an empty message.
if(!userMessage) return;
// append the user message to the chatbox
 chatBox.appendChild(createChatLi(userMessage, "outgoing"));
 
 setTimeout(()=>{

    chatBox.appendChild(createChatLi("Typing...", "incoming"));
    generateResponse();
 },600);

}
sendChatBtn.addEventListener("click", handleChat);