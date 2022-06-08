from sqlalchemy import ForeignKey
from .db import db

waistbeads_categories = db.Table(
    'waistbeads_categories',
    db.Column(
        'category_id',
        db.Integer,
        db.ForeignKey('categories.id'),
        primary_key=True
    ),
    db.Column(
        'waistbead_id',
        db.Integer,
        db.ForeignKey('waistbeads.id'),
        primary_key=True
    )
)
