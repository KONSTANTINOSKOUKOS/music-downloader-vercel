import api from "../spotify";
import ytdl from "ytdl-core";
import { search } from "yt-search";

import { createWriteStream, statSync, readFile } from "fs";

export default async function (req, res) {
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');
    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    api.setAccessToken(req.query.token);
    const data = await api.getTrack(req.query.id);
    const str = `${data.body.name} ${data.body.artists[0].name}`;
    console.log(str);

    const ress = await search(str);
    const url = ress.videos[0].url;
    const id = ress.videos[0].videoId;

    console.log(url);

    const name = `/tmp/${id}.mp3`;
    console.log(name);

    ytdl(url, { format: 'highestaudio', filter: 'audioonly' })
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