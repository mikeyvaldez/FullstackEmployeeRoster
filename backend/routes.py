from app import app, db
from flask import request, jsonify, session
from flask_bcrypt import Bcrypt
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
from models import User, Employee


#Initialize extensions
bcrypt = Bcrypt(app)
jwt = JWTManager(app)

# ======================================================================================

# Registration endpoint (CREATE A USER) ------------------------------------------------
@app.route('/api/register', methods=['POST'])
def register():
    data = request.get_json()


    # Check if the email already exists
    existing_user = User.query.filter_by(email=data['email']).first()
    if existing_user:
        return jsonify({"message": "Email already registered"}), 400


    # Hash the password
    hashed_password = bcrypt.generate_password_hash(data['password']).decode('utf-8')

    # Create a new user
    try:
        new_user = User(
            first_name=data['first_name'], 
            last_name=data['last_name'], 
            email=data['email'], 
            password=hashed_password
        )
        db.session.add(new_user)
        db.session.commit()

        return jsonify({"message": "User registered successfully"}), 201
    except Exception as e:
        db.session.rollback()  # Rollback in case of an error during commit
        return jsonify({"message": "An error occurred while creating the user", "error": str(e)}), 500
# ------------------------------------------------------------------------------------

# Authentication EndPoint (USER LOGIN)------------------------------------------------
@app.route('/api/login', methods=['POST'])
def login():
    data = request.get_json()

    # Find the user by user
    user = User.query.filter_by(email=data['email']).first()

    if not user or not bcrypt.check_password_hash(user.password, data['password']):
        return jsonify({"message": "Invalid credentials"}), 401
    
    # Generate a JWT token
    access_token = create_access_token(identity=str(user.id))

    return jsonify({
        "first_name": user.first_name,
        "last_name": user.last_name,
        "email": user.email,
        "message": "Login successful",
        "access_token": access_token
    }), 200
# -------------------------------------------------------------------------------------

# Get All Users -----------------------------------------------------------------------
@app.route("/api/users", methods=['GET'])
def get_users():
    all_users = User.query.all()
    result = [user.to_json() for user in all_users] # --> [{...}, {...}, {...}]
    return jsonify(result)
# ------------------------------------------------------------------------------------

#Get current User -------------------------------------------------------------------
@app.route("/api/current_user", methods=['GET'])
@jwt_required()
def get_current_user():
    current_user = get_jwt_identity()
    user = User.query.filter_by(id=current_user).first()
    
    if user:
        return jsonify({
            'first_name': user.first_name,
            'last_name': user.last_name,
            'email': user.email,
        })
    else:
        return jsonify({'message': 'User not found'}), 404
# ----------------------------------------------------------------------------------

# Protected endpoint to get user data (requires authentication)------------------------
# to check user authentication and get user credentials
@app.route('/api/protected', methods=['GET'])
@jwt_required()
def protected():
    # Get the current user from the JWT  token
    current_user_id = get_jwt_identity()
    user = User.query.get_or_404(current_user_id)

    return jsonify({
        "message": "Access granted",
        "user": {
            "first_name": user.first_name,
            "last_name": user.last_name,
            "email": user.email
        }
    }), 200
#-------------------------------------------------------------------------

# Delete User route -----------------------------------------------------
@app.route('/api/delete_user', methods=['DELETE'])
@jwt_required()  # Ensure the user is authenticated with a valid token
def delete_user():
    try:
        # Get the current user's identity from the JWT token
        current_user_id = get_jwt_identity()

        # Find the user in the database using the ID
        user = User.query.get(current_user_id)

        # If the user doesn't exist
        if user is None:
            return jsonify({"message": "User not found"}), 404
        
        # Delete the user from the database
        db.session.delete(user)
        db.session.commit()

        # Return success message
        return jsonify({"message": "User deleted successfully"}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"error",str(e)}), 500
    
# ===================================================================================

# employee routes ===================================================================
# Create a employee -------------------------------------------------------------------
@app.route("/api/employee/create_employee",methods=["POST"])
@jwt_required()
def create_employee():
    try:
        # Get the current user's ID from the JWT token
        current_user_id = get_jwt_identity()

        # Get data from the request body
        data = request.get_json()
        
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

        new_employee = Employee(name=name, employer_id=current_user_id, role=role, description=description, gender=gender, img_url=img_url)

        db.session.add(new_employee)        

        db.session.commit()

        return jsonify(new_employee.to_json()), 201
    
    except Exception as e:
        db.session.rollback()
        return jsonify({"error":str(e)}), 500
#------------------------------------------------------------------------------------

# Get all employees------------------------------------------------------------------
@app.route("/api/employee/get_employees", methods=['GET'])
@jwt_required()
def get_employees():
    # Get the current user's ID from the JWT token
    current_user_id = get_jwt_identity()

    # user = User.query.get(session['current_user_id'])

    employees = Employee.query.filter_by(employer_id=current_user_id).all()
    result = [employee.to_json() for employee in employees] # --> [{...}, {...}, {...}]
    return jsonify(result)


# Update an employee ----------------------------------------------------------------
@app.route("/api/employee/<int:id>", methods=["PATCH"])
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
#--------------------------------------------------------------------------

# Delete a employee --------------------------------------------------------
@app.route("/api/employee/<int:id>",methods=["DELETE"])
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
#------------------------------------------------------------------------------
#===============================================================================