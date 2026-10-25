---
title: 夜航玻璃主题的全要素试炼
date: 2026-10-20 22:30:00
categories:
  - 前端
tags:
  - 设计系统
  - CSS
  - Hexo
---

这篇文章把主题会用到的排版要素一次练全，方便验收视觉效果。看完可以直接删掉。

<!-- more -->

## 二级标题：段落与强调

正文使用 `white/80` 的半透明白，行宽限制在 72 字符以内，保证长文的阅读节奏。这里有一段**加粗文字**、一段*斜体文字*，还有一个行内代码 `backdrop-filter: blur(60px) saturate(180%)`，以及一个[指向归档页的链接](/archives/)。

玻璃拟态的本质是光学，而不是配色。真实的玻璃没有颜色——它只是借用、弯曲、柔化背后的光。

## 三级标题：引用块

> 引用块被做成一块更薄的玻璃：低透明度白 + 细边框 + 顶边高光。
> 它安静地嵌在正文里，不打断夜色的节奏。

## 列表

无序列表：

- 深墨夜景底色 `#0B1322`，光源由场景承载
- 玻璃面板永远无色，透明度 5%–12%
- 唯一强调色：香槟金 `#E4B863`

有序列表：

1. 写下第一行代码
2. 把光斑放进夜里
3. 让玻璃去借光

## 代码块

JavaScript：

```js
// 光斑视差：让三个光源跟随指针轻微漂移
const wells = document.querySelectorAll('.well');
const depths = [26, -18, 14];

function step() {
  wells.forEach((well, i) => {
    const d = depths[i];
    well.style.transform = `translate3d(${-cx * d}px, ${-cy * d}px, 0)`;
  });
  requestAnimationFrame(step);
}
```

命令行：

```bash
hexo clean && hexo generate && hexo server
```

## 表格

| Token | 值 | 用途 |
| --- | --- | --- |
| 深墨蓝 | `#0B1322` | 主背景 |
| 月光 | `#7C9CC4` | 光源光斑（亮） |
| 香槟金 | `#E4B863` | 唯一强调色 |

## 图片

![夜航玻璃场景插画：深蓝夜空、香槟色月亮与远山](/img/sample-night.svg)

---

到这儿就结束了。确认过视觉效果后，这篇文章可以随时删除。
