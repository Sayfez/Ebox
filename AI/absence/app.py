from flask import Flask,jsonify,request
import pymongo
import pandas as pd 
from flask_cors import CORS


myclient = pymongo.MongoClient("mongodb://localhost:27017/")

mydb = myclient["GestionPresence"]

app=Flask(__name__)
CORS(app) # This will enable CORS for all routes

@app.route('/res/<user_id>',methods=["GET"])
def get_res(user_id):
    if request.method=="GET":
        mycol = mydb["users"]
        myquery = { "_id":user_id }
        
        predicted_data=pd.read_csv("C:/Users/Asus/Documents/PFE/AI/absence/results.csv")

        # mydoc = mycol.find(myquery)
        # print("hell omydoc : ",mydoc)

        # for item in mydoc:
        #     print("item : ",item)
        print(" predicted_data : ", predicted_data)

        response=predicted_data.to_json()

        return response # jsonify(predicted_data.to_json())



if __name__=='__main__':
    app.run(debug=True)