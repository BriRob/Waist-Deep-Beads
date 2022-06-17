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
    aka_1 = Review(
        author_id=6, beads_id=6, content=f'''My soror and I loved our waistbeads! Came just in time for Founder's''', rating=5
    )
    family_1 = Review(
        author_id=5, beads_id=17, rating=5
    )
    family_2 = Review(
        author_id=8, beads_id=17, content=f'''Perfect for my family. Will definitely be ordering again''', rating=5
    )
    collection_1 = Review(
        author_id=4, beads_id=23, content=f'''This deal came right when I needed it 😭 Just what the doctor ordered. They look great as well!''', rating=5
    )
    collection_2 = Review(
        author_id=7, beads_id=23, content=f'''I'm getting ready to order more. I am so glad I didn't miss this one!''', rating=5
    )
    tree_1 = Review(
        author_id=9, beads_id=22, rating=5
    )
    tree_2 = Review(
        author_id=10, beads_id=22, content=f'''Thank you, thank you, thank you for making a bigger batch this time. That way I can order as many more as I want!''', rating=5
    )
    tree_3 = Review(
        author_id=11, beads_id=22, rating=5
    )
    drama_1 = Review(
        author_id=12, beads_id=21, rating=5
    )
    drama_2 = Review(
        author_id=13, beads_id=21, rating=5
    )
    sacral_1 = Review(
        author_id=14, beads_id=20, rating=5
    )
    # drama_ = Review(
    #     author_id=10, beads_id=22, rating=5
    # )

    db.session.add(sacred_1)
    db.session.add(sacred_2)
    db.session.add(international_1)
    db.session.add(honey_1)
    db.session.add(aka_1)
    db.session.add(family_1)
    db.session.add(family_2)
    db.session.add(collection_1)
    db.session.add(collection_2)
    db.session.add(tree_1)
    db.session.add(tree_2)
    db.session.add(tree_3)
    db.session.add(drama_1)
    db.session.add(drama_2)
    db.session.add(sacral_1)

    db.session.commit()


def undo_reviews():
    db.session.execute('TRUNCATE reviews RESTART IDENTITY CASCADE;')
    db.session.commit()
