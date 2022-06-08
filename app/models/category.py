from .db import db
from .waistbeads_categories import waistbeads_categories


class Category(db.Model):
    __tablename__ = 'categories'

    id = db.Column(db.Integer, primary_key=True)
    category_name = db.Column(db.String(70), nullable=False, unique=True)
    
    waistbeads = db.relationship('Category', secondary=waistbeads_categories, back_populates = 'categories')


    def to_dict(self):
        return {
            'id': self.id,
            'category_name': self.category_name
        }
