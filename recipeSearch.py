from flask import Flask, request, jsonify, render_template
from pymongo import MongoClient
from config import MONGO_URI
from flask_cors import CORS
import requests

app = Flask(__name__)
CORS(app)


client = MongoClient(MONGO_URI)
db = client['recipe_db']
collection = db['recipes']

#Get them from EDAMAME API
API_ID = 'API_ID'
API_KEY = 'API_KEY'


@app.route('/whatcanimake')
def what_can_i_make():
    render_template('whatcanimake.js')


@app.route('/', methods=['GET'])
def get_recipes():

    search_query = request.args.get('query')
    diet = request.args.get('diet')
    health = request.args.get('health')
    cuisineType = request.args.get('cuisineType')
    mealType = request.args.get('mealType')
    dishType = request.args.get('dishType')


    existing_recipe = collection.find_one({
        'search_query': search_query,
        'diet': diet,
        'health': health,
        'cuisineType': cuisineType,
        'mealType': mealType,
        'dishType': dishType
    })

    if existing_recipe:
        return jsonify(existing_recipe['recipe_data'])




    params = {
        'type': 'public',
        'q': search_query,
        'app_id': API_ID,
        'app_key': API_KEY,
        
    }


    if health:
        params['health'] = health
    if cuisineType:
        params['cuisineType'] = cuisineType
    if diet:
        params['diet'] = diet
    if mealType:
        params['mealType'] = mealType
    if dishType:
        params['dishType'] = dishType


    
    
    response = requests.get('https://api.edamam.com/api/recipes/v2', params=params)
    try:
        #response.raise_for_status()  # Raise an exception for non-200 status codes
        recipe_data = response.json()
        collection.insert_one({
            'search_query': search_query,
            'diet': diet,
            'health': health,
            'cuisineType': cuisineType,
            'mealType': mealType,
            'dishType': dishType,
            'recipe_data': recipe_data
        })
        return jsonify(recipe_data)
    except Exception as e:
      #  traceback.print_exc()  # Print the traceback to see the exact error
        return jsonify({'error': 'Request failed'})




if __name__ == '__main__':
    app.run(debug=True)
