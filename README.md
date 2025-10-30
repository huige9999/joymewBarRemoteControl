# joymew-remoteControl

## 项目介绍

前端网页项目，内嵌于「嗨喵助手」小程序、「嗨喵悦动」桌面端，用于远程遥控嗨喵大屏。

申请活动后，在「嗨喵助手」小程序中选择对应活动的「遥控本场」即可体验本项目。

## 开发环境配置

### 基础配置

- Node.js: v14.17.5；
- npm: v6.14.14；

### IDE配置

使用VScode作为IDE。在VScode扩展搜索栏中输入`@recommended`可查看本项目推荐的VScode扩展。

同时针对`Prettier`的`Eslint`的使用，在`.vscode\settings.json`中也进行相应的配置，使用VScode时会自动应用。

### Host配置

需要将本机地址映射为`dev.joymew.com`，以通过图片资源访问的限制。

打开hosts配置文件，添加以下内容：

```
127.0.0.1      dev.joymew.com
localhost      dev.joymew.com
::1            dev.joymew.com
```

## 项目启动

### 安装npm包

执行以下命令安装npm包：

```
npm install
```

执行以下命令启动项目：

```
  npm run dev
```

### 网址拼接及访问

登录[嗨喵官网](https://www.hudongmiao.com/#/)，在`Local storage`中复制token，再复制需要控制的活动的`liveId`，拼接并访问以下网址：

`http://dev.joymew.com:82/hm-remotecontrol/#/controller?liveid=活动的liveId&token=用户token`，例如：


```
http://dev.joymew.com:82/hm-remotecontrol/#/controller?liveid=b1262b2b14374f55abdda90f14b4624b&token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHQiOjE3NjE4MTcwNDc2NTcsInVpZCI6ImY2YWI4Njk1NjFhMjQyOTlhYThiYWY3MjhkNTQ5YjIzIiwiaWF0IjoxNzYwMDg5MDQ3NjU3fQ.Fnr4gVMp8amCiJcpOuW3gZktFX3e05Wgi2hYcDI0YEg
```