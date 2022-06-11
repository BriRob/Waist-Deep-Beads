from .db import db
import datetime
from .waistbeads_categories import waistbeads_categories

class Waistbead(db.Model):
    __tablename__ = 'waistbeads'

    id = db.Column(db.Integer, primary_key=True)
    beader_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    bead_img_url = db.Column(db.String(255), nullable=False)
    name = db.Column(db.String(255), nullable=False)
    price = db.Column(db.Float(), nullable=False)
    description = db.Column(db.Text, nullable=True)
    in_stock = db.Column(db.Boolean, default=True)
    created_at = db.Column(db.DateTime, default=datetime.datetime.now())
    updated_at = db.Column(db.DateTime, default=datetime.datetime.now())

    user = db.relationship('User', back_populates = 'waistbeads', lazy='joined')
    reviews = db.relationship('Review', back_populates = 'waistbead')
    categories = db.relationship('Category', secondary=waistbeads_categories, back_populates = 'waistbeads')

    def to_dict(self):
        return {
            'id': self.id,
            'beader_id': self.beader_id,
            'user': self.user.to_dict(),
            'bead_img_url': self.bead_img_url,
            'name': self.name,
            'price': self.price,
            'description': self.description,
            'in_stock': self.in_stock,
            'reviews': {review.id: review.to_dict() for review in self.reviews},
            'categories': {category.id: category.to_dict() for category in self.categories},
            'created_at': self.created_at.strftime("%a,  %b %d %Y")
        }
