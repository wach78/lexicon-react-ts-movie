export interface MovieCreateDto {
  title: string;
  year: number;
  duration: number;
  genreId: string | null;
}
