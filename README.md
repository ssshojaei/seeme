Seeme Telegram Bot
======================

SeeMe is a Wizard telegram bot that validates data from a user and publishes it in channel and groups.

this bot based on NodeJS and [Telegraf](https://github.com/telegraf/telegraf) Telegraf framework and [Sharp](https://github.com/lovell/sharp) Library. ES6/ES7 used.

## Before you start
First rename `.env-sample` file to `.env` and fill in all necessary values.
```
BOT_TOKEN="<YOUR_BOT_API_TOKEN>"
DOMAIN="<THE_URL_OF_YOUR_WEBHOOK>"
PORT="<PORT>"
```

## Develop Mode
```
yarn install
yarn dev
```

## Run on Server
```
yarn install
yarn start
```