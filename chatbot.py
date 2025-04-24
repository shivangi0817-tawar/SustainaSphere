import re
from flask import Flask, request, jsonify
from flask_cors import CORS
import random

app = Flask(__name__)
CORS(app)
pairs = {
    r"\b(hi|hello|hey)\b": "Hello! 🌍 I'm your sustainability chatbot. Ask me anything about eco-friendly living! 🌱",
    r"\b(what is sustainability|define sustainability)\b": "Sustainability means using resources responsibly to ensure a healthy planet for future generations. 🌿",
    r"\b(how can I live sustainably|ways to live sustainable life)\b": "You can start by:\n- Reducing waste ♻️\n- Conserving water 🚰\n- Using renewable energy ☀️\n- Choosing eco-friendly transport 🚲",
    r"\b(how to save energy|tips to save energy)\b": "To save energy:\n🔌 Unplug devices when not in use.\n💡 Use LED bulbs.\n🌞 Rely on natural light during the day.",
    r"\b(how to reduce plastic waste|tips to save plastic)\b": "Avoid single-use plastics! 🌊\n- Carry a reusable bottle 🥤\n- Use cloth bags instead of plastic 🛍️\n- Say NO to plastic straws 🚫",
    r"\b(how to save water|tips to save water)\b": "Water conservation tips 💧:\n- Take shorter showers 🚿\n- Fix leaks 🛠️\n- Collect rainwater for plants 🌱",
    r"\b(bye|goodbye|exit|end)\b": "Goodbye! 🌎 Keep making eco-friendly choices every day! 💚"
}
sustainability_facts = [
    "Recycling just 1 aluminum can saves enough energy to power a TV for 3 hours! 📺",
    "If you leave the tap running while brushing, you waste 4 gallons of water per minute. 🚰",
    "LED bulbs use 75% less energy and last 25 times longer than incandescent bulbs! 💡",
    "Producing 1 hamburger requires 660 gallons of water—that's like showering for two months! 🍔",
    "8 million tons of plastic enter our oceans every year. Reduce, reuse, and recycle! 🌊♻️",
    "Planting just one tree can absorb over 48 lbs of CO2 per year! 🌳",
    "Every second, a garbage truck's worth of plastic is dumped into our oceans. Reduce single-use plastics! 🚮"
]
eco_challenges = [
    "🌱 Challenge: Go plastic-free for 24 hours! Avoid bottled water and plastic bags. ♻️",
    "💡 Challenge: Turn off lights and electronics when not in use today! 🔌",
    "🚲 Challenge: Walk, bike, or use public transport instead of driving today! 🏃‍♂️",
    "🛍️ Challenge: Bring your own reusable bag when shopping. No plastic allowed! 🛒",
    "🍽️ Challenge: Eat a plant-based meal today to reduce your carbon footprint! 🥗",
    "🌳 Challenge: Plant a tree or take care of a plant at home! 🌿"
]
def get_response(user_message):
    user_message = user_message.lower()
    if "fact" in user_message or "tell me something" in user_message:
        return random.choice(sustainability_facts)
    if "challenge" in user_message or "give me a task" in user_message:
        return random.choice(eco_challenges)
    for pattern, response in pairs.items():
        if re.search(pattern, user_message):
            return response
    
    return "I'm still learning! 🤔 Ask me about sustainability, or type 'fact' for an interesting eco-fact!"

@app.route("/", methods=["GET"])
def chatbot_response():
    user_message = request.args.get("msg", "").lower()
    response = get_response(user_message)
    return jsonify({"response": response})

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8000, debug=True)
