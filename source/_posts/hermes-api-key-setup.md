---
title: API Key 申请及配置到 Hermes 教程
date: 2026-10-25 23:30:00
categories: [技术分享]
tags: [Agent, 教程, 阿里云]
---

## 前言

相信大家也都领到阿里云送的 300 元代金券了，正好拿来给大模型 API 付费——本篇面向小白，手把手演示怎么在阿里云百炼上申请 API Key，并下载 Hermes 接入使用。全程大概 10 分钟。

## 第一步：进入百炼模型广场

打开阿里云百炼的模型市场页面：

> https://bailian.console.aliyun.com/cn-beijing/model/market

用阿里云账号登录后即可看到模型广场，里面有 125+ 个模型（Qwen 系列等），后面调 API 用的就是这里的模型。

## 第二步：创建 API Key

进入页面后，点左下角的「**API-KEY**」按钮：

![阿里云百炼控制台，左下角红箭头处为 API-KEY 入口](hermes-api-key-setup/image-20261025224032657.png)

进入 API Key 管理页后，点右上角的「**创建 API-KEY**」：

![API Key 管理页，右上角红箭头处为创建 API-KEY 按钮](hermes-api-key-setup/image-20261025224126283.png)

创建成功后会得到一串以 `sk-` 开头的 Key。这里有两件事必须注意：

1. **Key 只在创建成功后显示一次**（阿里云是加密存储的，之后无法再查看明文），弹出窗口时第一时间复制保存；
2. **Key 等同于钱包**——拿到它的人都能用你的代金券。别发群里、别上传公开仓库，发截图记得打码。

另外在这一页还能看到两条 **Base URL**（OpenAI 兼容格式和 Anthropic 兼容格式），后面在 Hermes 里配置时除了 Key 还要用到，一并复制保存。

## 第三步：下载 Hermes(可以先搞个梯子，往下看，有梯子可以跳过)

先简单介绍一下 Hermes：对个人用户来说，它就像一个**「越用越懂你、还特别省钱的私人助理」**。

它最大的优点是**会自己学习进化**：你教它做一件事，它不仅会记住，还会自己总结经验，下次不用你废话它就能办妥，甚至能自己给自己写个小工具来干活。其次，它的**记性特别聪明**：只记关键信息、不记流水账，用得越久反而越省钱（Token）。最后，它**极其好养活**：不用花钱买昂贵的云服务，一台几十块的便宜小服务器就能让它 24 小时打工，还可以直接在微信或 Telegram 里给它派活。

安装包不到 8 MB，点下面的按钮就能下载：

<a class="btn btn-primary" href="https://hermes-assets.nousresearch.com/Hermes-Setup.exe?build=f3b5b980d615" download>下载 Hermes 安装包（约 8 MB）</a>

安装包托管在海外服务器，如果下载慢或者失败，需要梯子（不会的往下看）；也可以直接去 Nous Research 官网（nousresearch.com）获取最新版。

## 第四步：把 Key 配置进 Hermes

**1. 打开自定义模型入口。** 启动 Hermes，在主界面下方的模型下拉菜单里选「**添加自定义模型...**」，会跳转到设置页：

![Hermes 主界面，模型下拉菜单中红箭头处为「添加自定义模型...」](hermes-api-key-setup/image-20261025233023373.png)

**2. 粘贴 API Key。** 路径是「设置 =》 提供方 =》 API 密钥」，在列表里找到「**Alibaba Cloud DashScope (China)**」，把上面保存的 `sk-` 开头的 Key 粘贴进去；如果默认地址连不上，可以在下方的「base URL override」里填 OpenAI 兼容地址：

![设置 - 提供方 - API 密钥页，Alibaba Cloud DashScope (China) 一栏粘贴密钥](hermes-api-key-setup/image-20261025233345375.png)

**3. 选模型。** 回到主界面再打开模型下拉，会多出一大批模型，选一个就可以开始对话了。推荐用 **DeepSeek 系列**，比较省钱——用其他系列的花得很快（亲测）：

![模型下拉中出现 DashScope 的模型列表，右侧为思考开关与推理强度选项](hermes-api-key-setup/image-20261025233705604.png)

到这里，恭喜你拥有了一个自己养起来的 AI 助理。后续我在使用中踩到什么坑、折腾出什么新玩法，都会继续更新在这篇教程里。

## 附录：搞个梯子/代理

[Steamcommunity 302 Ver.15.0.9 – Dogfight360](https://www.dogfight360.com/blog/18682/)

1. #### 先下载个代理工具，然后进去选中GitHub，点击启动服务，就可以访问GitHub了

![Steamcommunity 302 主界面：勾选 Github 后点右侧「启动服务」](hermes-api-key-setup/image-20261026000031167.png)

2. #### 去GitHub下载clash verge（最常用的梯子）

https://github.com/clash-verge-rev/clash-verge-rev  

选择最新版下载即可，然后去找个机场买个套餐就行，推荐 https://xn--9kqs1lo79d.com/#/register?code=P7w3cGT2  2块钱一个月，128G。

3. #### 把机场的订阅链接导入 Clash Verge

注册登录机场后，在后台复制你自己的**订阅链接**（一串网址）——注意订阅链接和 API Key 一样属于隐私凭证，**别公开分享，泄露了去机场后台重置**。（可以先用我的 https://cccdd.908970.xyz/api/v1/client/subscribe?token=fbab4790e06ca85c767bced4e3b39af1 开完自己的套餐不要用我的了！）把它粘贴到下图顶部输入框，点「导入」：

![Clash Verge「订阅」页：订阅链接粘贴到顶部输入框后点「导入」](hermes-api-key-setup/image-20261026002316528.png)

然后**回到代理选一个可用的节点**，到首页打开「系统代理」开关就行了，你就学会翻墙了！！！

![Clash Verge「首页」：选好节点后打开「系统代理」开关](hermes-api-key-setup/image-20261026002448856.png)

### 注意：去下方官网申请个自己的订阅，别一直蹭别人的！！！

https://xn--9kqs1lo79d.com/#/register?code=P7w3cGT2
