/**
 * 图片路径修正（before_post_render）
 *
 * 让 Typora「复制图片到 ./${filename} / ../img/${filename}」自动插入的相对路径
 * 在 Hexo 渲染时也能正确解析，无需手动改写：
 *   1. `![](文章名/image.png)` → `![](image.png)`              —— 命中文章资源文件夹（post_asset_folder）
 *   2. `![](../img/xxx/image.png)` → `![](/img/xxx/image.png)`  —— 命中站点全局图片目录
 * 绝对路径（/img/...）、网络图片、锚点不受影响。
 */
hexo.extend.filter.register('before_post_render', function (data) {
  if (!data.content) return data;

  var content = data.content;

  // 1. 去掉 Typora 插入的「文章名/」前缀，交给 postAsset 解析
  var slug = data.slug || '';
  if (slug) {
    var esc = slug.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    content = content.replace(new RegExp('(!\\[[^\\]]*\\]\\()' + esc + '/', 'g'), '$1');
  }

  // 2. 全局图片目录的相对写法转为站点根路径
  content = content.replace(/(!\[[^\]]*\]\()\.\.\/img\//g, '$1/img/');

  if (content !== data.content) {
    data.content = content;
  }
  return data;
});
