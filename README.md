# Portfolio Site

A project to test different methods of deploying web apps to AWS, starting with a static amplify-deployed website.

Local-first Django + Wagtail portfolio site with an information-security blog.

## Local development

1. Create and activate a Python virtual environment.
2. Install dependencies from `requirements.txt`.
3. Run `python manage.py makemigrations` and `python manage.py migrate`.
4. Create a superuser with `python manage.py createsuperuser`.
5. Start the dev server with `python manage.py runserver`.

The app is designed to run locally first and later move to EC2 with S3-backed media storage.
