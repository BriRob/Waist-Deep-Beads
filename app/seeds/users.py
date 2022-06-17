from app.models import db, User


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        full_name='Demo User', username='Demo', email='demo@aa.io', password='password')
    alycia = User(
        full_name='Alycia Robinson', username='alycia', email='alycia@aa.io', password='2669baby', admin=True)
    pam = User(
        full_name='Pamela Washington', username='pamela', email='pamela@aa.io', password='rasta')
    briana = User(
        full_name='Briana Robinson', username='noelle', email='briana@aa.io', password='briana')
    barbara = User(
        full_name='Barbara Golden-Applewhite', username='barbara', email='barbara@aa.io', password='barbara')
    indira = User(
        full_name='Indira Copeland', username='indira', email='indira@aa.io', password='indira')
    yolanda = User(
        full_name='Yolanda Cunningham', username='yolanda', email='yolanda@aa.io', password='yolanda')
    moira = User(
        full_name='Moira Montgomery', username='moira', email='moira@aa.io', password='moira')
    charlesha = User(
        full_name='Charlesha Mitchell', username='charlesha', email='charlesha@aa.io', password='charlesha')
    christy = User(
        full_name='Christy Walker', username='christy', email='christy@aa.io', password='christy')
    adia = User(
        full_name='Adia Applewhite', username='adia', email='adia@aa.io', password='adiaA')
    courtney = User(
        full_name='Courtney Anderson', username='courtney', email='courtney@aa.io', password='courtney')
    carissa = User(
        full_name='Carissa Walker', username='carissa', email='carissa@aa.io', password='carissa')
    safiya = User(
        full_name='Safiya Cain', username='safiya', email='safiya@aa.io', password='safiya')
    maica = User(
        full_name='Maica Sandy', username='maica', email='maica@aa.io', password='maica')

    db.session.add(demo)
    db.session.add(alycia)
    db.session.add(pam)
    db.session.add(briana)
    db.session.add(barbara)
    db.session.add(indira)
    db.session.add(yolanda)
    db.session.add(moira)
    db.session.add(charlesha)
    db.session.add(christy)
    db.session.add(adia)
    db.session.add(courtney)
    db.session.add(carissa)
    db.session.add(safiya)
    db.session.add(maica)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_users():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
