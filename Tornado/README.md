## Tornado Project Skeleton

```shell
.
├── README.md
├── __pycache__
│   └── urls.cpython-36.pyc
├── app.py
├── config
│   └── settings.py
├── handlers
│   ├── __init__.py
│   ├── __pycache__
│   ├── test_handlers	# Tornado没有自带rest，如果想实现rest可以这样子做，将同一个资源的handlers放在一起，其中包含多个handler类
│   └── hello.py
├── models
├── requirements.txt
├── static
├── templates
├── tests
├── urls.py
└── utils
```

