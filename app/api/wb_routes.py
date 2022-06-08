from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import User, Waistbead, waistbeads

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
@wb_routes.route('/new', methods=['POST'])
@login_required
def post_wb():
    # user = User.query.get(id)
    # return user.to_dict()
    pass


# edit waistbead post
@wb_routes.route('/<int:bead_id>/edit', methods=['PUT'])
@login_required
def edit_wb(bead_id):
    # user = User.query.get(id)
    # return user.to_dict()
    pass


# delete waistbead post
@wb_routes.route('/<int:bead_id>/delete', methods=['DELETE'])
@login_required
def delete_wb(bead_id):
    # user = User.query.get(id)
    # return user.to_dict()
    pass
