from fastapi import FastAPI

app = FastAPI()

@app.get("/")
def home():
    return {"message": "Healthcare AI Agent Started"}

@app.get("/predict")
def predict():
    return {
        "disease": "Common Cold",
        "urgency": "Low",
        "medicine": "Paracetamol",
        "generic": "Acetaminophen"
    }