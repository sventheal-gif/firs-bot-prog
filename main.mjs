// main.mjs - Discord Botのメインプログラム

// 必要なライブラリを読み込み
import { Client, GatewayIntentBits } from 'discord.js';
import dotenv from 'dotenv';
import express from 'express';

// .envファイルから環境変数を読み込み
dotenv.config();

// Discord Botクライアントを作成
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,           // サーバー情報取得
        GatewayIntentBits.GuildMessages,    // メッセージ取得
        GatewayIntentBits.MessageContent,   // メッセージ内容取得
        GatewayIntentBits.GuildMembers,     // メンバー情報取得
    ],
});


// Botが起動完了したときの処理
client.once('ready', () => {
    console.log(`🎉 ${client.user.tag} が正常に起動しました！`);
    console.log(`📊 ${client.guilds.cache.size} つのサーバーに参加中`);
});

// メッセージが送信されたときの処理
client.on('messageCreate', async (message) => {
    // Bot自身のメッセージは無視
    if (message.author.bot) return;

    // もちもち金玉
    if (message.content.toLowerCase() === 'しゅんぺいの金玉は？') {
        message.reply('もちもち！ふかふか！');
        console.log(`📝 ${message.author.tag} が しゅんぺいの金玉は？ コマンドを使用`);
    }

    // デカキャラ一覧
    if (message.content.toLowerCase().startsWith('!S')) {
        message.reply('ザンギ、マリーザ、本田');
        console.log(`📝 ${message.author.tag} が しゅんぺいの金玉は？ コマンドを使用`);
    }

    //ニックネーム変更
    if (message.content.toLowerCase().startsWith('!rank?')) {
        let rank =message.content.toLowerCase().split('?');
        if(rank.length === 1){
            message.reply('!rank?ダイヤ1 のように入力してください');
        }{
        let name =message.member.displayName.split('rank：');
        await message.member.setNickname(name[0] + ' rank：' + rank[1]);
        }
   }
});

// エラーハンドリング
client.on('error', (error) => {
    console.error('❌ Discord クライアントエラー:', error);
});

// プロセス終了時の処理
process.on('SIGINT', () => {
    console.log('🛑 Botを終了しています...');
    client.destroy();
    process.exit(0);
});

// Discord にログイン
if (!process.env.DISCORD_TOKEN) {
    console.error('❌ DISCORD_TOKEN が .env ファイルに設定されていません！');
    process.exit(1);
}

console.log('🔄 Discord に接続中...');
client.login(process.env.DISCORD_TOKEN)
    .catch(error => {
        console.error('❌ ログインに失敗しました:', error);
        process.exit(1);
    });

// Express Webサーバーの設定（Render用）
const app = express();
const port = process.env.PORT || 3000;

// ヘルスチェック用エンドポイント
app.get('/', (req, res) => {
    res.json({
        status: 'Bot is running! 🤖',
        uptime: process.uptime(),
        timestamp: new Date().toISOString()
    });
});

// サーバー起動
app.listen(port, () => {
    console.log(`🌐 Web サーバーがポート ${port} で起動しました`);
});