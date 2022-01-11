#BusyBeaver 

Install Django : `python3 -m pip install Django`
`brew install redis`

Other prereqs:
`pip3 install djangorestframework django-cors-headers`
`pip3 install Pillow`
`pip3 install django-rest-knox`
`pip3 install pyyaml uritemplate`
`pip3 install channels_redis`
`pip3 install channels`

Start the webserver : `python3 manage.py runserver`

Apply changes to the database:

`python3 manage.py makemigrations`

`python3 manage.py migrate`
