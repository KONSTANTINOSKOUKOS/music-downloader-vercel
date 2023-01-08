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

const formatsearch = (res) => {
    const trs = [];
    res.tracks.items.forEach(el => {
        trs.push(formattrack(el));
    });
    const pls = [];
    res.playlists.items.forEach(el => {
        pls.push({//                      !!!! NO TRACKS
            name: el.name,
            owner: el.owner.display_name,
            image: el.images[0].url,
            id: el.id
        });
    });
    const als = [];
    res.albums.items.forEach(el => {
        als.push({//                      !!!! NO TRACKS
            name: el.name,
            id: el.id,
            artist: el.artists[0].name,
            image: el.images[0].url
        });
    });
    return {
        tracks: trs,
        playlists: pls,
        albums: als
    }
}

export default async function (req, res) {
    api.setAccessToken(req.query.token);
    const data = await api.search(req.query.term, ['track', 'playlist', 'album'], { limit: 20 });
    res.json(formatsearch(data.body));
}