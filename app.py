from flask import Flask, request, jsonify
import joblib
import numpy as np
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Load the trained model
model = joblib.load("crop_model.pkl")

@app.route('/predict', methods=['POST'])
def predict():
    # Get input data from the request
    data = request.json
    
    # Extract the required features (adjust based on your dataset)
    features = [[
        data['N'],           # Nitrogen (N)
        data['P'],           # Phosphorus (P)
        data['K'],           # Potassium (K)
        data['temperature'], # Temperature (°C)
        data['humidity'],    # Humidity (%)
        data['ph'],          # Soil pH
        data['rainfall']     # Rainfall (mm)
    ]]
    
    # Make the prediction
    prediction = model.predict(features)
    
    # Return the result as JSON
    return jsonify({"recommended_crop": prediction[0]})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5001, debug=True)
