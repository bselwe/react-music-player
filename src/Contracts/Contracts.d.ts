declare module Models {
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