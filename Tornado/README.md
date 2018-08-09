## Tornado Project Skeleton

```shell
Tornado
├── README.md
├── app.py
├── db.py
├── handlers			# controller层
│   ├── __init__.py
│   ├── base_handler.py
│   ├── hello.py
│   └── user_handlers.py
├── managers			# manager层(介于model与controller之间)
│   └── __init__.py
├── models				# model层，纯定义model
│   ├── __init__.py
│   └── user.py
├── requirements.txt
├── settings
│   ├── __init__.py
│   └── constants.py
├── static
├── templates
├── test.db
├── tests
├── urls.py
└── utils
    └── custom_exceptions.py
```
