from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import User, Waistbead, db
from app.forms.create_wb import CreateWbForm

from app.awsS3 import upload_file_to_s3, allowed_file, get_unique_filename
from app.utils import validation_errors_to_error_messages

wb_routes = Blueprint('waistbeads', __name__)

# get all waistbeads
@wb_routes.route('/')
# @login_required
def all_waistbeads():
    waistbeads = Waistbead.query.order_by(Waistbead.id.desc()).all()
    # print(waistbeads)
    return {'waistbeads': [post.to_dict() for post in waistbeads]}



# get one waistbead creation
@wb_routes.route('/<int:bead_id>')
# @login_required
def one_wb(bead_id):
    print('in one wb! \n\n')
    waistbead = Waistbead.query.get(bead_id)
    return waistbead.to_dict()



# create waistbead post
@wb_routes.route('/<int:user_id>/new', methods=['POST'])
@login_required
def post_wb(user_id):
    form = CreateWbForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    # print("\n\n here!!!!!\n\n")

    if form.validate_on_submit():

        if 'bead_img_url' in request.files:
            image = request.files['bead_img_url']

            if not allowed_file(image.filename):
                return {'errors': ['File type not permitted']}, 400

            image.filename = get_unique_filename(image.filename)

            upload = upload_file_to_s3(image)

            if 'url' not in upload:
                return upload, 400

            url = upload['url']

        new_wb = Waistbead(
            beader_id=user_id,
            # bead_img_url=form.data['bead_img_url'],
            bead_img_url=url,
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
@wb_routes.route('/<int:bead_id>/edit', methods=['GET', 'PUT'])
@login_required
def edit_wb(bead_id):
    editing_wb = Waistbead.query.get(bead_id)
    form = CreateWbForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    # print("\n\n here!!!!!\n\n")

    if form.validate_on_submit():

        if 'bead_img_url' in request.files:
            image = request.files['bead_img_url']

            if not allowed_file(image.filename):
                return {'errors': ['File type not permitted']}, 400

            image.filename = get_unique_filename(image.filename)

            upload = upload_file_to_s3(image)

            if 'url' not in upload:
                return upload, 400

            url = upload['url']
            editing_wb.bead_img_url=url

        editing_wb.name = form.data['name']
        editing_wb.price = form.data['price']
        editing_wb.description = form.data['description']
        editing_wb.in_stock = form.data['in_stock']

        db.session.add(editing_wb)
        # add category append here
        db.session.commit()
        return editing_wb.to_dict()

    return {'errors': validation_errors_to_error_messages(form.errors)}, 401



# delete waistbead post
@wb_routes.route('/<int:bead_id>/delete', methods=['GET', 'DELETE'])
@login_required
def delete_wb(bead_id):
    del_wb = Waistbead.query.get(bead_id)
    db.session.delete(del_wb)
    db.session.commit()
    return del_wb.to_dict()
    # user = User.query.get(id)
    # return user.to_dict()
