#!flask/bin/python
from flask import Flask, request, jsonify
import sys
from flask_cors import CORS

app = Flask(__name__)
cors = CORS(app, resources={r"/*": {"origins": "*"}})

@app.route('/', methods=['POST'])
def compute():
    return jsonify({ 'data': request.json})

if __name__ == '__main__':
    app.run(debug=True)