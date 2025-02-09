from app import db

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)    
    first_name = db.Column(db.String(100), nullable=False)
    last_name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(120), nullable=False)

    def to_json(self):
        return {
            "id":self.id,
            "first_name":self.first_name,
            "last_name":self.last_name,
            "email":self.email,
            "password":self.password,
        }

class Employee(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    employer_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    name = db.Column(db.String(100), nullable=False)
    role = db.Column(db.String(50), nullable=False)
    description = db.Column(db.Text, nullable=False)
    gender = db.Column(db.String(50), nullable=False)
    img_url = db.Column(db.String(200), nullable=True)
    

    # when you want to send data to a client, it needs to be in json format
    # this is a convenient function to convert the data to json 
    def to_json(self):
        return {
            "id":self.id,
            "employer_id":self.employer_id,
            "name":self.name,
            "role":self.role,
            "description":self.description,
            "gender":self.gender,
            "imgUrl":self.img_url,
        }