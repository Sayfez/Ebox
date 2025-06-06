from flask import Flask,jsonify,request
import pymongo
import pandas as pd 
from flask_cors import CORS
import csv

myclient = pymongo.MongoClient("mongodb://localhost:27017/")

mydb = myclient["GestionPresence"]

app=Flask(__name__)
CORS(app) # This will enable CORS for all routes

def recherche_data_par_email(fichier_csv,email):
    try:
        with open(fichier_csv,mode='r',newline='') as csvfile:
            reader=csv.DictReader(csvfile)
            for row in reader:
                if row["Email"]==email:
                    return row
            return None
    except FileNotFoundError:
        print(f"Le fichier {fichier_csv} est introuvable")
        return None
    except Exception as ir:
        print(f"Erreur lors de la lecture de fichier CSV : {ie}")
        return None


@app.route('/res/<email>',methods=["GET"])
def get_res(email):
    
    if request.method=="GET":
    
        predicted_data=pd.read_csv("C:/Users/Asus/Documents/PFE/absence/f_results.csv")
        result_csv_path="C:/Users/Asus/Documents/PFE/absence/f_results.csv"

        res=recherche_data_par_email(result_csv_path,email)
        if res :
            Predicted_y=res["Predicted y"]

            response={
                "status":200,
                "message":"predicted y",
                "data":Predicted_y
            }
            return response,200
        else:
            response={
                "status":404,
                "message":"Mail not found"
                
            }
            return response,404


if __name__=='__main__':
    app.run(debug=True)