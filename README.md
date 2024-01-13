# devv

内嵌 https://devv.ai, 自动读取粘贴板的内容并搜索

![img](https://github.com/fzdwx/launcher-devv/assets/65269574/54c95bc3-01b0-4e25-8f5c-eccfdf92c054)

### Install

```shell
ray ext local install -o -i '{
    "name": "Devv",
    "description": "最懂程序员的新一代 AI 搜索引擎",
    "author": "fzdwx",
    "icon": "https://raw.githubusercontent.com/fzdwx/launcher-devv/main/public/logo.png",
    "github": "https://github.com/fzdwx/launcher-devv",
    "actions": [
      {
        "name": "Devv - 复制粘贴板并搜索",
        "command": "devv-clipboard"
      }
    ]
}'
```
