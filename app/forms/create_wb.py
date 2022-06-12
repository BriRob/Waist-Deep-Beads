from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField, FloatField, BooleanField, SelectMultipleField, widgets
from wtforms.validators import DataRequired, ValidationError
from app.models import Category

# def getCategories():
#     categoriesDb = Category.query.all()
#     print(categoriesDb)
#     categoriesLis = [cat.to_dict() for cat in categoriesDb]
#     print(categoriesLis)
#     return categoriesLis
# print('categoriesLis \n\n', categoriesLis)
# getCategories()

# class MultiCheckboxField(SelectMultipleField):
#     widget = widgets.ListWidget(prefix_label=False)
#     option_widget = widgets.CheckboxInput()

class CreateWbForm(FlaskForm):
    bead_img_url = StringField('bead_img_url', validators=[DataRequired(message='Cannot share your creation without image')])
    name = StringField('name', validators=[DataRequired('Name is required')]) #add custom validator to make sure name is unique
    price = FloatField('price', validators=[DataRequired('Price is required')])
    description = TextAreaField('description')
    in_stock = BooleanField('in_stock')
    # categories = MultiCheckboxField('categories', choices=categoriesLis)

# class EditWbForm(FlaskForm):
