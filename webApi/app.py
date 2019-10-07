#!flask/bin/python
from flask import Flask, request, jsonify
import sys
from flask_cors import CORS
from process import knn, naiveBayes, randomForest
import numpy as np

app = Flask(__name__)
cors = CORS(app, resources={r"/*": {"origins": "*"}})

@app.route('/', methods=['POST'])
def compute():
    ratingKNN = knn(request.json['taille'], request.json['categorie'], request.json['prix'], request.json['nbLang'], request.json['nb_devices'], request.json['nbAvisTotal'])
    ratingNB = naiveBayes(request.json['taille'], request.json['categorie'], request.json['prix'], request.json['nbLang'], request.json['nb_devices'], request.json['nbAvisTotal'])
    ratingRF = randomForest(request.json['taille'], request.json['categorie'], request.json['prix'], request.json['nbLang'], request.json['nb_devices'], request.json['nbAvisTotal'])
    maxRating = max(ratingKNN[0], ratingNB[0], ratingRF[0])
    return jsonify({ 'rating': np.int(maxRating)})

if __name__ == '__main__':
    app.run(debug=True)