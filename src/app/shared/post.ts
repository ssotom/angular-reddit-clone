export class Post {
    id: number;
    subredditName: string;
    postName: string;
    url: string;
    description: string;
    username: string;
    voteCount: number;
    commentCount: number;
    duration: string;
    upVote: boolean;
    downVote: boolean;
}

export class PostRequest {
    id: number;
    name: string;
    subredditId: number;
    url: string;
    description: string;

}
