import api from "../spotify";

const formattrack = (res) => {//used in other format()'s
    return {
        name: res.name,
        duration: Math.floor(res.duration_ms / 1000),
        id: res.id,
        artist: res.artists[0].name,
        image: res.album.images[0].url,
        preview: res.preview_url
    };
};

const formatusertrs = (res) => {
    const trs = [];
    res.items.forEach(el => {
        trs.push(formattrack(el.track));
    });
    return {
        trs: trs
    }
};

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
    const data = await api.getMySavedTracks({ limit: 50 });
    res.json(formatusertrs(data.body));
}