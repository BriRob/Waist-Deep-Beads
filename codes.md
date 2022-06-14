PSQL
create user wdb_user with password 'beadpw2669' createdb;
create database waist_deep_beads_app with owner wdb_user;

db schema
https://drawsql.app/me-231/diagrams/waistdeepbeads#

const ratingChanged = (rating) => {
        setRating(rating)
    }

<ReactStars value={rating} count={5} onChange={ratingChanged} size={24} color2={"#e0730d"} color1={'#abb1d8'} half={false} />


#ffccff - light pink
#ded8f6 - light blue purple
#813aae - purple
#5583c6 - blue
#673398 - deep purple
#fff139 - yellow

import simplejson as json
json.dumps(self.price, use_decimal=True)

IN CASE HEROKU DB DOESN'T WANT TO WORK
    heroku run -a waist-deep-beads flask db upgrade
    heroku run -a waist-deep-beads flask seed undo
    heroku run -a waist-deep-beads flask seed all

    heroku pg:psql -a waist-deep-beads
    heroku logs -a waist-deep-beads
