import api from "../spotify";

export default async function (req, res) {
    api.setAccessToken(req.query.token);
    const data = await api.getMe();
    const image = data.body.images[0]?.url;
    res.json(image ? { name: data.body.display_name, image: image } : { name: data.body.display_name });
}