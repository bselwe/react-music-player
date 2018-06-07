interface Configuration {
    apiEndpoint: string;
    authSecret: string;
}

const config: Configuration = {
    apiEndpoint: "http://10.0.2.2:5000",
    authSecret: "secret"
};

export default config;
