import json, socket
import pymongo as pym
from bson.objectid import ObjectId

from flask_cors import CORS
from flask import Flask, request
app = Flask(__name__)
cors = CORS(app)

#indirizzo ip della mia macchina a casa mia
client = pym.MongoClient('192.168.1.253', 27017)
db = client['facebook-like-db']
collection = db['posts']


def getData():
    datas = collection.find()
    out = ''
    for data in datas:
        id = data.pop("_id")
        data["id"] = str(id)
        print(data)
        out += str(data).replace("'", '"') + ','
    return '['+out[:-1]+']'

def insertPost(post):
    collection.insert_one(post)

def change_like(post):
  collection.update_one({'_id': ObjectId(post["id"])}, {'$set':{"like":post["like"]}})


def add_comment_to_db(post):
  collection.update_one({'_id': ObjectId(post["id"])}, {"$push":{"commenti":{"testoCommento":post["comment"]}}})
  

@app.route('/index',methods = ['GET'])
def index():
  return getData()





@app.route('/add_comment',methods = ['POST'])
def add_comment():
  data = request.get_json()
  try:
    post = {
      "id": data["id"],
      "comment": data["comment"]
    }
    add_comment_to_db(post)
    return '{"info": "Comment add complete"}'
  except Exception as e:
    print(e)
    return '{"Error": "Errore nell aggiunta del commento"}'













@app.route('/add_like',methods = ['POST'])
def add_like():
  data = request.get_json()
  try:
    post = {
      "id": data["id"],
      "like": data["like"]
    }
    change_like(post)
    return '{"info": "Like update complete"}'
  except Exception as e:
    print(e)
    return '{"Error": "Errore nel cambio dei like"}'


@app.route('/add_post',methods = ['POST'])
def add_post():
  data = request.get_json()
  try:
    post = {
      "autorePost": data["autorePost"],
      "testoPost": data["testoPost"],
      "like": 0,
      "commenti": []
    }
    insertPost(post)
    return '{"info": "Post aggiunto"}'
  except Exception as e:
    print(e)
    return '{"Error": "Errore nell aggiunta del post"}'


    

s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
s.connect(("8.8.8.8", 80))
ip = s.getsockname()[0]
s.close()


app.run(host=ip, port=8080)





''' 
{
  "_id": {
    "$oid": "63d6560b0c430f6299827846"
  },
  "autorePost": "pippo",
  "testoPost": "testooo",
  "like": 0,
  "commenti": [
    {
      "testoCommento": "com1"
    },
    {
      "testoCommento": "com2"
    },
    {
      "testoCommento": "com3"
    }
  ]
}
'''