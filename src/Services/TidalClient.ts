import Tidal from "tidal-api-wrapper";
import config from "../../TidalConfig.json";

const client = new Tidal({
    countryCode: "PL",
});

client.login(config.username, config.password);

export default client;