from app import app

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5000)


# Gunicorn and WSGI (Web Server Gateway Interface) are both components used in deploying and serving Python Web Applications, particularily those built with
# web frameworks like Flask and Django.