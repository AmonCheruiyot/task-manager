from faker import Faker
from random import choice
from app import create_app, db
from app.models import Task, STATUS_VALUES  # <- updated import

fake = Faker()

def seed_tasks(n=20):
    app = create_app()
    with app.app_context():
        db.drop_all()
        db.create_all()

        for _ in range(n):
            due_date = fake.date_between(start_date="today", end_date="+30d")
            task = Task(
                title=fake.sentence(nb_words=4).rstrip("."),
                description=fake.paragraph(nb_sentences=2),
                status=choice(STATUS_VALUES),
                due_date=due_date.isoformat(),
            )
            db.session.add(task)

        db.session.commit()
        print(f"✅ Seeded {n} tasks into the database.")

if __name__ == "__main__":
    seed_tasks(20)
