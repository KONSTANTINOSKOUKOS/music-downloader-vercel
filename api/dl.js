import api from "../spotify";
import storage from "../firebase";
import { ref, getDownloadURL, uploadBytes } from "firebase/storage";
import ytdl from "ytdl-core";
import { search } from "yt-search";

import { createWriteStream, readFile } from "fs";

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

    const name = `tmp/${id}.mp3`;
    console.log(name);

    ytdl(url, { format: 'highestaudio', filter: 'audioonly' })
        .pipe(createWriteStream(name))
        .on('finish', () => {
            console.log('finished');
            readFile(name, { encoding: 'binary', flag: 'r' }, async (err, data) => {
                if (err) console.log(err);

                const fileref = ref(storage, `${id}.mp3`);
                await uploadBytes(fileref, Buffer.from(data, 'binary'), { contentType: 'audio/mpeg' });
                const url = await getDownloadURL(fileref);
                console.log(url);
                res.json({ url: url });
            });
        });
}