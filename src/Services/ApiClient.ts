import config from "../Configuration/Config";
import { HttpClient } from "./HttpClient";

class ApiClient extends HttpClient {
    public addFavourite = (dto: Models.NewFavouriteTrackDTO) => {
        return this.post<{}>(
            `/api/tracks`, dto);
    }

    public fetchFavourites = () => {
        return this.get<Models.TrackDTO[]>(
            `/api/tracks`);
    }

    public signUp = (dto: Models.SignUpDTO) => {
        return this.post<Models.SignUpDTO>(
            `/api/account`);
    }

    public fetchUserInfo = () => {
        return this.get<Models.UserInfoDTO>(
            `/api/account`);
    }
}

export const apiClient = new ApiClient(config.apiEndpoint);
