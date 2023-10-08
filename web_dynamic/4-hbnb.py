#!/usr/bin/python3
"""
Flask App that integrates with AirBnB static HTML Template
"""
from flask import Flask, render_template, url_for
from models import storage
import uuid

# flask setup
app = Flask(__name__)
app.url_map.strict_slashes = False
port = 5000
host = '0.0.0.0'


# begin flask page rendering
@app.teardown_appcontext
def teardown_db(exception):
    """
    after each request, this method calls .close() (i.e. .remove()) on
    the current SQLAlchemy Session
    """
    storage.close()


@app.route('/4-hbnb')
def hbnb_filters(the_id=None):
    
    mystate_objs = storage.all('State').values()
    mystates = dict([state.name, state] for state in mystate_objs)
    myamenity = storage.all('Amenity').values()
    myplaces = storage.all('Place').values()
    users = dict([user.id, "{} {}".format(user.first_name, user.last_name)]
                 for user in storage.all('User').values())
    return render_template('4-hbnb.html',
                           mystates=mystates,
                           myamenity=myamenity,
                           myplaces=myplaces,
                           users=users,
                           cache_id=uuid.uuid4())

if __name__ == "__main__":
    """
    MAIN Flask App"""
    app.run(host=host, port=port)