interface Configuration {
    apiEndpoint: string;
    authSecret: string;
}

const config: Configuration = {
    apiEndpoint: "https://localhost:5000",
    authSecret: "secret"
};

export default config;
