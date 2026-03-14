import { useState, useMemo, useEffect } from "react";
import { SearchBar } from "../components/SearchBar";
import { ItemCard } from "../components/ItemCard";
import { Button } from "../components/Button";
import { getItems } from "../api/itemApi";
import { CATEGORIES } from "../utils/helpers";
import "./ItemsPage.css";

export const FoundItems = () => {

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [sort, setSort] = useState("newest");
  const [items, setItems] = useState([]);

  /* Load items from backend */
  useEffect(() => {

    const loadItems = async () => {
      try {

        const data = await getItems();

const foundItems = data.filter(
  (item) => item.type?.toUpperCase() === "FOUND"
);

        setItems(foundItems);

      } catch (err) {
        console.error("Error loading items:", err);
      }
    };

    loadItems();

  }, []);

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

        return matchesSearch && matchesCat;
      })

      .sort((a, b) => {

        if (sort === "newest") {
          return new Date(b.date) - new Date(a.date);
        }

        if (sort === "oldest") {
          return new Date(a.date) - new Date(b.date);
        }

        return 0;
      });

  }, [items, search, category, sort]);

  return (
    <div className="page">
      <div className="items-page">

        {/* Header */}
        <div
          className="items-page-header"
          style={{
            background:
              "linear-gradient(135deg, var(--found-bg), var(--paper))",
          }}
        >
          <div className="container items-page-header-inner">

            <div>
              <p
                className="section-eyebrow"
                style={{ color: "var(--found)" }}
              >
                ✅ Found Items
              </p>

              <h1 className="items-page-title">
                Items Waiting to Go Home
              </h1>

              <p className="items-page-subtitle">
                {items.length} items found by the community
              </p>
            </div>

            <div className="items-page-search">
              <SearchBar
                placeholder="Search found items..."
                onSearch={setSearch}
                large
              />
            </div>

          </div>
        </div>

        <div className="container items-layout">

          {/* Sidebar */}
          <aside className="items-sidebar">

            <div className="filter-panel">

              <h3 className="filter-title">
                Filter By
              </h3>

              <div className="filter-group">

                <label className="filter-label">
                  Category
                </label>

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

              <div className="filter-group">

                <label className="filter-label">
                  Sort
                </label>

                <select
                  className="filter-select"
                  value={sort}
                  onChange={(e) => setSort(e.target.value)}
                >
                  <option value="newest">
                    Newest First
                  </option>

                  <option value="oldest">
                    Oldest First
                  </option>

                </select>

              </div>

              {(search || category) && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setSearch("");
                    setCategory("");
                  }}
                >
                  Clear filters
                </Button>
              )}

            </div>
          </aside>

          {/* Results */}
          <main className="items-main">

            <div className="items-results-header">

              <p className="items-count">
                <span className="items-count-num">
                  {filtered.length}
                </span>{" "}
                items found
              </p>

            </div>

            {filtered.length > 0 ? (

              <div className="items-grid-responsive">

                {filtered.map((item) => (
                  <ItemCard
                    key={item.id}
                    item={item}
                  />
                ))}

              </div>

            ) : (

              <div className="items-empty">

                <div className="items-empty-icon">
                  📭
                </div>

                <h3>Nothing found yet</h3>

                <p>
                  Try different filters or check back later.
                </p>

                <Button
                  variant="secondary"
                  onClick={() => {
                    setSearch("");
                    setCategory("");
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