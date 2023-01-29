import ytdl from "ytdl-core";
import { createWriteStream, statSync, readFile } from "fs";

export default async function (req, res) {
    res
        .setHeader('Access-Control-Allow-Credentials', true)
        .setHeader('Access-Control-Allow-Origin', '*')
        .setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT')
        .setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');
    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    const name = `/tmp/${req.query.id}.mp3`;
    console.log(name);

    ytdl(`https://www.youtube.com/watch?v=${req.query.id}`, { filter: 'audioonly', quality: 'highestaudio' })
        .pipe(createWriteStream(name))
        .on('finish', () => {
            console.log('finished');
            const stats = statSync(name);
            console.log(stats.size);
            readFile(name, { encoding: 'binary', flag: 'r' }, (err, data) => {
                if (err) console.log(err);
                res
                    .setHeader('Content-Length', stats.size)
                    .setHeader('Content-Type', 'audio/mpeg')
                    .setHeader('Content-Disposition', `attachment; filename=${req.query.id}.mp3`);
                res.write(data, 'binary');
                res.end();
            });
        });
}