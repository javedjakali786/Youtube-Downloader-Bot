# YouTube Download Bot
Telegram bot that allows to download videos from YouTube

Link to bot: https://t.me/youtube_downloader_nodejs_bot

Built on `Telegraf.js`. See: https://telegrafjs.org/

## Run locally
To run the bot locally on your system:
1. Clone this repository
    ```shell
    git clone git@github.com:shelepuginivan/youtube-downloader-bot.git
    ```
2. Set environment variable `bot_token`:
    
    On Unix/Linux/WSL: `export bot_token=GET_YOUR_TOKEN_FROM_FATHERBOT`

    On Windows, set environment variable throw `sysdm.cpl`

    Or simply add your variable to `config.ts`:

    ```typescript
   export const TELEGRAM_BOT_TOKEN: string = 'PUT_TOKEN_HERE'
   ```

3. Run `scripts/start.sh`

    On Unix/Linux/WSL: `scripts/start.sh`

    On Windows: `bash scripts/start.sh`

The above commands will spawn a daemon process with `pm2`.

See: https://pm2.keymetrics.io/

To stop the bot, kill process by its pid. 

## Bot usage

`/start`, `/help` - will show intro message with all information

To download a video:

1. Send bot a link to the video
2. Wait for the video to download. That may take some time
3. Bot will automatically send an `*.mp4` file with your video
