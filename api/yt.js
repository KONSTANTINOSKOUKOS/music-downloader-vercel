import ytdl from "ytdl-core";
import { createWriteStream } from "fs";

export default async function (req, res) {
    ytdl(`https://www.youtube.com/watch?v=${req.query.id}`, { filter: 'audioonly', quality: 'highestaudio' })
        .pipe(createWriteStream(`tmp/${req.query.id}.mp3`))
        .on('finish', () => res.download(`tmp/${req.query.id}.mp3`));
}