from flask_wtf import FlaskForm
from wtforms import TextAreaField, IntegerField
from wtforms.validators import DataRequired, ValidationError

def length_check(form, field):
    # print(dir(field.label))
    # print(field.label.text)
    text = field.data
    # print("TRYING IF LENGTH CHECK")
    if len(text) > 300:
        # print("SUPER LONG COMMENT!!!!!! \n\n")
        raise ValidationError(f'{field.label.text} must be less than 300 characters')

class ReviewForm(FlaskForm):
    content = TextAreaField('Content', validators=[DataRequired(message='Content is required'), length_check])
    rating = IntegerField('rating', validators=[DataRequired(message='Rating is required')])
