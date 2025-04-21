from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__, static_folder='frontend/build', static_url_path='/')
CORS(app)

# shared in-memory state
MAX_HARDWARE = 10
available_hardware = MAX_HARDWARE
project_checkouts = {}  # { projectId: qty_checked_out }

@app.route('/')
def index():
    return app.send_static_file('index.html')


@app.route('/join')
def join():
    projectId = request.args.get('projectId')
    return jsonify({'message': f'Joined {projectId}'})


@app.route('/leave')
def leave():
    projectId = request.args.get('projectId')
    return jsonify({'message': f'Left {projectId}'})


@app.route('/checkout')
def checkout():
    global available_hardware
    projectId = request.args.get('projectId')
    qty = int(request.args.get('qty'))

    if qty > available_hardware:
        return jsonify({'message': f'Only {available_hardware} items available. Cannot check out {qty}.'}), 400

    # Deduct from available pool
    available_hardware -= qty

    # Track project-level checkout
    if projectId not in project_checkouts:
        project_checkouts[projectId] = 0
    project_checkouts[projectId] += qty

    return jsonify({
        'message': f'{qty} hardware checked out from project {projectId}',
        'available': available_hardware,
        'projectQty': project_checkouts[projectId]
    })


@app.route('/checkin')
def checkin():
    global available_hardware
    projectId = request.args.get('projectId')
    qty = int(request.args.get('qty'))

    # Check if this project has enough to return
    if projectId not in project_checkouts or qty > project_checkouts[projectId]:
        return jsonify({'message': f'Cannot check in {qty}. Project {projectId} has only {project_checkouts.get(projectId, 0)} checked out.'}), 400

    # Update values
    available_hardware += qty
    project_checkouts[projectId] -= qty

    return jsonify({
        'message': f'{qty} hardware checked in to project {projectId}',
        'available': available_hardware,
        'projectQty': project_checkouts[projectId]
    })


@app.route('/status')
def status():
    projectId = request.args.get('projectId')
    return jsonify({
        'available': available_hardware,
        'projectQty': project_checkouts.get(projectId, 0)
    })


if __name__ == '__main__':
    app.run()
