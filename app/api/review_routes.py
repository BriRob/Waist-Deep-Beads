from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import User, Waistbead, db, Review
from app.forms.review_form import ReviewForm


# from app.awsS3 import upload_file_to_s3, allowed_file, get_unique_filename
from app.utils import validation_errors_to_error_messages

review_routes = Blueprint('reviews', __name__)

# get all reviews for one wb
@review_routes.route('/<int:bead_id>')
# @login_required
def all_reviews(bead_id):
    reviews = Review.query.filter(Review.beads_id == bead_id).order_by(Review.id.asc()).all()
    print(reviews)
    return {'reviews': [review.to_dict() for review in reviews]}


# create review for one post
@review_routes.route('/<int:bead_id>/<int:auth_id>/new', methods=['POST'])
@login_required
def post_review(bead_id, auth_id):
    form = ReviewForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        new_review = Review(
            author_id=auth_id,
            beads_id=bead_id,
            content=form.data['content'],
            rating=form.data['rating']
        )

        db.session.add(new_review)
        db.session.commit()
        return new_review.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


# edit review
@review_routes.route('/<int:rev_id>/edit', methods=['GET', 'PUT'])
@login_required
def edit_review(rev_id):
    edit_rev = Review.query.get(rev_id)
    form = ReviewForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():

        edit_rev.content=form.data['content']
        edit_rev.rating=form.data['rating']

        db.session.add(edit_rev)
        db.session.commit()
        return edit_rev.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401



# delete review
@review_routes.route('/<int:rev_id>/delete', methods=['GET', 'DELETE'])
@login_required
def delete_review(rev_id):
    del_rev = Review.query.get(rev_id)
    db.session.delete(del_rev)
    db.session.commit()
    return del_rev.to_dict()
