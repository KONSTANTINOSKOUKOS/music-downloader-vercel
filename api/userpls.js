import api from "../spotify";

const formatuserpls = (res) => {
    const pls = [];
    res.items.forEach(el => {
        pls.push({
            name: el.name,
            owner: el.owner.display_name,
            image: el.images[0].url,
            id: el.id
        });
    });
    return {
        pls: pls
    }
};

export default async function (req, res) {
    api.setAccessToken(req.query.token);
    const data = await api.getUserPlaylists({ limit: 50 });
    res.json(formatuserpls(data.body));
}