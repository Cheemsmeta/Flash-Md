const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'FLASH-MD-WA-BOT;;;=>eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiV0NIcXhsRUJUR2QrS2V2bW5LS2JFNUxJNTdxaXVZUC9UOVQrNHhmUmNXQT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiYlFrbzFvN3BlazMyS2ZzL1hLZkxPYmlvZ1Y2M2hzbkVXN04xVUlEWmF5cz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJDT21yMklyMzJXZ3JLK1pBR2lVZkhPcVdsNG1TVEllaFBXRzdIZkRyUDF3PSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJZcU5xMkg5VWFPd3RhdTRwbzYzSmVwQlk2ZFMyWkxBTXdaZ3N6RjE2enlnPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImlLYkFNQ0UyVGUvbDU3UXRKTHpqK0hwZEladkZxSDEwQkhvZS9Eay9abUE9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkVlajdZcHFKVERyWmRObVBHOFYwTVY4dWxSbXlWa1FZTEpqNllXNitRVk09In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiaVBGSW00UkZjbmMvKy9hdzhjVXAyTUlscVkrS2RURWVxYXVKeHFwL08zaz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiVjhvVUFzVFU4eG83UFJVZUFKbk56VXozSEZMK0ovMHpBbFJKMm54RVptaz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImdpWjJMcmpKVVNmNWp6SnRoR1p6TCt1VlhQU3VCVkc0MzZIR0JDazBBY3dXS0plcmdIdHNGSzU2TTRRdk1TZ0UxaUJtdWZJVE9pSlRCNzA5dzFIREJBPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6NzgsImFkdlNlY3JldEtleSI6IjNaTk10UCs0ckxiUUN5VDVFTVo4R21jaVdOR01vc1QyKzdXQ2FsTVA4REk9IiwicHJvY2Vzc2VkSGlzdG9yeU1lc3NhZ2VzIjpbXSwibmV4dFByZUtleUlkIjozMSwiZmlyc3RVbnVwbG9hZGVkUHJlS2V5SWQiOjMxLCJhY2NvdW50U3luY0NvdW50ZXIiOjAsImFjY291bnRTZXR0aW5ncyI6eyJ1bmFyY2hpdmVDaGF0cyI6ZmFsc2V9LCJkZXZpY2VJZCI6IkZyX2V0dmtrVFlTYUNRcko0UUUxN1EiLCJwaG9uZUlkIjoiYWJmZDA0YzQtNjY0Ny00ZGYxLTkyNTEtMzNlNDIzYmI2NDBmIiwiaWRlbnRpdHlJZCI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlFhYWFYdWFLYkFSOStxUUlvc2MrMVRlcVc1VT0ifSwicmVnaXN0ZXJlZCI6dHJ1ZSwiYmFja3VwVG9rZW4iOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJzREUvWU8xQUM0VzFjdDV3NlhRTU1pOEQ5bGs9In0sInJlZ2lzdHJhdGlvbiI6e30sInBhaXJpbmdDb2RlIjoiUUQxUEtUWjEiLCJtZSI6eyJpZCI6IjIyMzg5NTIwOTQ2Ojc3QHMud2hhdHNhcHAubmV0In0sImFjY291bnQiOnsiZGV0YWlscyI6IkNKS2I1N2tHRU1yZnBMUUdHQVlnQUNnQSIsImFjY291bnRTaWduYXR1cmVLZXkiOiJFNU5ZQzZONXQ1NTVSVGoyOC92UXBGT0JJN1ZVeitvSjVINTZTOUNLSWtjPSIsImFjY291bnRTaWduYXR1cmUiOiJMcmlBV2hMVEtpZ21MMWVvd3hPcSs4VUYwYWxqNWVsSzdXTXBUUkxEZ3U4dS9BV1lURW03a2dtR2lVWUlWZm1DWWE3TEsvZytZcWZwdGlDaHB0WkxDdz09IiwiZGV2aWNlU2lnbmF0dXJlIjoiUVpyQUE2ZHNjZ0hheW9tTWREL2NSU0U2bXJzem9jTGh5QzVFRkNOeG82VWlTUURSZGE5V1JBWmtBVGRaaC9kb3QvdzJIbWY1SDhDREw2cmhqUmYrRFE9PSJ9LCJzaWduYWxJZGVudGl0aWVzIjpbeyJpZGVudGlmaWVyIjp7Im5hbWUiOiIyMjM4OTUyMDk0Njo3N0BzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJST1RXQXVqZWJlZWVVVTQ5dlA3MEtSVGdTTzFWTS9xQ2VSK2VrdlFpaUpIIn19XSwicGxhdGZvcm0iOiJhbmRyb2lkIiwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzIwMjY2NzEyLCJteUFwcFN0YXRlS2V5SWQiOiJBQUFBQUJ6MCJ9',
    PREFIXE: process.env.PREFIX || "+",
    OWNER_NAME: process.env.OWNER_NAME || "DeVILOUS",
    NUMERO_OWNER : process.env.OWNER_NUMBER || "22389520946", 
             
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "no",
AUTOREAD_MESSAGES: process.env.AUTO_READ_MESSAGES || "no",
CHATBOT: process.env.CHAT_BOT || "yes",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'no',
    BOT : process.env.BOT_NAME || 'FLASH-MD',
    OPENAI_API_KEY : process.env.OPENAI_API_KEY || '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',
    URL : process.env.BOT_MENU_LINKS || 'https://static.animecorner.me/2023/08/op2.jpg',
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'no',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_API_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    PRESENCE : process.env.PRESENCE || '',
    //GPT : process.env.OPENAI_API_KEY || '',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'no',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9" : "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9",
    /* new Sequelize({
     dialect: 'sqlite',
     storage: DATABASE_URL,
     logging: false,
})
: new Sequelize(DATABASE_URL, {
     dialect: 'postgres',
     ssl: true,
     protocol: 'postgres',
     dialectOptions: {
         native: true,
         ssl: { require: true, rejectUnauthorized: false },
     },
     logging: false,
}),*/
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
