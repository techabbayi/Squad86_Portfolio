const chatBody = document.querySelector(".chat-body");
const messageInput = document.querySelector(".message-input");
const sendMessage = document.querySelector("#send-message");
const fileInput = document.querySelector("#file-input");
const fileUploadWrapper = document.querySelector(".file-upload-wrapper");
const fileCancelButton = fileUploadWrapper.querySelector("#file-cancel");
const chatbotToggler = document.querySelector("#chatbot-toggler");
const closeChatbot = document.querySelector("#close-chatbot");

// API setup
const API_KEY = "AIzaSyBcO_39kaCBXlwODf73-JFo98Xc4Mxsi1g";
const API_URL = `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-pro:generateContent?key=${API_KEY}`;

// Initialize user message and file data
const userData = {
  message: null,
  file: {
    data: null,
    mime_type: null,
  },
};

// Store chat history
const chatHistory = [{
    role: "model",
    parts: [{ text: "Hello! How can I assist you today?" }],
    }];

const initialInputHeight = messageInput.scrollHeight;

// Create message element with dynamic classes and return it
const createMessageElement = (content, ...classes) => {
  const div = document.createElement("div");
  div.classList.add("message", ...classes);
  div.innerHTML = content;
  return div;
};


const companyData = {
  name: "Squad86 ",
  description: " Squad86 is a unique cohort of Kalvium Squad from the first-year 2024 batch.\n\n They are a dynamic Squad of individuals committed to mastering the skills required for the tech industry.\n\n The Squad86 Mentors represents innovation, and hands-on technical skills, preparing them for top industry roles.",
  products: [
    {
      name: "Kalvium Learning Platform",
      description: "A state-of-the-art platform designed to provide Software Engineers with industry-aligned learning modules, coding challenges, and real-world projects."
    },
  ],
  achievements: [
    "Leetcode Challenger Bhavdeep Sai, \n\n He recognized for his excellence in competitive programming, hails from Squad86, showcasing the technical proficiency of our Folks.",
    "Squad86's team participated in the prestigious Hackathon Competition held at Apollo University, where Aalla Chaitanya Reddy and his team emerged victorious, competing against BTech Students from all over the country."
  ],
  contact: {
    email: "contact@squad86.com",
    phone: "+91 6304385198 "
  }
};
const kalviumProgramData = {
  name: "Kalvium Program",
  description: "The Kalvium program is a specially designed initiative to bridge the gap between academia and industry. \n\n It focuses on enhancing practical skills, preparing Folks for high-demand job roles in top tech companies.",
  features: [
    "Industry-aligned curriculum that focuses on hands-on learning and real-world projects.",
    "Mentorship from experienced professionals working in leading tech companies.",
    "Exclusive access to job placement drives and internships with top companies in the tech industry."
  ],
  impact: "The Kalvium program has successfully helped hundreds of students land jobs at some of the most prestigious tech companies. \n\n The program's focus on industry-relevant skills and hands-on experience sets it apart from traditional education programs.",
  team: {
    Esther: {
      name: "Esther Soundarya",
      role: "Program Manager",
      bio: "Esther is a Program Manager from Past 1year. \n\n She is passionate about ensuring that every student has a clear path to communication skills through structured learning and personalized Activites.",
      image: "../../images/Photos/esther.jpg" // Replace with the actual image URL for Esther
    },
    RamaChandu: {
      name: "Rama Chandu",
      role: "Technical Mentor",
      bio: "Rama Chandu is a Technical Mentor with extensive expertise in Software Engineering, Data Science and mentoring Folks of Squad86. \n\n His approach focuses on hands-on learning and helping Their Folks to tackle real-world technical challenges.",
      image: "../../images/chandu.jpg" // Replace with the actual image URL for Rama Chandu
    }
  }
};

// Update response generation to reflect new data for Squad86 and Kalvium Program

const generateBotResponse = async (incomingMessageDiv) => {
  const messageElement = incomingMessageDiv.querySelector(".message-text");

  // Add user message to chat history
  chatHistory.push({
    role: "user",
    parts: [{ text: userData.message }, ...(userData.file.data ? [{ inline_data: userData.file }] : [])],
  });

  // Check for custom company-related messages
  let apiResponseText = '';
  const userMessageLowerCase = userData.message.toLowerCase();

  if (userMessageLowerCase.includes("who are you") || userMessageLowerCase.includes("who are squad86")) {
    apiResponseText = `I'm Squad86 AI Chatbot, Here to share Some information about Kalvium Program and Squad86 \n\n ${companyData.description} \n\n You may Ask few more questions related to Achivements, Mentors, etc., \n\n `;
  } else if (userMessageLowerCase.includes("achievements") || userMessageLowerCase.includes("what are squad86 achivements")) {
    apiResponseText = `Squad86 has achieved remarkable success in its early stages. \n\n Here are some of our key achievements:
- ${companyData.achievements.join("\n- ")}
    `;
  } else if (userMessageLowerCase.includes("contact") || userMessageLowerCase.includes("how to contact Squad86")) {
    apiResponseText = `You can contact us at:\nEmail: ${companyData.contact.email}\nPhone: ${companyData.contact.phone}`;
  } else if (userMessageLowerCase.includes("what is Squad86")) {
    apiResponseText = `${companyData.name} is a unique cohort of Kalvium Squad from the first-year 2024 batch. We are committed to mastering the skills required for the tech industry.`;
  } else if (userMessageLowerCase.includes("who are mentors") || userMessageLowerCase.includes("who is mentors of squad86")) {
    apiResponseText = `The mentors of Squad86 are a dynamic group of individuals committed to helping our Folks succeed in the tech industry.\n\n
  - ${kalviumProgramData.team.Esther.name},\n the ${kalviumProgramData.team.Esther.role}, who focuses on ensuring that every student has a clear path and structured learning experiences.\n
  - ${kalviumProgramData.team.RamaChandu.name},\n the ${kalviumProgramData.team.RamaChandu.role}, who specializes in providing technical guidance and mentoring Folks in their journey to excel in technical roles.\n\n
  If you want more clear about mentors ask with their names...`;
  
  } else if (userMessageLowerCase.includes("what is kalvium program") || userMessageLowerCase.includes("tell me about kalvium program")) {
    apiResponseText = `The ${kalviumProgramData.name}   is an innovative program designed to equip Folks with the skills they need to excel in the tech industry.\n\n 
It focuses on providing hands-on learning experiences, mentorship from industry experts, and access to job placement opportunities at top tech companies.

Key Features:
- ${kalviumProgramData.features.join("\n- ")}`;
  } else if (userMessageLowerCase.includes("tell me about esther") || userMessageLowerCase.includes("who is esther") || (userMessageLowerCase.includes("tell me about Program Manager") || userMessageLowerCase.includes("who is Program Manager")) ) {
    apiResponseText = `${kalviumProgramData.team.Esther.name} is the ${kalviumProgramData.team.Esther.role} at Kalvium. She is responsible for overseeing the program's success and ensuring that Folks receive the best possible guidance. ${kalviumProgramData.team.Esther.bio}

You can contact her for program-related inquiries.`;
  } else if (userMessageLowerCase.includes("tell me about rama chandu") || userMessageLowerCase.includes("who is rama chandu") || (userMessageLowerCase.includes("tell me about chandu") || userMessageLowerCase.includes("who is chandu")) || (userMessageLowerCase.includes("tell me about technical mentor") || userMessageLowerCase.includes("who is technical mentor")) ) {
    apiResponseText = `${kalviumProgramData.team.RamaChandu.name} is the ${kalviumProgramData.team.RamaChandu.role} at Kalvium. He provides technical mentorship and ensures that Folks develop the necessary skills to succeed in the tech industry.${kalviumProgramData.team.RamaChandu.bio}

Rama's mentorship is invaluable for Folks looking to thrive in technical roles.`;
  } else {
    // Make an API request for general responses if not related to company info
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: chatHistory,
      }),
    };

    try {
      const response = await fetch(API_URL, requestOptions);
      const data = await response.json();
      if (!response.ok) throw new Error(data.error.message);

      // Extract and display bot's response text
      apiResponseText = data.candidates[0].content.parts[0].text.replace(/\*\*(.*?)\*\*/g, "$1").trim();
    } catch (error) {
      // Handle error in API response
      console.log(error);
      apiResponseText = error.message;
      messageElement.style.color = "#ff0000";
    }
  }

  // Display the response
  messageElement.innerText = apiResponseText;

  // Add bot response to chat history
  chatHistory.push({
    role: "model",
    parts: [{ text: apiResponseText }],
  });

  // Scroll to the bottom after the response is added
  chatBody.scrollTo({ top: chatBody.scrollHeight, behavior: "smooth" });

  // Reset user's file data, removing thinking indicator
  userData.file = {};
  incomingMessageDiv.classList.remove("thinking");
};


// // Generate bot response using API
// const generateBotResponse = async (incomingMessageDiv) => {
//   const messageElement = incomingMessageDiv.querySelector(".message-text");

//   // Add user message to chat history
//   chatHistory.push({
//     role: "user",
//     parts: [{ text: userData.message }, ...(userData.file.data ? [{ inline_data: userData.file }] : [])],
//   });

//   // API request options
//   const requestOptions = {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({
//       contents: chatHistory,
//     }),
//   };

//   try {
//     // Fetch bot response from API
//     const response = await fetch(API_URL, requestOptions);
//     const data = await response.json();
//     if (!response.ok) throw new Error(data.error.message);

//     // Extract and display bot's response text
//     const apiResponseText = data.candidates[0].content.parts[0].text.replace(/\*\*(.*?)\*\*/g, "$1").trim();
//     messageElement.innerText = apiResponseText;

//     // Add bot response to chat history
//     chatHistory.push({
//       role: "model",
//       parts: [{ text: apiResponseText }],
//     });
//   } catch (error) {
//     // Handle error in API response
//     console.log(error);
//     messageElement.innerText = error.message;
//     messageElement.style.color = "#ff0000";
//   } finally {
//     // Reset user's file data, removing thinking indicator and scroll chat to bottom
//     userData.file = {};
//     incomingMessageDiv.classList.remove("thinking");
//     chatBody.scrollTo({ top: chatBody.scrollHeight, behavior: "smooth" });
//   }
// };



// Handle outgoing user messages
const handleOutgoingMessage = (e) => {
  e.preventDefault();
  userData.message = messageInput.value.trim();
  messageInput.value = "";
  messageInput.dispatchEvent(new Event("input"));
  fileUploadWrapper.classList.remove("file-uploaded");

  // Create and display user message
  const messageContent = `<div class="message-text"></div>
                          ${userData.file.data ? `<img src="data:${userData.file.mime_type};base64,${userData.file.data}" class="attachment" />` : ""}`;

  const outgoingMessageDiv = createMessageElement(messageContent, "user-message");
  outgoingMessageDiv.querySelector(".message-text").innerText = userData.message;
  chatBody.appendChild(outgoingMessageDiv);
  chatBody.scrollTo({ top: chatBody.scrollHeight, behavior: "smooth" });

  // Simulate bot response with thinking indicator after a delay
  setTimeout(() => {
    const messageContent = `<svg class="bot-avatar" xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 1024 1024">
            <path
              d="M738.3 287.6H285.7c-59 0-106.8 47.8-106.8 106.8v303.1c0 59 47.8 106.8 106.8 106.8h81.5v111.1c0 .7.8 1.1 1.4.7l166.9-110.6 41.8-.8h117.4l43.6-.4c59 0 106.8-47.8 106.8-106.8V394.5c0-59-47.8-106.9-106.8-106.9zM351.7 448.2c0-29.5 23.9-53.5 53.5-53.5s53.5 23.9 53.5 53.5-23.9 53.5-53.5 53.5-53.5-23.9-53.5-53.5zm157.9 267.1c-67.8 0-123.8-47.5-132.3-109h264.6c-8.6 61.5-64.5 109-132.3 109zm110-213.7c-29.5 0-53.5-23.9-53.5-53.5s23.9-53.5 53.5-53.5 53.5 23.9 53.5 53.5-23.9 53.5-53.5 53.5zM867.2 644.5V453.1h26.5c19.4 0 35.1 15.7 35.1 35.1v121.1c0 19.4-15.7 35.1-35.1 35.1h-26.5zM95.2 609.4V488.2c0-19.4 15.7-35.1 35.1-35.1h26.5v191.3h-26.5c-19.4 0-35.1-15.7-35.1-35.1zM561.5 149.6c0 23.4-15.6 43.3-36.9 49.7v44.9h-30v-44.9c-21.4-6.5-36.9-26.3-36.9-49.7 0-28.6 23.3-51.9 51.9-51.9s51.9 23.3 51.9 51.9z"/></svg>
          <div class="message-text">
            <div class="thinking-indicator">
              <div class="dot"></div>
              <div class="dot"></div>
              <div class="dot"></div>
            </div>
          </div>`;

    const incomingMessageDiv = createMessageElement(messageContent, "bot-message", "thinking");
    chatBody.appendChild(incomingMessageDiv);
    chatBody.scrollTo({ top: chatBody.scrollHeight, behavior: "smooth" });
    generateBotResponse(incomingMessageDiv);
  }, 600);
};

// Adjust input field height dynamically
messageInput.addEventListener("input", () => {
  messageInput.style.height = `${initialInputHeight}px`;
  messageInput.style.height = `${messageInput.scrollHeight}px`;
  document.querySelector(".chat-form").style.borderRadius = messageInput.scrollHeight > initialInputHeight ? "15px" : "32px";
});

// Handle Enter key press for sending messages
messageInput.addEventListener("keydown", (e) => {
  const userMessage = e.target.value.trim();
  if (e.key === "Enter" && !e.shiftKey && userMessage && window.innerWidth > 768) {
    handleOutgoingMessage(e);
  }
});

// Handle file input change and preview the selected file
fileInput.addEventListener("change", () => {
  const file = fileInput.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = (e) => {
    fileInput.value = "";
    fileUploadWrapper.querySelector("img").src = e.target.result;
    fileUploadWrapper.classList.add("file-uploaded");
    const base64String = e.target.result.split(",")[1];

    // Store file data in userData
    userData.file = {
      data: base64String,
      mime_type: file.type,
    };
  };

  reader.readAsDataURL(file);
});

// Cancel file upload
fileCancelButton.addEventListener("click", () => {
  userData.file = {};
  fileUploadWrapper.classList.remove("file-uploaded");
});

// Initialize emoji picker and handle emoji selection
const picker = new EmojiMart.Picker({
  theme: "light",
  skinTonePosition: "none",
  previewPosition: "none",
  onEmojiSelect: (emoji) => {
    const { selectionStart: start, selectionEnd: end } = messageInput;
    messageInput.setRangeText(emoji.native, start, end, "end");
    messageInput.focus();
  },
  onClickOutside: (e) => {
    if (e.target.id === "emoji-picker") {
      document.body.classList.toggle("show-emoji-picker");
    } else {
      document.body.classList.remove("show-emoji-picker");
    }
  },
});

document.querySelector(".chat-form").appendChild(picker);

sendMessage.addEventListener("click", (e) => handleOutgoingMessage(e));
document.querySelector("#file-upload").addEventListener("click", () => fileInput.click());
closeChatbot.addEventListener("click", () => document.body.classList.remove("show-chatbot"));
chatbotToggler.addEventListener("click", () => document.body.classList.toggle("show-chatbot"));




// Text Animation Effect //

var typeWriting = new TypeWriting({
  targetElement   : document.getElementsByClassName('terminal')[0],
  inputString     : 'Hello, world.',
  typing_interval : 130, // Interval between each character
  blink_interval  : '1s', // Interval of the cursor blinks
  cursor_color    : '#00fd55', // Color of the cursor
  }, function() {
  console.log("END");
});



