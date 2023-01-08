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

const formatplaylist = (res) => {//for /playlist
    const tracks = [];
    res.tracks.items.forEach(el => {
        tracks.push(formattrack(el.track));
    });
    return {
        name: res.name,
        id: res.id,
        tracks: tracks,
        owner: res.owner.display_name,
        image: res.images[0].url
    };
};

export default async function (req, res) {
    api.setAccessToken(req.query.token);
    const data = await api.getPlaylist(req.query.id);
    res.json(formatplaylist(data.body));
}