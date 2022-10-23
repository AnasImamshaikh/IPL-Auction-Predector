# encoding: utf-8
import json
from flask import Flask, request, jsonify
import pickle
import numpy as np
from flask_cors import CORS, cross_origin

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

model = pickle.load(open('model.pkl', 'rb'))

@app.route('/api',methods=['POST'])
@cross_origin()
def predict():
    try:
        data = request.get_json(force=True)
        print("Data: ",data)
        l = [] 
        for i in data:
            l.append(float(data[i]))
        print("List: ",l)
        prediction = model.predict([np.array(l)])

        output = prediction[0]*100
        return jsonify(output)
    except Exception as e:
        print("Error: ",e)
        return jsonify("Error: ",e)

if __name__ == '__main__':
    print("Server is running at port 5000.")
    app.run(port=5000, debug=True)