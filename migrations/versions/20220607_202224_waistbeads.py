"""waistbeads

Revision ID: 5690486fe070
Revises: 8103b7b95ed0
Create Date: 2022-06-07 20:22:24.940086

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '5690486fe070'
down_revision = '8103b7b95ed0'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('waistbeads',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('beader_id', sa.Integer(), nullable=False),
    sa.Column('bead_img_url', sa.String(length=255), nullable=False),
    sa.Column('name', sa.String(length=255), nullable=False),
    sa.Column('price', sa.Float(), nullable=False),
    sa.Column('description', sa.Text(), nullable=True),
    sa.Column('in_stock', sa.Boolean(), nullable=True),
    sa.Column('created_at', sa.DateTime(), nullable=True),
    sa.Column('updated_at', sa.DateTime(), nullable=True),
    sa.ForeignKeyConstraint(['beader_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('name')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('waistbeads')
    # ### end Alembic commands ###