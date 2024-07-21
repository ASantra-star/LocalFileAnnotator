from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
import os

app = Flask(__name__)
CORS(app)  # Enable CORS

@app.route('/api/annotations', methods=['POST'])
def save_annotation():
    data = request.json
    print(f"Annotation received: {data}")
    return jsonify({"status": "success"}), 201

@app.route('/files/<path:filename>', methods=['GET'])
def serve_file(filename):
    return send_from_directory(directory='files', filename=filename)

if __name__ == '__main__':
    if not os.path.exists('files'):
        os.makedirs('files')
    app.run(debug=True)
