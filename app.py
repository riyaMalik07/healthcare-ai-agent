from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Allow frontend to connect
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def home():
    return {"message": "Healthcare AI Agent Running"}


@app.get("/predict")
def predict(symptoms: str):

    symptoms = symptoms.lower()

    if "fever" in symptoms:
        return {
            "disease": "Flu",
            "urgency": "Moderate",
            "medicine": "Paracetamol"
        }

    elif "headache" in symptoms:
        return {
            "disease": "Migraine",
            "urgency": "Low",
            "medicine": "Ibuprofen"
        }

    else:
        return {
            "disease": "Common Cold",
            "urgency": "Low",
            "medicine": "Cetirizine"
        }