export type CreateUserParams = {
    username: string;
    password: string;
};
export type UpdateUserParams = {
    username: string;
    password: string;
};
export type CreateUserProfileParams = {
    firstName: string;
    lastName: string;
    age: number;
    job: string;
};
export type CreateUserPostsParams = {
    title: string;
    description: string;
}