from flask import Flask, render_template
from flask_socketio import SocketIO, send
from dotenv import load_dotenv
import os

load_dotenv()

app = Flask(__name__)
app.config['SECRET_KEY'] = os.getenv('SECRET_KEY')

socketio = SocketIO(app)

@app.route("/")
def hello_world():
    return render_template('index.html')

# receives the incoming message from the front end, and then sends the message back to the frontend of the other user
@socketio.on('message')
def handle_message(data):
    send(data)


if __name__ == "__main__":
    socketio.run(app, debug=True)