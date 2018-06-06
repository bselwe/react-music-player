interface Configuration {
    apiEndpoint: string;
    authSecret: string;
}

const config: Configuration = {
    apiEndpoint: "http://192.168.111.46:5000",
    authSecret: "secret"
};

export default config;
