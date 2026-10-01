# 親子遊戲樂園 — 幼兒遊戲播放器

由「簡報互動遊戲製作器」抽取遊玩模式而成嘅獨立輕量項目。
專為 1–2 歲幼兒設計：淨係玩遊戲，冇編輯器、冇 Firebase、冇 IndexedDB、冇 import/export。

## 項目結構

```
src/
├── main.tsx / index.css / App.tsx   # demo 殼：遊戲選擇頁
├── player/
│   ├── types.ts        # 遊戲數據模型（GameProject / Slide / MovableObject / DropZone）
│   ├── SlideCanvas.tsx # 遊玩模式畫布：touch/mouse 拖拉、碰撞判定、啱錯回饋
│   ├── GamePlayer.tsx  # 包裝組件：計分、廣東話語音指示、下一題、結算畫面
│   ├── Confetti.tsx    # 五彩紙屑
│   └── audio.ts        # WebAudio 合成音效（唔使音檔）
└── games/
    ├── demoImages.ts   # 範例遊戲用嘅 SVG 圖
    ├── fruit-sort.ts   # 內置遊戲：水果大分類
    └── index.ts        # 遊戲清單（加新遊戲喺呢度登記）
```

## 點樣加一個新遊戲

1. 喺遊戲製作器（編輯器）整好遊戲
2. 用編輯器嘅「匯出」功能，得到遊戲 JSON
3. 新增 `src/games/<game-id>.ts`，將 JSON 轉成 TS（參考 `fruit-sort.ts` 格式）：
   ```ts
   import { GameProject } from '../player/types';
   export const myGame: GameProject = { /* 貼上 JSON 內容 */ };
   ```
   - 圖片：JSON 入面嘅 `imageUrl` 係 base64／data URI，直接保留就得；大圖建議先壓縮
   - 每個可拖物件記得設 `isMovable: true`、`rules` 配對、`returnOnWrong: true`
4. 喺 `src/games/index.ts` 嘅 `GAMES` 加一行：
   ```ts
   { id: 'my-game', name: '遊戲名', description: '簡介', emoji: '🎮', game: myGame },
   ```
5. `npm run build`，遊戲即內置，唔使 runtime import

## 幼兒 UX 調整（已內建）

- 可拖物件自動放大到最少 16% 畫布闊度，方便細手指觸控
- 每題自動用 `speechSynthesis` 讀出廣東話指示（`yue-HK`，讀 `slide.title`）
- 答啱：音效＋⭕「好叻！」＋星星粒子＋confetti 小爆發
- 答錯：❌「答錯了！」＋物件震動＋自動彈回原位
- 完成所有題目：結算畫面（答啱 X/Y、星級、大 confetti、「再玩一次」）

## 開發

```bash
npm install
npm run dev     # 本機預覽
npm run build   # production build（自動生成 PWA service worker）
npx tsc --noEmit
```

PWA：已用 `vite-plugin-pwa`，manifest 名「親子遊戲樂園」（zh-Hant），
iPad 經「加入主畫面」安裝即可離線遊玩。
