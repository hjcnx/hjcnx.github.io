/**
 * 图片路径修正（before_post_render）
 *
 * 目标：写作时完全不用关心路径和压缩，编辑器里怎么顺手怎么写。
 *
 * 1. 路径前缀修正（Typora「复制图片到 ./${filename}」会插入文章名前缀，
 *    手写时也常有人写成 /文章名/ 或 ../img/）：
 *      ![](文章名/image.png)   → ![](image.png)          命中文章资源文件夹（postAsset 解析）
 *      ![](/文章名/image.png)  → ![](image.png)
 *      ![](../img/xxx.png)     → ![](/img/xxx.png)        命中站点全局图片目录
 *
 * 2. 自动 WebP：若图片同目录存在同名 .webp，渲染时把 .png/.jpg 引用换成 .webp。
 *    md 里继续写 .png（Typora 预览照常），网站实际输出压缩图。
 */
hexo.extend.filter.register('before_post_render', function (data) {
  if (!data.content) return data;

  var fs = require('fs');
  var path = require('path');
  var content = data.content;

  var slug = data.slug || '';
  var esc = slug ? slug.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') : '';
  var srcDir = path.join(hexo.source_dir, path.dirname(data.source || ''));
  var assetDir = slug ? path.join(srcDir, slug) : null;

  // 1a. 去掉「文章名/」与「/文章名/」前缀
  if (slug) {
    content = content.replace(new RegExp('(!\\[[^\\]]*\\]\\()' + esc + '/', 'g'), '$1');
    content = content.replace(new RegExp('(!\\[[^\\]]*\\]\\()/'+ esc + '/', 'g'), '$1');
  }

  // 1b. 全局图片目录的相对写法转为站点根路径
  content = content.replace(/(!\[[^\]]*\]\()\.\.\/img\//g, '$1/img/');

  // 2. 存在同名 .webp 时自动替换扩展名（仅相对路径，跳过网络图/锚点/已是 webp 的）
  content = content.replace(
    /(!\[[^\]]*\]\()(?!https?:\/\/|\/\/|#|data:)([^)\s]+?)\.((?:png|jpe?g))(\s*\))/gi,
    function (match, prefix, name, ext, tail) {
      var candidates = [
        assetDir && path.join(assetDir, name + '.webp'),
        path.join(srcDir, name + '.webp'),
        path.join(hexo.source_dir, name.replace(/^\/+/, '') + '.webp')
      ];
      for (var i = 0; i < candidates.length; i++) {
        if (candidates[i] && fs.existsSync(candidates[i])) {
          return prefix + name + '.webp' + tail;
        }
      }
      return match;
    }
  );

  if (content !== data.content) {
    data.content = content;
  }
  return data;
});
