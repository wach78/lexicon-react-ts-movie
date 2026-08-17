interface GenreSelectProps {
  genres: string[];
  selectedGenre: string;
  onChange: (genre: string) => void;
}

const GenreSelect = ({ genres, selectedGenre, onChange }: GenreSelectProps) => {
  return (
    <select
      className="form-select mb-3"
      value={selectedGenre}
      onChange={(event) => onChange(event.target.value)}
    >
      <option value="">All genres</option>

      {genres.map((genre) => (
        <option key={genre} value={genre}>
          {genre}
        </option>
      ))}
    </select>
  );
};

export default GenreSelect;
