import api from "../spotify";

const formattrack = (res) => {//used in other format()'s
    return {
        name: res.name,
        duration: res.duration_ms,
        id: res.id,
        artist: res.artists[0].name,
        image: res.album.images[0].url
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
    api.setAccessToken(req.query.token);
    const data = await api.getMySavedTracks({ limit: 50 });
    res.json(formatusertrs(data.body));
}