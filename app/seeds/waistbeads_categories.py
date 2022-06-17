from unicodedata import category
from app.models import db, Waistbead, Category

def seed_waist_cat():
    sacred_waist = Waistbead(
        beader_id=1, bead_img_url='https://waistdeepbucket.s3.amazonaws.com/sacred.png', name='Ganesha Sacred Waislet', price=29.99, description='For more info or to purchase, please contact Alycia R. at 123-456-7891 or alycia@waistbeader.io'
    )
    pearl = Waistbead(
        beader_id=1, bead_img_url='https://waistdeepbucket.s3.amazonaws.com/pearl.png', name='Mother of Pearl Waislet', price=34.99, description='For more info or to purchase, please contact Alycia R. at 123-456-7891 or alycia@waistbeader.io'
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
    aka = Waistbead(
        beader_id=2, bead_img_url='https://waistdeepbucket.s3.amazonaws.com/aka-wb.png', name='Pink and Green (AKA)', price=40.00, description=f'''Inspired by the beautiful apple green and salmon pink colors of the sorority Alpha Kappa Alpha'''
    )
    angel = Waistbead(
        beader_id=2, bead_img_url='https://waistdeepbucket.s3.amazonaws.com/angel-wb.png', name='Angelic Waistlet', price=30.00, description=f'''You're my angel, my angel!'''
    )
    blue_crystal = Waistbead(
        beader_id=2, bead_img_url='https://waistdeepbucket.s3.amazonaws.com/blue-crytsal-WB.png', name='Cool, Calm, and Collected Crystal', price=35.00
    )
    blue_silver_gold = Waistbead(
        beader_id=2, bead_img_url='https://waistdeepbucket.s3.amazonaws.com/blue-silver-gold-wb.png', name='Blue, Silver, Gold', price=30.00
    )
    blue_gemstone = Waistbead(
        beader_id=2, bead_img_url='https://waistdeepbucket.s3.amazonaws.com/blue-stone.png', name='Blue Gemstone', price=35.00
    )
    blue_quartz = Waistbead(
        beader_id=2, bead_img_url='https://waistdeepbucket.s3.amazonaws.com/blue-stones-wb.png', name='Blue Quartz', price=30.00
    )
    buddha = Waistbead(
        beader_id=2, bead_img_url='https://waistdeepbucket.s3.amazonaws.com/buddha.png', name='Buddha Waistlet', price=30.00, description=f'''"Do not look for a sanctuary in anyone except yourself." -Buddha'''
    )
    cross = Waistbead(
        beader_id=2, bead_img_url='https://waistdeepbucket.s3.amazonaws.com/cross.png', name='Cross Waistlet', price=25.00
    )
    delta = Waistbead(
        beader_id=2, bead_img_url='https://waistdeepbucket.s3.amazonaws.com/delta.png', name='Red, White, Elephant (Delta)', price=30.00, description=f'''Inspired by the beautiful crimson and cream colors of the Delta Sigma Theta Sorority'''
    )
    divine_fem = Waistbead(
        beader_id=2, bead_img_url='https://waistdeepbucket.s3.amazonaws.com/divine-feminity.png', name='Divine Feminity', price=45.00, description=f'''"Waist Deep" can carry varying significance with one meaning being deep into the ocean. Of course that is where we find a plethora of shells. My favorite is the cowrie shell, since it represents the goddess of protection which is highly powerful and is connected with the strength and power of the Ocean.'''
    )
    mustard_seed = Waistbead(
        beader_id=2, bead_img_url='https://waistdeepbucket.s3.amazonaws.com/faith_mustard.png', name='Mustard Seed Waistlet', price=30.00, description=f'''"With the faith of a mustard seed, nothing will be impossible for you." -Matthew 17:20"'''
    )
    family_of_gems = Waistbead(
        beader_id=2, bead_img_url='https://waistdeepbucket.s3.amazonaws.com/family-of-gems-wb.png', name='Family of Gems Waistlet', price=40.00, description=f'''Custom designed to include a gemstone to represent you and each of your loved ones with glass and metal beads, traces of hematite, and wooden beads'''
    )
    purple_gold_shell = Waistbead(
        beader_id=2, bead_img_url='https://waistdeepbucket.s3.amazonaws.com/purple-gold-shell.png', name='Purple, Gold, Shell Waistlet', price=35.00
    )
    crown_heart_chakra = Waistbead(
        beader_id=2, bead_img_url='https://waistdeepbucket.s3.amazonaws.com/purple-green-wb-crown-heart-chakra.png', name='Heart and Crown Chakra Waistlets', price=30.00, description=f'''Price is for one each'''
    )
    sacral = Waistbead(
        beader_id=2, bead_img_url='https://waistdeepbucket.s3.amazonaws.com/sacral-wb.png', name='Sacral Waistlet', price=30.00
    )
    theatre = Waistbead(
        beader_id=3, bead_img_url='https://waistdeepbucket.s3.amazonaws.com/theater-wb.png', name='Drama Masks', price=30.00, description=f'''Perfect for any thespian or lover of theatrical arts!'''
    )
    tree = Waistbead(
        beader_id=3, bead_img_url='https://waistdeepbucket.s3.amazonaws.com/tree-wb.png', name="Kimee's Tree of Life", price=35.00
    )
    collection = Waistbead(
        beader_id=2, bead_img_url='https://waistdeepbucket.s3.amazonaws.com/wb-collection.png', name='Collection', price=70.00, description=f'''Special deal for 5 waistbeads!'''
    )

    db.session.add(sacred_waist)
    db.session.add(pearl)
    db.session.add(international)
    db.session.add(honeybee)
    db.session.add(utterfly)
    db.session.add(aka)
    db.session.add(angel)
    db.session.add(blue_crystal)
    db.session.add(blue_silver_gold)
    db.session.add(blue_gemstone)
    db.session.add(blue_quartz)
    db.session.add(buddha)
    db.session.add(cross)
    db.session.add(delta)
    db.session.add(divine_fem)
    db.session.add(mustard_seed)
    db.session.add(family_of_gems)
    db.session.add(purple_gold_shell)
    db.session.add(crown_heart_chakra)
    db.session.add(sacral)
    db.session.add(theatre)
    db.session.add(tree)
    db.session.add(collection)

    children = Category(category_name='Children')
    spiritual = Category(category_name='Spiritual')
    artist_inspo = Category(category_name='Inspired by Artists')
    chakra = Category(category_name='Chakra')
    gemstones = Category(category_name='Gemstone')
    collections = Category(category_name='Collections')
    sorority = Category(category_name='Sorority')

    db.session.add(children)
    db.session.add(spiritual)
    db.session.add(artist_inspo)
    db.session.add(chakra)
    db.session.add(gemstones)
    db.session.add(collections)
    db.session.add(sorority)

    sacred_waist.categories.extend([spiritual])
    pearl.categories.extend([gemstones])
    international.categories.extend([artist_inspo])
    honeybee.categories.extend([children])
    utterfly.categories.extend([children])

    sorority.waistbeads.extend([aka, delta])
    collections.waistbeads.extend([collection, crown_heart_chakra])
    spiritual.waistbeads.extend([angel, buddha, cross, mustard_seed, divine_fem, tree, crown_heart_chakra, sacral])
    artist_inspo.waistbeads.extend([theatre])
    chakra.waistbeads.extend([crown_heart_chakra, sacral])
    gemstones.waistbeads.extend([family_of_gems, blue_gemstone, blue_crystal, blue_quartz])
    children.waistbeads.extend([cross, blue_crystal])

    db.session.commit()


def undo__waist_cat():
    db.session.execute('TRUNCATE waistbeads RESTART IDENTITY CASCADE;')
    db.session.execute('TRUNCATE categories RESTART IDENTITY CASCADE;')
    db.session.commit()
