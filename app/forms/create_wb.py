from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField, FloatField, BooleanField, SelectMultipleField, widgets
from wtforms.validators import DataRequired, ValidationError
from app.models import Category

def length_check(form, field):
    # print(dir(field.label))
    # print(field.label.text)
    name = field.data
    if (field.label.text == "Name"):
        if len(name) > 100:
            raise ValidationError(f'{field.label.text} must be less than 100 characters')
    if (field.label.text == "Description"):
        if len(name) > 5000:
            raise ValidationError(f'{field.label.text} must be less than 5000 characters')

def price_check(form, field):
    # print(dir(field.label))
    # print(field.label.text)
    price = field.data
    # print('\n\n price!!', price < 1, '\n\n')
    if (field.label.text == "Price"):
        if price < 1 or price > 10000 :
            raise ValidationError('Price must be between $1.00 USD and $10,000 USD')




class CreateWbForm(FlaskForm):
    bead_img_url = StringField('bead_img_url', validators=[DataRequired(message='Cannot share your creation without image')])
    name = StringField('Name', validators=[DataRequired('Name is required'), length_check]) #add custom validator to make sure name is unique
    price = FloatField('Price', validators=[DataRequired('Price is required'), price_check])
    description = TextAreaField('Description', validators=[length_check])
    in_stock = BooleanField('in_stock')
    # categories = MultiCheckboxField('categories', choices=categoriesLis)

# class EditWbForm(FlaskForm):
