import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Button } from "../components/Button";
import { ItemCard } from "../components/ItemCard";
import { getItems } from "../api/itemApi";
import { getCategoryIcon, formatDate } from "../utils/helpers";

import "./ItemDetails.css";

export const ItemDetails = () => {

  const { id } = useParams(); //gets values from the URL based on your route definition
  const navigate = useNavigate();

  const [item, setItem] = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);
  const [contacted, setContacted] = useState(false);

  useEffect(() => {

    const loadItem = async () => {

      try {

        //call item api
        //await mean wait unitil async is finished, then continue.
        const data = await getItems(); //(all = res.data)
        console.log("URL id:", id);
        console.log("Data:", data);

        //i = each item inside the array
        //first loop - i = { id: 1, name: "Wallet" }
        //i.id come from backend, id come from url
        const foundItem = data.find(
          (i) => String(i.id) === String(id)
        );

        setItem(foundItem); //save item to state

        if (foundItem) {

          const relatedItems = data
            .filter(
              (i) =>
                i.id !== foundItem.id &&
                i.category === foundItem.category
            )
            .slice(0, 3);

          setRelated(relatedItems);
        }

      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadItem();//call the function(Run now)

  }, [id] //Run this effect when id changes
  );

  if (loading) {
    return (
      <div className="page">
        <div className="container" style={{ padding: "80px", textAlign: "center" }}>
          Loading item...
        </div>
      </div>
    );
  }

  if (!item) {
    return (
      <div className="page">
        <div className="container" style={{ padding: "80px", textAlign: "center" }}>
          <div style={{ fontSize: "4rem", marginBottom: "24px" }}>🔍</div>
          <h2>Item not found</h2>
          <p style={{ color: "var(--ink-40)", margin: "16px 0 32px" }}>
            This item may have been removed or resolved.
          </p>

          <Button variant="primary" onClick={() => navigate("/lost")}>
            Browse All Items
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="page">
      <div className="item-details-page">
        <div className="container">

          {/* Breadcrumb */}
          <nav className="breadcrumb">
            <Link to="/">Home</Link>
            <span>›</span>

            <Link to={`/${item.type.toLowerCase()}`}>
              {item.type === "LOST" ? "Lost Items" : "Found Items"}
            </Link>

            <span>›</span>
            <span>{item.title}</span>
          </nav>

          <div className="item-details-layout">

            {/* Left */}
            <div className="item-details-media">

              <div className="item-details-main-image">

                <div className="item-details-image-placeholder">
                  <span className="item-details-emoji">
                    {getCategoryIcon(item.category)}
                  </span>
                </div>

                <div
                  className={`item-details-type-badge badge badge-${item.type.toLowerCase()}`}
                >
                  <span className="badge-dot" />
                  {item.type === "LOST" ? "Lost Item" : "Found Item"}
                </div>

              </div>

              {/* Location */}
              <div className="item-details-map">
                <div className="item-details-map-inner">
                  <span>📍</span>
                  <div>
                    <strong>{item.location}</strong>
                    <p>View on map</p>
                  </div>
                </div>
              </div>

            </div>

            {/* Right */}
            <div className="item-details-info">

              <div className="item-details-header">

                <div className="item-details-meta">
                  <span className="item-details-category">
                    {getCategoryIcon(item.category)} {item.category}
                  </span>

                  <span className="item-details-date">
                    {formatDate(item.date)}
                  </span>
                </div>

                <h1 className="item-details-title">
                  {item.title}
                </h1>

                {item.reward > 0 && (
                  <div className="item-details-reward">
                    🏆 <strong>{item.reward}</strong> reward offered
                  </div>
                )}

              </div>

              <div className="item-details-divider" />

              <div className="item-details-desc">
                <h3>Description</h3>
                <p>{item.description}</p>
              </div>

              <div className="item-details-divider" />

              <div className="item-details-facts">

                <div className="fact-row">
                  <span className="fact-label">📍 Last seen at</span>
                  <span className="fact-value">{item.location}</span>
                </div>

                <div className="fact-row">
                  <span className="fact-label">📅 Date</span>
                  <span className="fact-value">{formatDate(item.date)}</span>
                </div>

                <div className="fact-row">
                  <span className="fact-label">🏷 Category</span>
                  <span className="fact-value">{item.category}</span>
                </div>

                <div className="fact-row">
                  <span className="fact-label">📧 Contact</span>
                  <span className="fact-value">{item.email}</span>
                </div>

              </div>

              <div className="item-details-divider" />

              {/* Contact Card */}
              <div className="item-details-contact-card">

                {!contacted ? (

                  <div className="contact-actions">

                    <Button
                      variant="primary"
                      size="lg"
                      fullWidth
                      onClick={() => setContacted(true)}
                    >
                      Contact Owner
                    </Button>

                    <Button
                      variant="secondary"
                      size="lg"
                      fullWidth
                    >
                      💬 Send Message
                    </Button>

                  </div>

                ) : (

                  <div className="contact-success">
                    <div className="contact-success-icon">✅</div>
                    <strong>Request sent!</strong>
                    <p>
                      The owner will contact you soon.
                    </p>
                  </div>

                )}

              </div>

            </div>

          </div>

          {/* Related Items */}
          {related.length > 0 && (

            <div className="item-details-related">

              <div className="section-header">
                <div>
                  <p className="section-eyebrow">
                    Similar Items
                  </p>

                  <h2 className="section-title">
                    Related Reports
                  </h2>
                </div>
              </div>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(3, 1fr)",
                  gap: "var(--space-lg)",
                }}
              >

                {related.map((i) => (
                  <ItemCard key={i.id} item={i} />
                ))}

              </div>

            </div>

          )}

        </div>
      </div>
    </div>
  );
};