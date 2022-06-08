from .db import db
import datetime

class Review(db.Model):
    __tablename__ = 'reviews'

    id = db.Column(db.Integer, primary_key=True)
    author_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    beads_id = db.Column(db.Integer, db.ForeignKey('waistbeads.id'), nullable=False)
    content = db.Column(db.Text, nullable=True)
    rating = db.Column(db.Integer, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.datetime.now())
    updated_at = db.Column(db.DateTime, default=datetime.datetime.now())

    author = db.relationship('User', back_populates = 'reviews')
    waistbead = db.relationship('Waistbead', back_populates = 'reviews')

    def to_dict(self):
        return {
            'id': self.id,
            'author_id': self.author_id,
            'author': self.author.to_dict(),
            'beads_id': self.beads_id,
            'content': self.content,
            'rating': self.rating,
            'created_at': self.created_at
        }
