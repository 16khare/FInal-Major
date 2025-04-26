import pickle
import numpy as np

# Load the trained model
with open("crop_model.pkl", "rb") as f:
    model = pickle.load(f)

# Example test input
# Format: [N, P, K, temperature, humidity, ph, rainfall]
test_input = np.array([[90, 42, 43, 20.87, 82.00, 6.5, 202.93]])

# Make prediction
prediction = model.predict(test_input)

print("✅ Recommended Crop:", prediction[0])
