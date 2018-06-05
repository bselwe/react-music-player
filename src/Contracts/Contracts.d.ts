declare module Models {
    interface IsFavouriteTrackDTO {
        Id: string;
        IsFavourite: boolean;
    }

    interface NewFavouriteTrackDTO {
        Id: string;
        Title: string;
        Artist: string;
        Photo: string;
    }

    interface TrackDTO {
        Id: string;
        Title: string;
        Artist: string;
        Photo: string;
    }

    interface SignUpDTO {
        FirstName: string;
        LastName: string;
        Email: string;
        Password: string;
    }

    interface UserInfoDTO {
        Id: string;
        FirstName: string;
        LastName: string;
        Email: string;
    }

    interface ResponseSuccess<TResponse> {
        IsSuccess: true;
        StatusCode: number;
        Response: TResponse;
    }

    interface ResponseError<TError> {
        IsSuccess: false;
        Error: TError;
        StatusCode: number;
    }

    type ApiResponse<TResponse extends {}, TError extends {}> = ResponseSuccess<TResponse> | ResponseError<TError>;
}