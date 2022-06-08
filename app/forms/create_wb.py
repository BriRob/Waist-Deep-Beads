from unicodedata import category
from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField, FloatField, BooleanField
from wtforms.validators import DataRequired, ValidationError

class CreateWbForm(FlaskForm):
    bead_img_url = StringField('bead_img_url', validators=[DataRequired(message='Cannot share your creation without image')])
    name = StringField('name', validators=[DataRequired('Name is required')]) #add custom validator to make sure name is unique
    price = FloatField('price', validators=[DataRequired('Price is required')])
    description = TextAreaField('description')
    in_stock = BooleanField('in_stock')
    # category = 
