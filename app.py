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


if __name__ == "__main__":
    socketio.run(app, debug=True)