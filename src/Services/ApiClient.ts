import config from "../Configuration/Config";
import { HttpClient } from "./HttpClient";

class ApiClient extends HttpClient {
    public addFavourite = (dto: Models.AddFavouriteTrackDTO) => {
        return this.post<{}>(
            `/api/tracks`, dto);
    }

    public removeFavourite = (dto: Models.RemoveFavouriteTrackDTO) => {
        return this.delete<{}>(
            `/api/tracks`, dto);
    }

    public isFavourite = (id: number) => {
        return this.get<Models.IsFavouriteTrackDTO>(
            `/api/tracks/${id}`);
    }

    public fetchFavourites = () => {
        return this.get<Models.TrackDTO[]>(
            `/api/tracks`);
    }

    public signUp = (dto: Models.SignUpDTO) => {
        return this.post<Models.SignUpDTO>(
            `/api/account`, dto);
    }

    public fetchUserInfo = () => {
        return this.get<Models.UserInfoDTO>(
            `/api/account`);
    }
}

export const apiClient = new ApiClient(config.apiEndpoint);
