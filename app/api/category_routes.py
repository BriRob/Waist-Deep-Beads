from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import User, Waistbead, db, Category

category_routes = Blueprint('categories', __name__)


# get all categories
@category_routes.route('/')
def all_categories():
    categories = Category.query.all()
    # print('CATEGORIES!!!! \n\n', categories)
    # print("\n\n", {category.id: category.to_dict() for category in categories}, "\n\n")
    return {category.id: category.to_dict() for category in categories}

# get all waistbeads from a category
@category_routes.route('/<int:cat_id>')
def one_category(cat_id):
    category = Category.query.get(cat_id)
    # print(category.waistbeads)
    wbs_dict = {bead.id: bead.to_dict() for bead in category.waistbeads}
    return {'category': category.to_dict(), 'wbs_dict': wbs_dict}
