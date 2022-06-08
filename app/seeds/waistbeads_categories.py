from app.models import db, Waistbead, Category

def seed_waist_cat():
    sacred_waist = Waistbead(
        beader_id=1, bead_img_url='https://waistdeepbucket.s3.amazonaws.com/sacred.png', name='Sacred Waislet', price=29.99, description='For more info or to purchase, please contact Alycia R. at 123-456-7891 or alycia@waistbeader.io'
    )
    pearl = Waistbead(
        beader_id=1, bead_img_url='https://waistdeepbucket.s3.amazonaws.com/international_lover.png', name='Mother of Pearl Waislet', price=34.99, description='For more info or to purchase, please contact Alycia R. at 123-456-7891 or alycia@waistbeader.io'
    )
    international = Waistbead(
        beader_id=2, bead_img_url='https://waistdeepbucket.s3.amazonaws.com/international_lover.png', name='International Lover Waistlet', price=40.00, description='This was inspired by one of my favorite artists of all time, The Artist Formerly Known as Prince! For more info or to purchase, please contact Alycia R. at 123-456-7891 or alycia@waistbeader.io'
    )
    honeybee = Waistbead(
        beader_id=2, bead_img_url='https://waistdeepbucket.s3.amazonaws.com/honeybee.png', name='Honey Bee', price=20.00, description='I make waist beads of any size but I especially love coming up with designs for the younger generation! For more info or to purchase, please contact Alycia R. at 123-456-7891 or alycia@waistbeader.io'
    )
    utterfly = Waistbead(
        beader_id=3, bead_img_url='https://waistdeepbucket.s3.amazonaws.com/utterfly.png', name='Utterfly', price=17.00, description=f'''Inspired by my niece when she was a little girl. She recognized the beauty in flowers and butterflies at a very young age. She used to always say, "Look at the flowers! Look at the utterfly!!" \n For more info or to purchase, please contact Alycia R. at 123-456-7891 or alycia@waistbeader.io'''
    )

    db.session.add(sacred_waist)
    db.session.add(pearl)
    db.session.add(international)
    db.session.add(honeybee)
    db.session.add(utterfly)

    children = Category(category_name='Children')
    spiritual = Category(category_name='Spiritual')
    artist_inspo = Category(category_name='Inspired by Artists')
    chakra = Category(category_name='Chakra')
    gemstones = Category(category_name='Gemstone')

    db.session.add(children)
    db.session.add(spiritual)
    db.session.add(artist_inspo)
    db.session.add(chakra)
    db.session.add(gemstones)

    sacred_waist.categories.extend([spiritual])
    pearl.categories.extend([gemstones])
    international.categories.extend([artist_inspo])
    honeybee.categories.extend([children])
    utterfly.categories.extend([children])


    db.session.commit()


def undo__waist_cat():
    db.session.execute('TRUNCATE waistbeads RESTART IDENTITY CASCADE;')
    db.session.execute('TRUNCATE categories RESTART IDENTITY CASCADE;')
    db.session.commit()
