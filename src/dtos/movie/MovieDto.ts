export interface MovieDto {
    id :string;
    title :string;
    year :number;
    duration :number;
    genreId :string | null;
    genreName :string | null;
}
