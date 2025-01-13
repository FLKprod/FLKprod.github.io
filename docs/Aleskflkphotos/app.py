from flask import Flask, render_template

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/contact')
def contact():
    return render_template('contact.html')

@app.route('/services')
def services():
    return render_template('services.html')

@app.route('/com2troyes')
def com2troyes():
    return render_template('com2troyes.html')

@app.route('/entreprise')
def entreprise():
    return render_template('entreprise.html')

@app.route('/plan')
def plan():
    return render_template('plan.html')

if __name__ == "__main__":
    app.run(debug=True)
