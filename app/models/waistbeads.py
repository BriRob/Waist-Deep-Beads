from .db import db
import datetime

class Waistbead(db.Model):
    __tablename__ = 'waistbeads'

    id = db.Column(db.Integer, primary_key=True)
    beader_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    bead_img_url = db.Column(db.String(255), nullable=False)
