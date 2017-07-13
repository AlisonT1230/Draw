from flask import Flask, request, render_template, url_for

#Flask, url_for, render_template
app = Flask(__name__)

@app.route("/")
def main():
	return render_template('DrawIndex.html')

@app.route("/updateCanvas/<line>", methods=['POST'])
def updateCanvas(line):
	file = open("Lines.txt", 'a')
	file.write(line);
	return "OK"
	
if __name__ == "__main__":
    app.run()