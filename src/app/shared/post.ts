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
}

export class PostRequest {
    id: number;
    name: string;
    subredditId: number;
    url: string;
    description: string;

}
