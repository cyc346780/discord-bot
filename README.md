# Discord機器人

🤖 多功能中文Discord機器人

<p>
   <img src="https://img.shields.io/badge/%E7%89%88%E6%9C%AC-1.0.0-blue?style=flat-square" alt="version">
   <img src="https://img.shields.io/badge/license-MIT-yellow?style=flat-square" alt="license">
   <img src="https://img.shields.io/badge/Node.js->=16.9.0-green?style=flat-square&logo=Node.js" alt="node-version">
</p>

---

## 主要功能

- 📊 投票
- 🎵 放音樂
- 

---

## ✅ 前置作業

1. 到 [Discord Developer Portal](https://discord.com/developers/applications) 創建機器人。
2. 將機器人加到伺服器中。
2. 到伺服器新增 **📊投票頻道**、**🎵音樂頻道**。 

---

## 🚀 開始部署

#### 自動部署

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy)

#### 手動部署

1. 安裝 [Node.js](https://nodejs.org/en/download) (版本16.9.0以上)
2. Clone repository
   ```sh
    git clone https://github.com/cyc346780/discord-bot.git
   ```
3. 安裝依賴包
   ```sh
    npm install
   ```
4. 設定 config.json
   ```json
    {
      "TOKEN": "機器人的TOKEN",
      "CLIENT_ID": "機器人的CLIENT_ID",
      "GUILD_ID": "伺服器的ID",
      "VOTE_CHANNEL_ID": "投票頻道的ID",
      "MUSIC_CHANNEL_ID": "音樂頻道的ID"
    }
   ```
5. 開始運行
   ```sh
    npm start
   ```
---

## 📃 指令列表

|指令|說明|選項|範例|
|:-|:-|:-|:-|
|/list|🎵｜列出播放清單|
|/loop|🎵｜開啟/關閉單曲循環|
|/pause|🎵｜暫停播放|
|/play|🎵｜新增歌曲/歌單|網址|/play https://www.youtube.com/watch?v=dQw4w9WgXcQ|
|/resume|🎵｜繼續播放|
|/skip|🎵｜跳下一首|
|/stop|🎵｜終止播放|
|/vote|📊｜發起投票|題目和選項|/vote 哪時候開會 禮拜一 禮拜二 禮拜三

---

## ❗ 注意事項

- **📊投票頻道**、**🎵音樂頻道** 創建後就不要刪除。
- **📊投票頻道**、**🎵音樂頻道** 如果被誤刪，建議重新部署。
- **📊投票頻道**、**🎵音樂頻道** 打指令以外的東西會自動刪除。
-
