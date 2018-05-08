import Tidal from "./Tidal";
import config from "../../TidalConfig.json";

const tidalClient = new Tidal({
    username: config.username,
    password: config.password,
    countryCode: "PL"
});

export default tidalClient;