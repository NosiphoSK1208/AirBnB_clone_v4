#!/usr/bin/python3
""" Starts a Flash Web Application """
from models import storage
from models.state import State
from models.city import City
from models.amenity import Amenity
from models.place import Place
from os import environ
from flask import Flask, render_template
import uuid
app = Flask(__name__)
# app.jinja_env.trim_blocks = True
# app.jinja_env.lstrip_blocks = True


@app.teardown_appcontext
def close_db(error):
    """ Remove the current SQLAlchemy Session """
    storage.close()


@app.route('/2-hbnb/', strict_slashes=False)
def hbnb():
    """ HBNB is alive! """
    mystates = storage.all(State).values()
    mystates = sorted(mystates, key=lambda k: k.name)
    myst_ct = []

    for state in mystates:
        myst_ct.append([state, sorted(state.cities, key=lambda k: k.name)])

    myamenities = storage.all(Amenity).values()
    myamenities = sorted(myamenities, key=lambda k: k.name)

    myplaces = storage.all(Place).values()
    myplaces = sorted(myplaces, key=lambda k: k.name)
    cache_id = uuid.uuid4()
    return render_template('2-hbnb.html',
                           mystates=myst_ct,
                           myamenities=myamenities,
                           myplaces=myplaces,
                           cache_id=cache_id)


if __name__ == "__main__":
    """ Main Function """
    app.run(host='0.0.0.0', port=5000)