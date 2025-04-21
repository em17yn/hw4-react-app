from flask import Flask, request, jsonify

app = Flask(__name__)

@app.route('/checkin', methods=['GET'])
def checkIn_hardware():
    projectId = request.args.get('projectId')
    qty = request.args.get('qty')
    return jsonify({'message': f'{qty} hardware checked in to project {projectId}'})

@app.route('/checkout', methods=['GET'])
def checkOut_hardware():
    projectId = request.args.get('projectId')
    qty = request.args.get('qty')
    return jsonify({'message': f'{qty} hardware checked out from project {projectId}'})

@app.route('/join', methods=['GET'])
def joinProject():
    projectId = request.args.get('projectId')
    return jsonify({'message': f'Joined {projectId}'})

@app.route('/leave', methods=['GET'])
def leaveProject():
    projectId = request.args.get('projectId')
    return jsonify({'message': f'Left {projectId}'})

if __name__ == '__main__':
    app.run(debug=True)
