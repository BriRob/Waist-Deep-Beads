from flask_wtf import FlaskForm
from wtforms import TextAreaField, IntegerField
from wtforms.validators import DataRequired, ValidationError

class ReviewForm(FlaskForm):
    content = TextAreaField('content', validators=[DataRequired(message='Content is required')])
    rating = IntegerField('rating', validators=[DataRequired(message='Rating is required')])
