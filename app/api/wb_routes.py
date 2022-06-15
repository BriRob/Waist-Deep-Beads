
from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import User, Waistbead, db, Category
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


# get all waistbeads for one user
@wb_routes.route('users/<int:user_id>')
# @login_required
def all_wb_one_user(user_id):
    user = User.query.get(user_id)
    print('\n\n', user.waistbeads, '\n\n')
    user_wbs = {waistbead.id: waistbead.to_dict() for waistbead in user.waistbeads}
    return {'user': user.to_dict(), 'user_wbs': user_wbs}


# create waistbead post
# @wb_routes.route('/<int:user_id>/new', methods=['POST'])
@wb_routes.route('/<int:user_id>/new', methods=['POST'])
@login_required
def post_wb(user_id):
    print("\n\n request args length", len(request.args.get('cates')))

    # print('\n\n other request args', request.args['cates'])
    # print(request.args['cates'])
    # print(request.args['cates'] == False)
    form = CreateWbForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    print("\n\n", dir(request.data))

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

        if len(request.args.get('cates')) != 0:
            print("\n\n request args please...", request.args.get('cates').split(','))
            sel_cates = request.args.get('cates').split(',')
            db_sel_cates = [Category.query.filter(Category.category_name == categ).one() for categ in sel_cates]
            print(db_sel_cates)
            # add category append here
            new_wb.categories.extend(db_sel_cates)

        db.session.commit()
        # print('new wb please', new_wb.to_dict())
        return new_wb.to_dict()

    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


# edit waistbead post
@wb_routes.route('/<int:bead_id>/edit', methods=['GET', 'PUT'])
@login_required
def edit_wb(bead_id):
    # print("\n\n request args length", len(request.args.get('cates')))

    editing_wb = Waistbead.query.get(bead_id)
    form = CreateWbForm()
    form['csrf_token'].data = request.cookies['csrf_token']

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

        # add category changes here
        if len(request.args.get('cates')) != 0:
            # print('\n\n editing categories OLD', editing_wb.categories, '\n\n')
            # edit_categs = editing_wb.categories
            old_categ_names = [categ.category_name for categ in editing_wb.categories]
            # print('old categ names \n\n', old_categ_names, '\n\n')
            new_categ_names = request.args.get('cates').split(',')
            # print('new categ names \n\n', new_categ_names, '\n\n')

            for cat in old_categ_names:
                if cat in new_categ_names:
                    # print(f'{cat} is in new_categ_names' )
                    continue
                else:
                    # print(f'need to remove {cat}!!')
                    removingCat = Category.query.filter(Category.category_name == cat).one()
                    editing_wb.categories.remove(removingCat)

            for newCat in new_categ_names:
                if newCat in old_categ_names:
                    # print(f'{newCat} is in old_categ_names' )
                    continue
                else:
                    # print(f'adding {newCat} to categories!!')
                    addingCat = Category.query.filter(Category.category_name == newCat).one()
                    editing_wb.categories.append(addingCat)

            # print('final editwb.categories\n\n', editing_wb.categories, '\n\n')
        else:
            old_cat_names = [categ.category_name for categ in editing_wb.categories]
            for oldCat in old_cat_names:
                removeCat = Category.query.filter(Category.category_name == oldCat).one()
                editing_wb.categories.remove(removeCat)

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
