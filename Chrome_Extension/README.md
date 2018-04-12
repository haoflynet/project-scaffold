## Chrome Extension Skeleton

```shell
.
├── background.js			# 注册监听事件，可以在这里面声明遇到哪些域名才激活插件
├── images
│   ├── get_started128.png
│   ├── get_started16.png
│   ├── get_started32.png
│   └── get_started48.png
├── manifest.json			# 入口文件，定义了插件的基本信息。page_action定义了有哪些页面，default_popup表示点击后默认的弹出页
├── options.html
├── options.js
├── popup.html		# 默认的弹出页，就是一个完整的html，需要js脚本的话也许要单独引用。chrome强制要求js与html文件分开放
└── popup.js		# 该样例里面主要的业务逻辑就在这里面
```

