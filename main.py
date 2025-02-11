from fastapi import FastAPI
from pydantic import BaseModel
import random

app = FastAPI()

# List of Hinglish dark humor responses
responses = [
    "Beta tumse na ho payega! 🤡",
    "Kya baat hai, aaj bade active lag rahe ho... koi kaam nahi hai kya? 😏",
    "Agar sarcasm bechta na, toh tu ab tak millionaire hota! 💰",
    "Ek kaam kar, so ja... warna duniya tujhe hila degi! 😂",
    "Haan bhai, tere bina duniya ruk jayegi! Chal aage badh... 🚶‍♂️",
    "Padhai likhai ki bhi soch liya kar, warna chatbot bhi tujhe judge karega! 📚😆",
    "Tera future bright hai... tube light ki tarah! 💡😜",
    "Aisa kya padh raha hai jo Google ko bhi confuse kar de? 🤔😂",
    "Bhai, tu soch raha hai ya processor hang ho gaya? 😆",
    "Tujhse zyada toh meri battery tez chalti hai! 🔋💨"
]

# Define a request model
class Message(BaseModel):
    message: str

# API endpoint to get chatbot responses
@app.post("/chat")
async def chat(message: Message):
    reply = random.choice(responses)
    return {"reply": reply}

