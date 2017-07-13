from flask import Flask, request, render_template, url_for
from flask_socketio import SocketIO, emit
import json

app = Flask(__name__)
socketio = SocketIO(app)

@app.route("/")
def main():
	return render_template('DrawIndex.html')

@socketio.on('connect')
def connect():
	emit('message', {'hello': "Hello"})
	
@app.route("/updateCanvas/<line>", methods=['POST'])
def updateCanvas(line):
	socketio.emit('message', json.loads(line), broadcast=True)
	return "OK"
	
if __name__ == "__main__":
	socketio.run(app)