from app.models import db, Review

def seed_reviews():
    review_1_1 = Review(
        author_id=2, beads_id=1, content='', rating=5
    )
    review_1_2 = Review(
        author_id=3, beads_id=1, content='They fit me perfectly! Probably my favorite design of the many waistbeads I wear', rating=5
    )
    review_2_1 = Review(
        author_id=3, beads_id=3, content=f'''My best friend is obssessed with The Artist! She absolutely loved this gift! Please make more soon''', rating=5
    )
    pass

def undo_reviews():
    db.session.execute('TRUNCATE reviews RESTART IDENTITY CASCADE;')
    db.session.commit()
