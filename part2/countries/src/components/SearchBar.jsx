export default function SearchBar({ search, setSearch, isLoading }) {
    return (
        <div className={`field${isLoading ? " field--loading" : ""}`}>
            <label>search</label>
            <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder={isLoading ? "loading..." : "country name..."}
                disabled={isLoading}
            />
        </div>
    );
}
