import api from "../spotify";

const formatalbum = (res) => {//for /album
    return {
        name: res.name,
        id: res.id,
        artist: res.artists[0].name,
        image: res.images[0].url
    };
};

const formatuserals = (res) => {
    const als = [];
    res.items.forEach(el => {
        als.push(formatalbum(el.album));
    });
    return {
        als: als
    }
};

export default async function (req, res) {
    api.setAccessToken(req.query.token);
    const data = await api.getMySavedAlbums({ limit: 50 });
    res.json(formatuserals(data.body));
}