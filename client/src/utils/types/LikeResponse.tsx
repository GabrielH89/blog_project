// src/types/LikeResponse.ts
export interface LikeResponse {
    postId: number;
    likes: {
        user_id: number;
        name: string;
    }[];
    userLiked: boolean;
}
