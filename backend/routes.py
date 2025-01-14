from app import app, db
from flask import request, jsonify
from models import Employee


# Get all employees
@app.route("/api/employees",methods=["GET"])
def get_employees():
    employees = Employee.query.all()
    result = [employee.to_json() for employee in employees]   # --> [{...}, {...}, {...}]
    return jsonify(result)
    

# Create a employee
@app.route("/api/employees",methods=["POST"])
def create_employee():
    try:
        data = request.json

        # Validations
        required_fields = ["name", "role", "description", "gender"]
        for field in required_fields:
            if field not in data or not data.get(field):
                return jsonify({"error":f"Missing required field: {field}"}),400

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

        new_employee = Employee(name=name, role=role, description=description, gender=gender, img_url=img_url)

        db.session.add(new_employee)        

        db.session.commit()

        return jsonify(new_employee.to_json()), 201
    
    except Exception as e:
        db.session.rollback()
        return jsonify({"error":str(e)}), 500
    

# Delete a employee
@app.route("/api/employees/<int:id>",methods=["DELETE"])
def delete_employee(id):
    try:
        employee = Employee.query.get(id)
        if employee is None:
            return jsonify({"error":"Employee not found"}), 404
        
        db.session.delete(employee)
        db.session.commit()
        return jsonify({"msg":"Employee deleted"}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"error",str(e)}), 500
    

# Update a employee
@app.route("/api/employees/<int:id>",methods=["PATCH"])
def update_employee(id):
    try:
        employee = Employee.query.get(id)
        if employee is None:
            return jsonify({"error":"Employee not found"}), 404

        data = request.json

        employee.name = data.get("name",employee.name)
        employee.role = data.get("role",employee.role)
        employee.description = data.get("description",employee.description)
        employee.gender = data.get("gender",employee.gender)

        db.session.commit()

        return jsonify(employee.to_json()), 200
    
    except Exception as e:
        db.session.rollback()
        return jsonify({"error":str(e)}), 500