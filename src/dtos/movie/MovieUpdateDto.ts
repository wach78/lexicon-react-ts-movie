export interface MovieUpdateDto {
    id :string;
    title :string;
    year :number;
    duration :number;
    genreId :string | null;
}
