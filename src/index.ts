import fs from 'fs'
import {TELEGRAM_BOT_TOKEN} from './config'
import {Telegraf} from 'telegraf'
import {
	downloadErrorMessage,
	downloadStartMessage,
	downloadSuccessMessage,
	greetingMessage,
	URLCheckErrorMessage, videoSendError
} from './messageTexts'
import {URLCheck} from './URLCheck'
import {youTubeVideoDownloadStream} from './youTubeVideoDownloadStream'
import {TEMP_PATH, VIDEO_PATH} from './consts'

const bot = new Telegraf(TELEGRAM_BOT_TOKEN)

bot.start(ctx => ctx.reply(greetingMessage))
bot.help(ctx => ctx.reply(greetingMessage))
bot.on('text', ctx => {
	const youTubeVideoURL: string = ctx.message.text
	if (URLCheck(youTubeVideoURL)) {
		try {
			const downloadStream: fs.WriteStream = youTubeVideoDownloadStream(youTubeVideoURL)
			downloadStream.once('open', () => ctx.reply(downloadStartMessage))
			downloadStream.once('close', () => {
				ctx.replyWithVideo({source: VIDEO_PATH})
					.then(() => ctx.reply(downloadSuccessMessage))
					.catch(() => ctx.reply(videoSendError))
			})
			downloadStream.once('error', () => ctx.reply(downloadErrorMessage))
		} catch {
			ctx.reply(downloadErrorMessage)
		}
	}
	else {
		ctx.reply(URLCheckErrorMessage)
	}
})

const startBotPolling = async () => {
	if (!fs.existsSync(TEMP_PATH)) {
		fs.mkdirSync(TEMP_PATH)
	}
	console.log('Bot polling started...')
	await bot.launch()
}

startBotPolling()
