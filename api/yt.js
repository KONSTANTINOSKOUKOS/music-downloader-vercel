import ytdl from "ytdl-core";
import { createWriteStream } from "fs";

export default async function (req, res) {
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');
    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    ytdl(`https://www.youtube.com/watch?v=${req.query.id}`, { filter: 'audioonly', quality: 'highestaudio' })
        .pipe(createWriteStream(`tmp/${req.query.id}.mp3`))
        .on('finish', () => res.download(`tmp/${req.query.id}.mp3`));
}