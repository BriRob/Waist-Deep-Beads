from app.models import db, User


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        full_name='Demo User', username='Demo', email='demo@aa.io', password='password')
    alycia = User(
        full_name='Alycia Robinson', username='alycia', email='alycia@aa.io', password='2669baby', admin=True)
    pam = User(
        full_name='Pamela Washington', username='pamela', email='pamela@aa.io', password='rasta')

    db.session.add(demo)
    db.session.add(alycia)
    db.session.add(pam)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_users():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
