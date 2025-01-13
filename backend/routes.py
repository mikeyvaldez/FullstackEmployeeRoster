from app import app, db
from flask import request, jsonify
from models import Person


# Get all people
@app.route("/api/people",methods=["GET"])
def get_people():
    people = Person.query.all()
    result = [person.to_json() for person in people]   # --> [{...}, {...}, {...}]
    return jsonify(result)
    

# Create a person
@app.route("/api/people",methods=["POST"])
def create_person():
    try:
        data = request.json

        required_fields = ["name", "role", "description", "gender"]
        for field in required_fields:
            if field not in data:
                return jsonify({"error":f"Missing required field: field"}),400

        name = data.get("name")
        role = data.get("role")
        description = data.get("description")
        gender = data.get("gender")

        # Fetch avatar image based on gender
        if gender == "male":
            img_url = f"https://avatar.iran.liara.run/public/boy?username={name}"
        elif gender == "female":
            img_url = f"https://avatar.iran.liara.run/public/girl?username={name}"
        else:
            img_url = None

        new_person = Person(name=name, role=role, description=description, gender=gender, img_url=img_url)

        db.session.add(new_person)        

        db.session.commit()

        return jsonify({"msg":"Person created successfully"}), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({"error":str(e)}), 500