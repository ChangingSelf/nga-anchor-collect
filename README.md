# 安价快捷收集

一个专为NGA论坛设计的用户脚本，让安价结算变得更加便捷高效。

## 功能特性

- 🖱️ **一键复制**：点击任意楼层内容即可复制，去除引用块和空行
- 🎨 **视觉提示**：鼠标悬停时显示醒目的橙色边框，清楚标出可点击区域
- 📋 **智能清理**：自动去除引用内容，保留纯净的安价信息
- ✅ **状态反馈**：复制成功/失败都有清晰的提示信息
- 🌐 **多域名支持**：支持NGA的所有主要域名

## 安装方法

1. 确保已安装 [Tampermonkey](https://www.tampermonkey.net/) 浏览器扩展
2. 点击以下链接安装脚本：
   - [安装脚本](https://github.com/ChangingSelf/nga-anchor-collect/raw/main/nga-anchor-collect.user.js)
3. 或者手动复制 `nga-anchor-collect.user.js` 的内容到Tampermonkey中新建脚本

## 使用方法

1. 安装脚本后，访问任意NGA帖子页面
2. 鼠标悬停在楼层内容上，会看到橙色边框提示
3. 点击楼层内容即可复制，去除引用块后直接粘贴到安价结算表中

## 支持的域名

- `https://ngabbs.com/read.php*`
- `https://bbs.nga.cn/read.php*`
- `https://nga.178.com/read.php*`
- `https://g.nga.cn/read.php*`

## 技术细节

- **脚本类型**：Tampermonkey用户脚本
- **兼容性**：现代浏览器 + Tampermonkey
- **权限要求**：`GM_addStyle` (样式注入)
- **依赖**：无外部依赖，使用原生浏览器API

## 注意事项

- 脚本仅在帖子阅读页面生效
- 点击时会避开输入框和文本域，防止误操作
- 复制失败时会显示错误提示，可手动复制

## 贡献

欢迎提交Issue和Pull Request来改进这个脚本！

## 许可证

MIT License
