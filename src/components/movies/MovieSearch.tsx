interface MovieSearchProps {
  searchTerm: string;
  onChange: (value: string) => void;
}

const MovieSearch = ({ searchTerm, onChange }: MovieSearchProps) => {
  return (
    <input
      type="search"
      className="form-control mb-3"
      placeholder="Search movies..."
      value={searchTerm}
      onChange={(event) => onChange(event.target.value)}
    />
  );
};

export default MovieSearch;
