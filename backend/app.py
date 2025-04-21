from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__, static_folder='../client/build', static_url_path='/')
CORS(app)

@app.route('/')
def index():
    return app.send_static_file('index.html')

@app.route('/join')
def join():
    project_id = request.args.get('projectId')
    return jsonify({'message': f'Joined {project_id}'})

@app.route('/leave')
def leave():
    project_id = request.args.get('projectId')
    return jsonify({'message': f'Left {project_id}'})

@app.route('/checkin')
def checkin():
    project_id = request.args.get('projectId')
    qty = request.args.get('qty')
    return jsonify({'message': f'{qty} hardware checked in to project {project_id}'})

@app.route('/checkout')
def checkout():
    project_id = request.args.get('projectId')
    qty = request.args.get('qty')
    return jsonify({'message': f'{qty} hardware checked out from project {project_id}'})

if __name__ == '__main__':
    app.run()
