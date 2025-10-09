const axios = require("axios");
const cheerio = require("cheerio");
const crypto = require("crypto");
const fs = require('fs');
(async () => {
    const res = await axios.get("https://ahri-d6j8y-clist.top/");
    const $ = cheerio.load(res.data);
    // let key = "";
    // let iv = "";
    // const scripts = $("script");

    // for (let i = 0; i < scripts.length; i++) {
    //     const scriptContent = $(scripts[i]).html();
    //     if (
    //         scriptContent &&
    //         scriptContent.includes("aek") &&
    //         scriptContent.includes("aei")
    //     ) {
    //         const aekMatch = scriptContent.match(/aek\s*=\s*'([^']+)'/);
    //         const aeiMatch = scriptContent.match(/aei\s*=\s*'([^']+)'/);

    //         if (aekMatch && aekMatch[1]) {
    //             key = aekMatch[1];
    //         }

    //         if (aeiMatch && aeiMatch[1]) {
    //             iv = aeiMatch[1];
    //         }
    //         break;
    //     }
    // }

    // // 解密过程

    // const urlList = [];
    // $("p.d").each((_, element) => {


    //     const encryptedBase64 = $(element).text().replace(/\s/g, "");
    //     //encryptedData替换空格
    //     const encryptedData = Buffer.from(encryptedBase64, 'base64');


    //     if (encryptedBase64) {
    //         const decipher = crypto.createDecipheriv(
    //             "aes-128-cbc",
    //             key,
    //             iv
    //         );
    //         decipher.setAutoPadding(true); // 开启 PKCS7 自动去 padding

    //         let decrypted = decipher.update(encryptedData, null, 'utf8');
    //         decrypted += decipher.final('utf8');
    //         if(decrypted=='影片'){
    //           return false;
    //         }
    //         const regex = /<a\s+[^>]*href="([^"]+)"[^>]*>([^<]+)<\/a>/g;

    //         while ((match = regex.exec(decrypted)) !== null) {
    //             const href = match[1];
    //             urlList.push(href.replace(/\/$/, ''));
    //         }


    //     }
    // });
     const urlList = [];

    $("a").each((_, element) => {
        const href = $(element).attr("href");
        if (href) {
            urlList.push(href.replace(/\/$/, ''));
        }
    });
if(urlList.length>0){
    // 定义文件路径
    const filePath = 'ahri8.txt';
    // 写入文件并覆盖原有内容
    fs.writeFile(filePath, urlList.join(','), (err) => {
        if (err) {
            console.error('写入文件时发生错误:', err);
        } else {
            console.log('文件已成功写入');
        }
    });
}

})();
