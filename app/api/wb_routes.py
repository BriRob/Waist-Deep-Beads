from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import User, Waistbead, db
from app.forms.create_wb import CreateWbForm
from app.utils import validation_errors_to_error_messages

wb_routes = Blueprint('waistbeads', __name__)

# get all waistbeads
@wb_routes.route('/')
@login_required
def all_waistbeads():
    waistbeads = Waistbead.query.order_by(Waistbead.id.desc()).all()
    # print(waistbeads)
    return {'waistbeads': [post.to_dict() for post in waistbeads]}



# get one waistbead creation
@wb_routes.route('/<int:bead_id>')
@login_required
def one_wb(bead_id):
    waistbead = Waistbead.query.get(bead_id)
    return waistbead.to_dict()



# create waistbead post
@wb_routes.route('/<int:user_id>/new', methods=['POST'])
@login_required
def post_wb(user_id):
    form = CreateWbForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        new_wb = Waistbead(
            user_id=user_id,
            bead_img_url=form.data['bead_img_url'],
            name=form.data['name'],
            price=form.data['price'],
            description=form.data['description'],
            in_stock=form.data['in_stock']
        )

        db.session.add(new_wb)
        # add category append here
        db.session.commit()
        return new_wb.to_dict()

    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


# edit waistbead post
@wb_routes.route('/<int:bead_id>/<int:user_id>/edit', methods=['GET', 'PUT'])
@login_required
def edit_wb(bead_id, user_id):
    # user = User.query.get(id)
    # return user.to_dict()
    pass


# delete waistbead post
@wb_routes.route('/<int:bead_id>/delete', methods=['GET', 'DELETE'])
@login_required
def delete_wb(bead_id):
    # user = User.query.get(id)
    # return user.to_dict()
    pass
