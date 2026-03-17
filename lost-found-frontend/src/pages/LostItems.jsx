import { useState, useMemo, useEffect } from "react";
import { SearchBar } from "../components/SearchBar";
import { ItemCard } from "../components/ItemCard";
import { Button } from "../components/Button";
import { getItems } from "../api/itemApi";
import { CATEGORIES } from "../utils/helpers";
import "./ItemsPage.css";

export const LostItems = () => {

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [sort, setSort] = useState("newest");
  const [urgent, setUrgent] = useState(false);
  const [items, setItems] = useState([]);

  // 🔹 Load items from backend
  useEffect(() => {

  const loadItems = async () => {
    try {

      const data = await getItems();

      const lostItems = data.filter(
        (item) => item.type?.toUpperCase() === "LOST"
      );

      setItems(lostItems);

    } catch (err) {
      console.error("Failed to load items:", err);
    }
  };

  loadItems();

}, []);

  // 🔹 Filtering + sorting
  const filtered = useMemo(() => {
    return items
      .filter((item) => {
        const q = search.toLowerCase();

        const matchesSearch =
          !search ||
          item.title?.toLowerCase().includes(q) ||
          item.description?.toLowerCase().includes(q) ||
          item.location?.toLowerCase().includes(q);

        const matchesCat =
          !category ||
          item.category?.toLowerCase() === category.toLowerCase();

        const matchesUrgent = !urgent || item.urgent;

        return matchesSearch && matchesCat && matchesUrgent;
      })
      .sort((a, b) => {
        if (sort === "newest") return new Date(b.date) - new Date(a.date);
        if (sort === "oldest") return new Date(a.date) - new Date(b.date);
        if (sort === "reward") return (b.reward ? 1 : 0) - (a.reward ? 1 : 0);
        return 0;
      });
  }, [items, search, category, sort, urgent]);

  return (
    <div className="page">
      <div className="items-page">

        {/* HEADER */}
        <div
          className="items-page-header"
          style={{
            background: "linear-gradient(135deg, var(--lost-bg), var(--paper))",
          }}
        >
          <div className="container items-page-header-inner">
            <div>
              <p className="section-eyebrow" style={{ color: "var(--lost)" }}>
                🔍 Lost Items
              </p>
              <h1 className="items-page-title">Help Find What's Missing</h1>
              <p className="items-page-subtitle">
                {items.length} items reported lost — maybe you can help
              </p>
            </div>

            <div className="items-page-search">
              <SearchBar
                placeholder="Search lost items..."
                onSearch={setSearch}
                large
              />
            </div>
          </div>
        </div>

        <div className="container items-layout">

          {/* FILTER SIDEBAR */}
          <aside className="items-sidebar">
            <div className="filter-panel">

              <h3 className="filter-title">Filter By</h3>

              {/* CATEGORY */}
              <div className="filter-group">
                <label className="filter-label">Category</label>

                <div className="filter-options">
                  <button
                    className={`filter-chip ${
                      !category ? "filter-chip-active" : ""
                    }`}
                    onClick={() => setCategory("")}
                  >
                    All
                  </button>

                  {CATEGORIES.slice(0, 8).map((cat) => (
                    <button
                      key={cat}
                      className={`filter-chip ${
                        category === cat ? "filter-chip-active" : ""
                      }`}
                      onClick={() =>
                        setCategory(cat === category ? "" : cat)
                      }
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* SORT */}
              <div className="filter-group">
                <label className="filter-label">Sort</label>

                <select
                  className="filter-select"
                  value={sort}
                  onChange={(e) => setSort(e.target.value)}
                >
                  <option value="newest">Newest First</option>
                  <option value="oldest">Oldest First</option>
                  <option value="reward">Has Reward</option>
                </select>
              </div>

              {/* URGENT */}
              <div className="filter-group">
                <label className="filter-toggle">
                  <input
                    type="checkbox"
                    checked={urgent}
                    onChange={(e) => setUrgent(e.target.checked)}
                  />
                  <span>Urgent items only</span>
                </label>
              </div>

              {(search || category || urgent) && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setSearch("");
                    setCategory("");
                    setUrgent(false);
                  }}
                >
                  Clear all filters
                </Button>
              )}
            </div>
          </aside>

          {/* RESULTS */}
          <main className="items-main">

            <div className="items-results-header">
              <p className="items-count">
                <span className="items-count-num">{filtered.length}</span>{" "}
                items found
              </p>
            </div>

            {filtered.length > 0 ? (
              <div className="items-grid-responsive">
                {filtered.map((item) => (
                  <ItemCard key={item.id} item={item} />
                ))}
              </div>
            ) : (
              <div className="items-empty">
                <div className="items-empty-icon">🔎</div>
                <h3>No items found</h3>
                <p>Try adjusting your filters or search terms.</p>

                <Button
                  variant="secondary"
                  onClick={() => {
                    setSearch("");
                    setCategory("");
                    setUrgent(false);
                  }}
                >
                  Reset filters
                </Button>
              </div>
            )}

          </main>
        </div>
      </div>
    </div>
  );
};