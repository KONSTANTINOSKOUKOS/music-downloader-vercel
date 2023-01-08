import api from "../spotify";
import ytdl from "ytdl-core";
import { search } from "yt-search";

import { createWriteStream } from "fs";

export default async function (req, res) {
    api.setAccessToken(req.query.token);
    const data = await api.getTrack(req.query.id);
    const str = `${data.body.name} ${data.body.artists[0].name}`;
    console.log(str);

    const ress = await search(str);
    const url = ress.videos[0].url;
    const id = ress.videos[0].videoId;

    console.log(url);

    ytdl(url, { format: 'highestaudio', filter: 'audioonly' })
        .pipe(createWriteStream(`tmp/${id}.mp3`))
        .on('finish', () => res.download(`tmp/${id}.mp3`));
}