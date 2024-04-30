import threading
from quart import jsonify
from quart import Quart, request, jsonify

import os
from dotenv import load_dotenv, find_dotenv
from quart_cors import cors
load_dotenv(find_dotenv())

app = Quart(__name__, static_folder="static")
app = cors(app, allow_origin="*")

max_mb= 50
app.config['MAX_CONTENT_LENGTH'] = max_mb *1000 * 1024

import redis
import os
import json
redis_password = os.getenv('REDIS_PASSWORD')
redis_host = os.getenv('REDIS_HOST', 'localhost')
r = redis.Redis(host=redis_host, port=6379, decode_responses=True)

@app.route("/")
async def hello():
    return await app.send_static_file("index.html")

@app.route("/assets/bundle.js")
async def bundle():
    return await app.send_static_file("assets/bundle.js")

jobs = {}

@app.route('/status/<id>')
async def status(id):
    try:
        retrieved_data_string = r.get(id)
        current_job = json.loads(retrieved_data_string)
    except:
        print(f"problem with {id}")
        return jsonify({'status': 'starting'})

    return jsonify(current_job)

@app.route('/statuses')
async def statuses():
    return jsonify({'status': 'starting'})

class Article:
    def __init__(self, text, novice, intermediate, expert, textV2):
        self.text = text
        self.novice = novice
        self.intermediate = intermediate
        self.expert = expert
        self.textV2 = textV2

    def to_dict(self):
        return {
            'text': self.text,
            'novice': self.novice,
            'intermediate': self.intermediate,
            'expert': self.expert,
            'textV2': self.textV2
        }

def decode_article(file, job_id):
    r.set(job_id, json.dumps({'status': 'starting'}))

    with open('/app/load1.json', 'r') as file:
        data = json.load(file)

    data_arr = data['data']
    article_text = ""
    novice = {}
    intermediate = {}
    expert = {}
    textV2 = []

    for row in data_arr:
        article_text = "".join([article_text, f"{row['text']}"])
        textV2.append(row["text"])
        for field in row['novice'].keys():
            novice[field] = {'explanation': row['novice'][field]['explanation'], 'url': row['novice'][field]['url'], 'title': row['novice'][field]['title']}
        for field in row['intermediate'].keys():
            intermediate[field] = {'explanation': row['intermediate'][field]['explanation'], 'url': row['intermediate'][field]['url'], 'title': row['intermediate'][field]['title']}
        for field in row['expert'].keys():
            expert[field] = {'explanation': row['expert'][field]['explanation'], 'url': row['expert'][field]['url'], 'title': row['expert'][field]['title']}

    response = Article(text=article_text, novice=novice, intermediate=intermediate, expert=expert, textV2=textV2)

    r.set(job_id, json.dumps(response.to_dict()))


@app.route('/upload', methods=['POST'])
async def upload():
    if request.method == "POST":
        if  request.files:
            try:
                file = (await request.files)['file']
            except Exception as e:
                print(f"An error occurred: {e}")

            import uuid

            my_uuid = uuid.uuid4()
            job_id = str(my_uuid)
            print(f"about to generate new thread with {job_id}")
            thread = threading.Thread(target=decode_article, args=(file, job_id))
            thread.start()

    return {"JobId": job_id}

def create_app():
    return app

if __name__ == "__main__":
    app.run()