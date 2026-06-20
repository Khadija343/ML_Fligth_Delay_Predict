from flask import Flask, request, jsonify
from flask_cors import CORS
import numpy as np
import pickle
# INITIALIZE FLASK
app = Flask(__name__)
CORS(app)
# LOAD MODEL & SCALER
model = pickle.load(open('flight_delay_model.pkl', 'rb'))
scaler = pickle.load(open('scaler.pkl', 'rb'))
# LOAD ENCODERS
season_encoder = pickle.load(
    open('season_encoder.pkl', 'rb'))
airline_encoder = pickle.load(
    open('airline_encoder.pkl', 'rb'))
aircraft_encoder = pickle.load(
    open('aircraft_encoder.pkl', 'rb'))
airport_encoder = pickle.load(
    open('airport_encoder.pkl', 'rb'))
# HOME ROUTE
@app.route('/')
def home():
    return jsonify({
        "message": "Flight Delay Prediction API Running"})
# PREDICTION ROUTE
@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.get_json()
        # CONVERT STRINGS TO NUMBERS USING ENCODERS
        season = season_encoder.transform(
            [data['season']]
        )[0]
        airline_type = airline_encoder.transform(
            [data['airline_type']]
        )[0]

        aircraft_type = aircraft_encoder.transform(
            [data['aircraft_type']]
        )[0]

        airport_category = airport_encoder.transform(
            [data['airport_category']]
        )[0]

        # ===================================================
        # IMPORTANT USER INPUTS ONLY
        # ===================================================

        flight_distance_km = float(
            data['flight_distance_km']
        )

        departure_hour = float(
            data['departure_hour']
        )

        weather_severity_index = float(
            data['weather_severity_index']
        )

        wind_speed_kmh = float(
            data['wind_speed_kmh']
        )

        visibility_km = float(
            data['visibility_km']
        )

        airport_congestion_level = float(
            data['airport_congestion_level']
        )

        # ===================================================
        # AUTO-FILLED FEATURES
        # ===================================================

        arrival_hour = departure_hour + 2

        flight_duration_min = 120

        day_of_week = 3

        month = 7

        historical_delay_rate = 0.35

        route_popularity = 6

        fuel_load_pct = 75

        crew_availability_score = 8

        maintenance_risk_score = 4

        holiday_peak_indicator = 0

        atc_delay_factor = 3
        # ==================================
        # FEATURE ORDER MUST MATCH TRAINING
        # ==================================
        features = [

            flight_distance_km,
            departure_hour,
            arrival_hour,
            flight_duration_min,
            day_of_week,
            month,

            season,
            airline_type,
            aircraft_type,
            airport_category,

            weather_severity_index,
            wind_speed_kmh,
            visibility_km,
            airport_congestion_level,

            historical_delay_rate,
            route_popularity,
            fuel_load_pct,
            crew_availability_score,
            maintenance_risk_score,

            holiday_peak_indicator,
            atc_delay_factor

        ]

        # ===================================================
        # CONVERT TO NUMPY ARRAY
        # ===================================================

        features_array = np.array(
            features
        ).reshape(1, -1)

        # ===================================================
        # APPLY SCALER
        # ===================================================

        scaled_features = scaler.transform(
            features_array
        )

        # ===================================================
        # MODEL PREDICTION
        # ===================================================

        prediction = model.predict(
            scaled_features
        )[0]

        probability = model.predict_proba(
            scaled_features
        )[0][1]

        # ===================================================
        # RESULT
        # ===================================================

        result = (
            "Delayed"
            if prediction == 1
            else "On Time"
        )

        # ===================================================
        # RESPONSE
        # ===================================================

        return jsonify({

            "prediction": int(prediction),

            "result": result,

            "delay_probability": round(
                float(probability),
                4
            )

        })

    except Exception as e:

        return jsonify({

            "error": str(e)

        })

# ===================================================
# RUN SERVER
# ===================================================

if __name__ == '__main__':

    app.run(debug=True)