from app.models import db, Review

def seed_reviews():
    sacred_1 = Review(
        author_id=2, beads_id=1, content='', rating=5
    )
    sacred_2 = Review(
        author_id=3, beads_id=1, content='They fit me perfectly! Probably my favorite design of the many waistbeads I wear', rating=5
    )
    international_1 = Review(
        author_id=3, beads_id=3, content=f'''My best friend is obssessed with The Artist! She absolutely loved this gift! Please make more soon''', rating=5
    )
    honey_1 = Review(
        author_id=1, beads_id=4, content=f'''My 9-year-old loves her honeybee! ''', rating=5
    )

    db.session.add(sacred_1)
    db.session.add(sacred_2)
    db.session.add(international_1)
    db.session.add(honey_1)

    db.session.commit()


def undo_reviews():
    db.session.execute('TRUNCATE reviews RESTART IDENTITY CASCADE;')
    db.session.commit()
