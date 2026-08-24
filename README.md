# Panduan Lapangan Terbang Antarabangsa Brunei

面向旅客的独立、非营利科普落地页项目。主站内容采用文莱当地马来语（`ms-BN`），地点为 Brunei International Airport（BWN / WBSB），Bandar Seri Begawan BB2513。

## 技术栈

- Astro `7.2.4`
- Tailwind CSS `4.3.3` + `@tailwindcss/vite 4.3.3`
- TypeScript `6.0.3`
- `@astrojs/check 0.9.10`
- `@astrojs/sitemap 3.7.3`
- pnpm `11.22.0`（由 `packageManager` 与 `engines.pnpm` 固定）
- Node.js `24.19.0`（由 `.node-version` 与 `engines.node` 固定）
- Cloudflare Workers Static Assets；部署脚本固定 `wrangler@4.125.0`

所有 package.json 依赖均为精确版本，没有 `latest`、`*`、`^`、`~` 或浮动范围。项目为单包项目，不包含 `pnpm-workspace.yaml`。

## 域名配置：只改一个位置

编辑 `astro.config.mjs` 顶部的 `site` 常量。当前为空字符串，项目仍应正常构建：

- 不输出伪造 canonical；
- 不输出伪造绝对 Open Graph URL；
- JSON-LD 中省略未能安全生成的绝对 URL；
- `@astrojs/sitemap` 在 `site` 为空时不会启用；
- `robots.txt` 仅在 `Astro.site` 存在时附加 sitemap 地址。

域名确定后，只需填写真实生产 URL 并重新构建。

## 本地开发与交付自检

```bash
corepack enable
CI=1 corepack pnpm install --frozen-lockfile
pnpm check
pnpm build
node scripts/verify-build.mjs
```

严格复核可先删除 `node_modules` 后重新执行以上流程。

## Cloudflare Workers 部署

`wrangler.jsonc` 使用 Workers Static Assets 指向 `./dist`。部署：

```bash
pnpm deploy
```

`pnpm deploy` 使用固定的 `wrangler@4.125.0`，不会依赖构建机默认 Wrangler 版本。

## 隐私与 GA4

GA4 ID 已配置为 `G-HXM22WWPKP`，但不会默认注入。用户必须在 `/tetapan-kuki/` 主动开启分析选项后，网站才加载 Google Analytics。营销/个性化广告类别保持关闭。

Google 地图 iframe 使用 `ms` / `BN` 语言地区参数，并以 `loading="lazy"` 加载。

## 图片

真实照片已转为本地 WebP，页面运行时不需要从图片站点外链加载：

- Pangalau — CC BY-SA 4.0
- Iqbal Selamat — CC BY 2.0
- Newsliner — CC BY-SA 4.0
- zulfadli — CC BY-SA 4.0

详细来源见 `SOURCES.md` 与主页面“ Kredit imej ”。
