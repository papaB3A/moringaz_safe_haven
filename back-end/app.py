from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_jwt_extended import create_access_token, JWTManager, jwt_required, get_jwt_identity
from flask_cors import CORS
from werkzeug.security import check_password_hash, generate_password_hash
from datetime import timedelta
from dotenv import load_dotenv
import os
import uuid


#.env
# load the environmental variable from .env file
load_dotenv()

app = Flask(__name__)
CORS(app)  # Allow cross-origin requests from frontend

DB_CONFIG={
    "dbname":os.getenv("DB_NAME"),
    "user":os.getenv("DB_USER"),
    "password":os.getenv("DB_PASSWORD"),
    "host":os.getenv("DB_HOST"),
    "port":os.getenv("DB_PORT")
}

# Database Configuration
# app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://username:password@localhost/dbname'
app.config['SQLALCHEMY_DATABASE_URI']=f"postgresql://{DB_CONFIG['user']}:{DB_CONFIG['password']}@{DB_CONFIG['host']}:{DB_CONFIG['port']}/{DB_CONFIG['dbname']}"
# app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config["JWT_SECRET_KEY"] =os.getenv("JWT_SECRET_KEY") # Change this in production

db = SQLAlchemy(app)
jwt = JWTManager(app)

# User Model
class User(db.Model):
    __tablename__ = 'users'
    
    unique_id = db.Column(db.String, primary_key=True)  # UUID as a string
    # user_id = db.Column(db.Integer, unique=True, nullable=False, autoincrement=True)
    user_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    fname = db.Column(db.String(50), nullable=False)
    lname = db.Column(db.String(50), nullable=False)
    email = db.Column(db.String(100), unique=True, nullable=False)
    password = db.Column(db.Text, nullable=False)  # Hashed password
    img = db.Column(db.String(255), default='no_image.jpg')
    status = db.Column(db.String(20), default='Offline now')
    created_at = db.Column(db.TIMESTAMP, default=db.func.current_timestamp())

    def __repr__(self):
        return f"<User {self.email}>"


# # Create the database tables if they don't exist
# with app.app_context():
#     db.create_all()

# routes
@app.route('/login', methods=['POST'])
def login():
    data = request.json  # Get JSON data from request
    email = data.get('email')
    password = data.get('password')

    # Check if email exists
    user = User.query.filter_by(email=email).first()
    if not user:
        return jsonify({"error": "User Email doesn't exist!!"}), 404

    # Verify the password
    if not check_password_hash(user.password, password):
        return jsonify({"error": "User Password incorrect"}), 401
    # if password != user.password:
    #     return jsonify({"error": "User Password incorrect"}), 401

    # Generate a JWT token
    # access_token = create_access_token(identity=user.unique_id)
    access_token = create_access_token(identity=f"{user.unique_id}", expires_delta=timedelta(seconds=20))

    return jsonify({
        "message": "Login successful",
        "token": access_token,
        "expires_in": 20,  # Let frontend know the expiration time
        "user": {
            "unique_id": user.unique_id,
            "fname": user.fname,
            "lname": user.lname,
            "email": user.email,
            "img": user.img,
            "status": user.status
        }
    }), 200

# sign-up route
@app.route('/signup', methods=['POST'])
def signup():
    try:
        data = request.form

        fname = data.get('fname')
        lname = data.get('lname')
        email = data.get('email')
        password = data.get('password')
        img_file = request.files.get('img')

        # Validate input fields
        if not all([fname, lname, email, password]):
            return jsonify({"error": "All fields are required."}), 400

        # Check if user already exists
        if User.query.filter_by(email=email).first():
            return jsonify({"error": "Email already in use."}), 409

        # Handle image file
        img_filename = img_file.filename if img_file else 'no_image.jpg'

        # Hash the password
        hashed_password = generate_password_hash(password)

        # Create a new user
        new_user = User(
            unique_id=str(uuid.uuid4()),
            fname=fname,
            lname=lname,
            email=email,
            password=hashed_password,
            img=img_filename,
            status='Active now'
        )

        db.session.add(new_user)
        db.session.commit()

        # Generate JWT token
        access_token = create_access_token(identity=new_user.unique_id, expires_delta=timedelta(days=1))

        return jsonify({
            "message": "Signup successful",
            "token": access_token,
            "user": {
                "unique_id": new_user.unique_id,
                "fname": new_user.fname,
                "lname": new_user.lname,
                "email": new_user.email,
                "img": new_user.img,
                "status": new_user.status
            }
        }), 201

    except Exception as e:
        app.logger.error(f"Error during signup: {e}")
        return jsonify({"error": "Internal Server Error"}), 500

# homepage route
@app.route('/profile', methods=['GET'])
@jwt_required()
def profile():
    try:
        user_id = get_jwt_identity()
        if not user_id:
            return jsonify({"error": "Invalid token or user identity"}), 401

        user = User.query.filter_by(unique_id=user_id).first()
        if not user:
            return jsonify({"error": "User not found"}), 404

        user_data = {
            "unique_id": user.unique_id,
            "fname": user.fname,
            "lname": user.lname,
            "email": user.email,
            "img": user.img,
            "status": user.status
        }
        return jsonify(user_data), 200

    except Exception as e:
        app.logger.error(f"Error fetching user profile: {e}")
        return jsonify({"error": f"Internal Server Error: {str(e)}"}), 500

# route for the chats
@app.route('/chats', methods=['GET'])
@jwt_required()
def get_users():
    try:
        current_user_id = get_jwt_identity()
        # Get all users except the current user
        users = User.query.filter(User.unique_id != current_user_id).all()

        # Transform user data for response
        users_data = [
            {
                "fname": user.fname,
                "lname": user.lname,
                "img": user.img,
                "status": user.status,
            }
            for user in users
        ]

        return jsonify({"users": users_data}), 200

    except Exception as e:
        app.logger.error(f"Error fetching users: {e}")
        return jsonify({"error": "Internal Server Error"}), 500
    
# @app.route('/', methods=['GET'])
# @jwt_required()
# def home():
#     return jsonify(message="Welcome to the home page!"), 200

# # User profile route
# @app.route('/profile', methods=['GET'])
# @jwt_required()
# def profile():
#     try:
#         user_id = get_jwt_identity()
#         if not user_id:
#             return jsonify({"error": "Invalid token or user identity"}), 401

#         user = User.query.filter_by(unique_id=user_id).first()
#         if not user:
#             return jsonify({"error": "User not found"}), 404

#         user_data = {
#             "unique_id": user.unique_id,
#             "fname": user.fname,
#             "lname": user.lname,
#             "email": user.email,
#             "img": user.img,
#             "status": user.status
#         }
#         return jsonify(user_data), 200

#     except Exception as e:
#         app.logger.error(f"Error fetching user profile: {e}")
#         return jsonify({"error": "Internal Server Error"}), 500

if __name__=='__main__':
    app.run(debug=True)