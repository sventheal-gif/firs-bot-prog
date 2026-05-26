const readline = require("readline");

// 疑似DB（100件）
const database = createsiegeData();

/**
 * オペレータデータ作成
 */
function createsiegeData() {
    const categories = ["オペレータ名", "ガジェット1", "ガジェット2", "足", "工事"];
    const list = [];

        list.push({
            name: `パルス`,
            gadget1: `ニトロセル`,
            gadget2: `有刺鉄線`,
            speed: '3',
            work: 1
        });

    return list;
}

/**
 * 疑似検索
 * code, name, category を部分一致検索
 */

// 入力された指示に応じて検索条件を変更すれば解決？
// ２要素以上であればAND検索、１要素であればOR検索
function search(keyword) {
    return database.filter(data =>
        data.name.includes(keyword) ||
        data.gadget1.includes(keyword) ||
        data.gadget2.includes(keyword) ||
        data.speed.includes(keyword) ||
        data.work.toString().includes(keyword)
    );
}

// コンソール入力
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question("検索キーワードを入力してください: ", (keyword) => {

    const results = search(keyword);

    if (results.length === 0) {
        console.log("該当データはありません。");
    } else {
        console.log("検索結果:");
        results.forEach(data => {
            console.log(
                `コード: ${data.code}, 名前: ${data.name}, カテゴリ: ${data.category}`
            );
        });
    }

    rl.close();
});