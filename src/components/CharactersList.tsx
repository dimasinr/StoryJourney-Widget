import { useEffect, useMemo, useState } from "react";
import { getCharacters, type CharactersResponse, type Character } from "../services/characters";
import { DEFAULT_USER_ID } from "../services/EndpointService";

type Props = {
  apiKey: string;
  userId?: string;
};

export default function CharactersList({ apiKey, userId }: Props) {
  const [data, setData] = useState<CharactersResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState<number>(1);
  const [size, setSize] = useState<number>(10);
  const [searchInput, setSearchInput] = useState<string>("");
  const [search, setSearch] = useState<string>("");

  useEffect(() => {
    let active = true;
    setLoading(true);
    setError(null);

    getCharacters(
      { page, size, search },
      {
        "X-API-KEY": apiKey,
        "USER_ID_KEY": userId || DEFAULT_USER_ID,
      }
    )
      .then((res) => {
        if (!active) return;
        setData(res);
      })
      .catch((e) => {
        if (!active) return;
        setError(e?.message || "Unknown error");
      })
      .finally(() => {
        if (!active) return;
        setLoading(false);
      });

    return () => {
      active = false;
    };
  }, [apiKey, userId, page, size, search]);

  // debounce search input → search query
  useEffect(() => {
    const t = setTimeout(() => {
      setPage(1); // reset to first page when search changes
      setSearch(searchInput.trim());
    }, 350);
    return () => clearTimeout(t);
  }, [searchInput]);

  const { items, total } = useMemo(() => {
    const all: Character[] = data?.data || [];
    // client-side filter fallback if backend ignores 'search'
    const term = (search || '').toLowerCase();
    const filtered = term
      ? all.filter((c) =>
          [c.nickname, c.style, c.ageGroup, c.gender]
            .filter(Boolean)
            .some((v) => String(v).toLowerCase().includes(term))
        )
      : all;

    const start = (page - 1) * size;
    const end = start + size;
    const paged = filtered.slice(start, end);
    return { items: paged, total: filtered.length };
  }, [data, search, page, size]);

  if (loading) return <div>Loading characters...</div>;
  if (error) return <div style={{ color: "red" }}>Error: {error}</div>;

  return (
    <div style={{ fontFamily: "sans-serif" }}>
      <h3>Characters</h3>

      <div style={{ marginBottom: 8, display: "flex", gap: 8, alignItems: "center" }}>
        <input
          type="text"
          placeholder="Cari..."
          value={searchInput}
          onChange={(e) => {
            setSearchInput(e.target.value);
          }}
          style={{ padding: "4px 8px" }}
        />
        <label>
          Size:
          <select
            value={size}
            onChange={(e) => {
              setSize(Number(e.target.value));
              setPage(1);
            }}
            style={{ marginLeft: 4 }}
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
          </select>
        </label>
      </div>

      {items.length === 0 ? (
        <div>No data</div>
      ) : (
        <ul style={{ margin: 0, paddingLeft: "1rem" }}>
          {items.map((c) => (
            <li key={c.id} style={{ marginBottom: 6 }}>
              <img
                src={c.thumbnailUrl}
                alt={c.nickname}
                width={50}
                style={{ borderRadius: "4px", marginRight: 8 }}
              />
              <strong>{c.nickname}</strong> ({c.style}, {c.ageGroup})
            </li>
          ))}
        </ul>
      )}

      <div style={{ marginTop: 12, display: "flex", gap: 8, alignItems: "center" }}>
        <button onClick={() => setPage(1)} disabled={page <= 1}>
          First
        </button>
        <button onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page <= 1}>
          Prev
        </button>
        <span>
          Page {page} · Size {size} · Total {total}
        </span>
        <button
          onClick={() => setPage((p) => p + 1)}
          // Disable if last page based on client-side total
          disabled={page * size >= total}
        >
          Next
        </button>
      </div>
    </div>
  );
}
