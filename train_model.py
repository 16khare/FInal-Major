import pandas as pd
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score
import pickle

# Load dataset
df = pd.read_csv("Crop_recommendation.csv")

# Check for missing values
if df.isnull().values.any():
    print("Dataset contains missing values. Please clean it before training.")
    exit()

# Features and Target
X = df.drop("label", axis=1)  # Features: N, P, K, temperature, humidity, ph, rainfall
y = df["label"]               # Target: Crop label

# Split the dataset (80% training, 20% testing)
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Initialize and train the model
model = RandomForestClassifier(n_estimators=100, random_state=42)
model.fit(X_train, y_train)

# Evaluate the model
y_pred = model.predict(X_test)
accuracy = accuracy_score(y_test, y_pred)
print(f"✅ Model Trained. Accuracy: {accuracy * 100:.2f}%")

# Save the trained model to a file
with open("crop_model.pkl", "wb") as f:
    pickle.dump(model, f)

print("✅ Model saved as 'crop_model.pkl'")
