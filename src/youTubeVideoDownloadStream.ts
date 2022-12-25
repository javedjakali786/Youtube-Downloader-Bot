import fs from 'fs'
import ytdl from 'ytdl-core'
import {VIDEO_PATH} from './consts'

export const youTubeVideoDownloadStream = (url: string): fs.WriteStream => {
	const video = ytdl(url, {quality: 18})
	const stream = fs.createWriteStream(VIDEO_PATH)
	video.pipe(stream)
	return stream
}
