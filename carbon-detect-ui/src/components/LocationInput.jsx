import { useState, useEffect, useRef } from "react";

const LocationInput = ({ value = "", onSelect, onInvalid }) => {
  const [query, setQuery] = useState(value);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState(false);
  const wrapperRef = useRef(null);

  /* Close dropdown on outside click */
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setResults([]);
        if (!selected) {
          setQuery("");
          onInvalid?.(); // notify parent
        }
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, [selected, onInvalid]);

  /* Search with debounce */
  useEffect(() => {
    if (query.length < 3) {
      setResults([]);
      return;
    }

    setSelected(false); // user started typing again

    const timer = setTimeout(async () => {
      try {
        setLoading(true);
        const res = await fetch(
          `https://nominatim.openstreetmap.org/search?` +
            `format=json&addressdetails=1&limit=6&countrycodes=in&q=${query}`
        );
        const data = await res.json();

        const filtered = data.filter(
          (item) =>
            item.address?.country === "India" &&
            (item.address.city ||
              item.address.town ||
              item.address.village)
        );

        setResults(filtered);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }, 400);

    return () => clearTimeout(timer);
  }, [query]);

  return (
    <div ref={wrapperRef} style={{ position: "relative" }}>
      <input
        className="auth-input"
        placeholder="Select city from list"
        value={query}
        autoComplete="off"
        onChange={(e) => setQuery(e.target.value)}
        
      />

      {results.length > 0 && (
        <div className="autocomplete-box">
          {results.map((item) => {
            const city =
              item.address.city ||
              item.address.town ||
              item.address.village;
            const state = item.address.state;
            const country = item.address.country;

            const clean = [city, state, country]
              .filter(Boolean)
              .join(", ");

            return (
             <div
  key={item.place_id}
  className="autocomplete-item"
  onMouseDown={() => {
    setQuery(clean);
    setSelected(true);
    setResults([]);
    onSelect(clean);
  }}
>

                {clean}
              </div>
            );
          })}
        </div>
      )}

      {loading && (
        <small style={{ color: "#94a3b8" }}>Searching…</small>
      )}
    </div>
  );
};

export default LocationInput;
