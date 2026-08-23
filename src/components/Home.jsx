import React, { useEffect, useMemo, useState } from "react";
import {
  ArrowRight,
  Check,
  Heart,
  Menu,
  Play,
  Search,
  ShieldCheck,
  Sparkles,
  X,
} from "lucide-react";
import "../components/Home.css";
import tob1 from "../assets/lot1/tob_1.webp";
import tob3 from "../assets/lot1/tob_3.webp";
import ah1 from "../assets/lot1/ah_1.webp";
import ah3 from "../assets/lot1/ah_3.webp";
import mm1 from "../assets/lot1/mm_1.webp";
import mm3 from "../assets/lot1/mm_3.webp";
import tfv1 from "../assets/lot1/tfv_1.webp";
import tfv3 from "../assets/lot1/tfv_3.webp";
import craft from "../assets/lot1/craft.webp";
/*
  GRIP HILL — Premium Lifestyle Store
  -----------------------------------
  Replace these image paths with your real product/lifestyle photography:

  /images/hero-bag.jpg
  /images/product-one.jpg
  /images/product-two.jpg
  /images/product-three.jpg
  /images/product-four.jpg
  /images/product-five.jpg
  /images/product-six.jpg
  /images/lifestyle-work.jpg
  /images/lifestyle-travel.jpg
  /images/lifestyle-weekend.jpg
  /images/material-detail.jpg

  Your existing Promo2.mp4 and Glogo.png can remain in /public.
*/

const PRODUCTS = [
  {
    id: 1,
    name: "The Omni-Blend",
    category: "Everyday Backpack",
    description: "Designed for the ultimate daily routine, The Omni-Blend features a convenient vertical front-zip pocket for fast, effortless access to your essentials. Weighing 1kg with dimensions of 32 cm x 46 cm x 18 cm, this pack effortlessly fits a 15.6-inch laptop. Built from advanced PU waterproof and mildew-proof fabric, it protects your gear in any weather while delivering a seamless balance of active utility and modern style..",
    badge: "COMING SOON",
      mrp: 3998,
  offerPrice: 1999,
  discount: 50,
    colors: [
      { name: "Black", hex: "#171717", image: tob3 },
      { name: "Grey", hex: "#A9A9A9", image: tob1 },
    ],
  },
  {
    id: 2,
    name: "Aero Hybrid",
    category: "City Backpack",
    description: "Built for the fast-paced city lifestyle, Aero Hybrid champions an ultra-clean, minimalist front profile that pairs effortlessly with any professional wardrobe. Weighing 1kg and measuring 32 cm x 46 cm x 18 cm, it securely houses a 15.6-inch laptop within its structured interior. Crafted from durable PU waterproof and mildew-proof fabric, it keeps your tech safe, dry, and looking sharp through the urban commute.",
    badge: "COMING SOON",
      mrp: 3998,
  offerPrice: 1999,
  discount: 50,
    colors: [
      { name: "Black", hex: "#171717", image: ah3 },
      { name: "Grey", hex: "#A9A9A9", image: ah1 },
    ],
  },
  {
    id: 3,
    name: "Metro Merge",
    category: "Travel Backpack",
    description: "Engineered for travel and longer commutes, Metro Merge introduces a distinctive top-flap compartment layout for advanced multi-zone organization. Offering generous dimensions of 32 cm x 46 cm x 18 cm at a lightweight 1kg, it easily accommodates a 15.6-inch laptop and travel gear. Formulated with resilient PU waterproof and mildew-proof fabric, this pack ensures your belongings stay completely fresh, protected, and organized wherever your journey takes you",
    badge: "COMING SOON",
      mrp: 3998,
  offerPrice: 1999,
  discount: 50,
    colors: [
      { name: "Black", hex: "#171717", image: mm3 },
      { name: "Grey", hex: "#A9A9A9", image: mm1 },
    ],
  },
  {
    id: 4,
    name: "The Fusion Vault",
    category: "Crossbody Bag",
    description: "Combining high-security tech organization with sharp urban utility, The Fusion Vault is crafted to protect your valuables on the move. Weighing just 1kg with a 32 cm x 46 cm x 18 cm frame, it comfortably fits a 15.6-inch laptop alongside daily gear. Constructed from premium PU waterproof and mildew-proof fabric, it delivers ultimate all-weather defense and a confident, locked-down security experience for the modern professional.",
    badge: "COMING SOON",
      mrp: 3998,
  offerPrice: 1999,
  discount: 50,
    colors: [
      { name: "Black", hex: "#171717", image: tfv3 },
      { name: "Grey", hex: "#A9A9A9", image: tfv1 },
    ],
  },
];

const LIFESTYLES = [
  {
    title: "Work",
    subtitle: "For the days that don't slow down.",
    image: tob1,
  },
  {
    title: "Travel",
    subtitle: "Go further. Carry smarter.",
    image: mm1,
  },
  {
    title: "Weekend",
    subtitle: "Leave the routine behind.",
    image: tfv3,
  },
];

function ImageCard({ src, alt, className = "", fallback = "GRIP HILL" }) {
  const [failed, setFailed] = useState(false);

  return failed ? (
    <div className={`image-fallback ${className}`} aria-label={alt}>
      <div className="fallback-mark">{fallback}</div>
    </div>
  ) : (
    <img
      src={src}
      alt={alt}
      className={className}
      loading="lazy"
      onError={() => setFailed(true)}
    />
  );
}

function ProductCard({ product, onNotify, onDetails }) {
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);

  return (
    <article className="product-card">
      <div className="product-image-wrap">
        <span className="product-badge">COMING SOON</span>
        <button className="heart-button" type="button" aria-label={`Save ${product.name}`}>
          <Heart size={18} strokeWidth={1.7} />
        </button>

        <ImageCard
          key={selectedColor.name}
          src={selectedColor.image}
          alt={`${product.name} - ${selectedColor.name}`}
          className="product-image product-image-variant"
          fallback={`${product.name} — ${selectedColor.name}`}
        />

        <div className="coming-soon-overlay"><span>COMING SOON</span></div>

        <button className="notify-overlay-button" type="button" onClick={() => onNotify(product, selectedColor)}>
          Notify me <ArrowRight size={15} />
        </button>
      </div>

<div className="product-info">
  <div className="product-title-block">
    <p className="eyebrow">{product.category}</p>

    <h3>{product.name}</h3>

    <div className="product-pricing">
      <span className="product-offer-price">
        ₹{product.offerPrice.toLocaleString("en-IN")}
      </span>

      <span className="product-mrp">
        ₹{product.mrp.toLocaleString("en-IN")}
      </span>

      <span className="product-discount">
        {product.discount}% OFF
      </span>
    </div>
  </div>
</div>

      <p className="product-description">{product.description}</p>

      <div className="product-colors">
        <div className="color-label">
          <span>Colours</span>
          <span>{selectedColor.name}</span>
        </div>
        <div className="color-swatches">
          {product.colors.map((color) => (
            <button
              key={color.name}
              type="button"
              className={`color-swatch ${selectedColor.name === color.name ? "selected" : ""}`}
              style={{ backgroundColor: color.hex }}
              aria-label={color.name}
              title={color.name}
              onClick={() => setSelectedColor(color)}
            />
          ))}
        </div>
      </div>

      <div className="product-actions">
        <button type="button" className="product-details-link" onClick={() => onDetails(product, selectedColor)}>
          View details <ArrowRight size={15} />
        </button>
        <button type="button" className="notify-button" onClick={() => onNotify(product, selectedColor)}>
          Notify me
        </button>
      </div>
    </article>
  );
}

export default function App() {
  const [journalOpen, setJournalOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [activeModal, setActiveModal] = useState(null);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [totalSubmissions, setTotalSubmissions] = useState(52);

  // Keep your existing launch API integration.
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });
  const [dataConsent, setDataConsent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchLiveStats = async () => {
      try {
        const response = await fetch(
          "https://api.diagonica.com/api/griphill/stats"
        );
        const data = await response.json();

        if (response.ok && data.success) {
          setTotalSubmissions(data.totalSubmissions);
        }
      } catch (err) {
        console.error("Failed to connect to stats engine.", err);
      }
    };

    fetchLiveStats();
  }, []);

const goToNotifyForm = (product, color = product.colors[0]) => {
  setSelectedProducts((current) => {
    const existingIndex = current.findIndex(
      (item) => item.product.id === product.id
    );

    if (existingIndex !== -1) {
      return current.map((item, index) =>
        index === existingIndex
          ? {
              ...item,
              quantity: item.quantity + 1,
              selectedColor: color,
            }
          : item
      );
    }

    return [
      ...current,
      {
        product,
        selectedColor: color,
        quantity: 1,
      },
    ];
  });

  setSuccess(false);
  setError("");

  setTimeout(() => {
    document.getElementById("notify")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }, 50);
};

const toggleProductSelection = (product) => {
  setSelectedProducts((current) => {
    const exists = current.some(
      (item) => item.product.id === product.id
    );

    if (exists) {
      return current.filter(
        (item) => item.product.id !== product.id
      );
    }

    return [
      ...current,
      {
        product,
        selectedColor: product.colors[0],
        quantity: 1,
      },
    ];
  });
};

const updateProductQuantity = (productId, change) => {
  setSelectedProducts((current) =>
    current
      .map((item) =>
        item.product.id === productId
          ? {
              ...item,
              quantity: Math.max(1, item.quantity + change),
            }
          : item
      )
  );
};

const removeSelectedProduct = (productId) => {
  setSelectedProducts((current) =>
    current.filter((item) => item.product.id !== productId)
  );
};
const handleInputChange = (e) => {
  const { name, value } = e.target;

  setFormData((prev) => ({
    ...prev,
    [name]: value,
  }));
};
const handleLaunchSubmit = async (e) => {
  e.preventDefault();
  setError("");

  if (selectedProducts.length === 0) {
    setError("Please select at least one product.");
    return;
  }

  if (!dataConsent) {
    setError("Please accept the consent before submitting.");
    return;
  }

  setLoading(true);

  try {
    /*
     * Build product information.
     *
     * Example:
     * Products:
     * The Omni-Blend × 2
     * Metro Merge × 1
     */
    const productLines = selectedProducts.map(
      ({ product, quantity, selectedColor }) => {
        const color = selectedColor?.name
          ? ` — ${selectedColor.name}`
          : "";

        return `${product.name}${color} × ${quantity}`;
      }
    );

    const productInformation = `Products:\n${productLines.join("\n")}`;

    /*
     * Address is optional.
     *
     * If address exists:
     * Kolkata, West Bengal
     *
     * Products:
     * The Omni-Blend × 2
     *
     * If address is empty:
     * Products:
     * The Omni-Blend × 2
     */
    const combinedAddress = formData.address.trim()
      ? `${formData.address.trim()}\n\n${productInformation}`
      : productInformation;

    const payload = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      address: combinedAddress,
    };

    console.log("Grip Hill registration payload:", payload);

    const response = await fetch(
      "https://api.diagonica.com/api/griphill/register",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      }
    );

    const data = await response.json();

    if (response.ok && data.success) {
      setSuccess(true);
      setTotalSubmissions(data.totalSubmissions);
    } else {
      setError(
        data.error || "Unable to complete registration."
      );
    }
  } catch (err) {
    console.error(err);
    setError("Connection timeout. Please try again.");
  } finally {
    setLoading(false);
  }
};

  const subscribe = (e) => {
    e.preventDefault();

    if (!newsletterEmail.trim()) {
      setNewsletterMessage("Enter your email address.");
      return;
    }

    setNewsletterMessage("You're on the list. Welcome to Grip Hill.");
    setNewsletterEmail("");
  };

  return (
    <div className="site-shell">
      <div className="announcement">
        <Sparkles size={14} />
        <span>All Grip Hill products are coming soon</span>
        <a href="#notify">Get notified</a>
      </div>

      <header className="navbar">
        <a className="brand" href="#top" aria-label="Grip Hill home">
          <img src="/Glogo.png" alt="Grip Hill" />
          <span>GRIP HILL</span>
        </a>

        <nav className={`nav-links ${menuOpen ? "open" : ""}`}>
          <a href="#new" onClick={() => setMenuOpen(false)}>New</a>
          {/* <a href="#collections" onClick={() => setMenuOpen(false)}>Collections</a> */}
          <a href="#lifestyle" onClick={() => setMenuOpen(false)}>Lifestyle</a>
          <a href="#craft" onClick={() => setMenuOpen(false)}>Craft</a>
          <a href="#journal" onClick={() => setMenuOpen(false)}>Journal</a>
        </nav>

        <div className="nav-actions">
          <button onClick={() => setSearchOpen(true)} aria-label="Search">
            <Search size={20} />
          </button>
          <a className="notify-nav-link" href="#notify">Notify me</a>
          <button
            className="menu-button"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Menu"
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </header>
      <main id="top">
        {journalOpen && (
  <div
    className="journal-modal-backdrop"
    onClick={() => setJournalOpen(false)}
  >
    <article
      className="journal-modal"
      onClick={(e) => e.stopPropagation()}
    >
      <button
        type="button"
        className="journal-modal-close"
        onClick={() => setJournalOpen(false)}
        aria-label="Close journal"
      >
        <X size={20} />
      </button>

      <div className="journal-modal-header">
        <p className="eyebrow">THE JOURNAL / FIELD NOTE 01</p>

        <h2>
          What makes a great
          <br />
          everyday bag?
        </h2>

        <p className="journal-modal-intro">
          A study in proportion, access, comfort and the small decisions
          that change how a product feels.
        </p>
      </div>

      <div className="journal-modal-divider" />

      <div className="journal-modal-content">
        <p>
          An everyday carry isn't just about hauling gear from point A to
          point B—it's an extension of your routine.
        </p>

        <p>
          When we designed the Omni-Blend and Aero Hybrid lines, we focused
          on the friction points of modern commuting: the sudden rain
          shower, the scramble to find your keys or secure a 15.6-inch
          laptop, and the desire to look professional without feeling
          weighed down.
        </p>

        <p>
          At just 1kg with advanced waterproof PU fabric, it's built to
          disappear on your back until you need it.
        </p>
      </div>

      <div className="journal-modal-footer">
        <span>GRIP HILL</span>
        <span>FIELD NOTE 01</span>
      </div>
    </article>
  </div>
)}
        <section className="hero">
          <video
            className="hero-video"
            src="/Promo2.mp4"
            autoPlay
            muted
            loop
            playsInline
          />
          <div className="hero-overlay" />
          <div className="hero-content">
            <p className="hero-kicker">GRIP HILL / NEW COLLECTION</p>
            <h1>Carry what<br />moves you.</h1>
            <p className="hero-copy">
              Premium bags and everyday essentials, designed around the way
              modern life actually moves.
            </p>
            <div className="hero-buttons">
              <a className="button button-light" href="#new">
                Explore collection <ArrowRight size={17} />
              </a>
              <a className="text-link light-link" href="#story">
                Our story
              </a>
            </div>
          </div>
          <div className="hero-scroll">SCROLL TO EXPLORE ↓</div>
        </section>

        <section className="intro section">
          <div>
            <p className="eyebrow">THE GRIP HILL IDEA</p>
            <h2>Designed for the life you carry.</h2>
          </div>
          <p className="intro-copy">
            A bag should do more than hold your things. It should fit your
            rhythm, protect what matters and look right wherever the day takes
            you.
          </p>
        </section>

        <section className="section" id="new">
          <div className="section-heading">
            <div>
              <p className="eyebrow">NEW / 2026</p>
              <h2>The latest. Made to move with you.</h2>
            </div>
            <a className="text-link" href="#collections">
              Shop all <ArrowRight size={16} />
            </a>
          </div>

          <div className="product-row">
            {PRODUCTS.map((product) => (
              <ProductCard key={product.id} product={product} onNotify={goToNotifyForm} onDetails={(item, color) => setActiveModal({ ...item, selectedColor: color })} />
            ))}
          </div>
        </section>

        <section className="feature-banner" id="story">
          <ImageCard
            src="/images/hero-bag.jpg"
            alt="Grip Hill premium bag"
            className="feature-image"
            fallback="CARRY WHAT MOVES YOU"
          />
          <div className="feature-overlay" />
          <div className="feature-copy">
            <p className="eyebrow light-eyebrow">ONE BAG. MANY LIVES.</p>
            <h2>From first coffee<br />to final boarding call.</h2>
            <p>
              One considered system for work, travel, weekends and everything
              in between.
            </p>
            <a className="button button-light" href="#lifestyle">
              Explore lifestyles <ArrowRight size={17} />
            </a>
          </div>
        </section>

        {/* <section className="section" id="collections">
          <div className="section-heading">
            <div>
              <p className="eyebrow">THE COLLECTION</p>
              <h2>Find your everyday essential.</h2>
            </div>
          </div>

          <div className="collection-grid">
            {PRODUCTS.map((product) => (
              <ProductCard key={product.id} product={product} onNotify={goToNotifyForm} onDetails={(item, color) => setActiveModal({ ...item, selectedColor: color })} />
            ))}
          </div>
        </section> */}

        <section className="difference section">
          <div className="difference-heading">
            <p className="eyebrow">THE GRIP HILL DIFFERENCE</p>
            <h2>Quietly engineered.<br />Obviously better.</h2>
          </div>

          <div className="difference-grid">
            <div>
              <span>01</span>
              <ShieldCheck size={28} />
              <h3>Built to last</h3>
              <p>
                Materials and construction selected for everyday use, not just
                the first impression.
              </p>
            </div>
            <div>
              <span>02</span>
              <Sparkles size={28} />
              <h3>Smart organisation</h3>
              <p>
                Purposeful pockets and clean access keep your essentials where
                you expect them.
              </p>
            </div>
            <div>
              <span>03</span>
              {/* <ShoppingBag size={28} /> */}
              <h3>Premium utility</h3>
              <p>
                Function-first details meet a refined silhouette that works
                across the city and beyond.
              </p>
            </div>
            <div>
              <span>04</span>
              <Check size={28} />
              <h3>Made for movement</h3>
              <p>
                Comfortable carry, balanced proportions and details that make
                daily movement easier.
              </p>
            </div>
          </div>
        </section>

        <section className="craft" id="craft">
          <div className="craft-image-wrap">
            <ImageCard
              src={craft}
              alt="Grip Hill material and craftsmanship"
              className="craft-image"
              fallback="CRAFT"
            />
          </div>
          <div className="craft-copy">
            <p className="eyebrow">MATERIAL / CRAFT</p>
            <h2>Every detail has a purpose.</h2>
            <p>
              We obsess over the details you notice every day: the feel of a
              handle, the movement of a zip, the placement of a pocket and the
              way the bag sits when fully loaded.
            </p>
            <a className="text-link" href="#journal">
              Discover the craft <ArrowRight size={16} />
            </a>
          </div>
        </section>

        <section className="section" id="lifestyle">
          <div className="section-heading">
            <div>
              <p className="eyebrow">CHOOSE YOUR RHYTHM</p>
              <h2>Built around your lifestyle.</h2>
            </div>
          </div>

          <div className="lifestyle-grid">
            {LIFESTYLES.map((item) => (
              <article className="lifestyle-card" key={item.title}>
                <ImageCard
                  src={item.image}
                  alt={item.title}
                  className="lifestyle-image"
                  fallback={item.title}
                />
                <div className="lifestyle-overlay" />
                <div className="lifestyle-copy">
                  <p className="eyebrow light-eyebrow">GRIP HILL</p>
                  <h3>{item.title}</h3>
                  <p>{item.subtitle}</p>
                  <a href="#new" className="text-link light-link">
                    Shop the edit <ArrowRight size={15} />
                  </a>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="editorial">
          <div className="editorial-copy">
            <p className="eyebrow">THE JOURNAL</p>
            <h2>Stories from the road.</h2>
            <p>
              Notes on travel, design, everyday carry and the people who refuse
              to stand still.
            </p>
<button
  type="button"
  className="text-link journal-read-button"
  onClick={() => setJournalOpen(true)}
>
  Read the journal <ArrowRight size={16} />
</button>
          </div>
          <div className="editorial-card" id="journal">
            <div className="editorial-number">01</div>
            <p className="eyebrow">FIELD NOTE</p>
            <h3>What makes a great everyday bag?</h3>
            <p>
              A study in proportion, access, comfort and the small decisions
              that change how a product feels.
            </p>
            <span>Coming soon</span>
          </div>
        </section>

        <section className="notify-section" id="notify">
          <div className="notify-inner">
            <div className="notify-copy">
              <p className="eyebrow light-eyebrow">PRODUCT NOTIFICATIONS</p>
              <h2>Be the first<br />to know.</h2>
              <p>
                Our products aren't available to order yet. Choose a bag above
                and submit your details. We'll notify you when your selected
                product is ready to launch.
              </p>
              <div className="notify-stat">
                <strong>{totalSubmissions.toLocaleString()}</strong>
                <span>people already waiting</span>
              </div>
            </div>

            <div className="notify-form-card">
              {success ? (
                <div className="success-state">
                  <div className="success-icon"><Check size={28} /></div>
                  <p className="eyebrow">YOU'RE ON THE LIST</p>
                  <h3>We'll let you know.</h3>
<p>
  We've received your request for:
</p>

<div className="success-products">
  {selectedProducts.map(
    ({ product, quantity, selectedColor }) => (
      <div
        className="success-product"
        key={product.id}
      >
        <span>{product.name}</span>
        <small>
          {selectedColor?.name || product.colors?.[0]?.name}
          {" · "}
          Qty {quantity}
        </small>
      </div>
    )
  )}
</div>

<p>
  We'll contact you when your selected products
  are ready.
</p>
                  <button
                    className="button button-dark"
                    type="button"
                    onClick={() => { setSuccess(false); setSelectedProduct(null); }}
                  >
                    Notify me about another bag <ArrowRight size={17} />
                  </button>
                </div>
              ) : (
                <>
                  <p className="eyebrow">GET NOTIFIED</p>
                  <h3>Tell us what you're waiting for.</h3>

<div className="product-selector">
  <div className="product-selector-header">
    <div>
      <span>PRODUCTS</span>
      <strong>
        {selectedProducts.length > 0
          ? `${selectedProducts.length} product${
              selectedProducts.length > 1 ? "s" : ""
            } selected`
          : "Choose what you're waiting for"}
      </strong>
    </div>

    <span className="product-selector-count">
      {selectedProducts.reduce(
        (total, item) => total + item.quantity,
        0
      )}{" "}
      item
      {selectedProducts.reduce(
        (total, item) => total + item.quantity,
        0
      ) !== 1
        ? "s"
        : ""}
    </span>
  </div>

  <div className="product-dropdown-list">
    {PRODUCTS.map((product) => {
      const selected = selectedProducts.find(
        (item) => item.product.id === product.id
      );

      return (
        <div
          key={product.id}
          className={`product-dropdown-item ${
            selected ? "selected" : ""
          }`}
        >
          <button
            type="button"
            className="product-select-main"
            onClick={() => toggleProductSelection(product)}
          >
            <span className="product-select-checkbox">
              {selected ? <Check size={13} /> : null}
            </span>

            <ImageCard
              src={product.colors[0].image}
              alt={product.name}
              className="product-select-image"
              fallback={product.name}
            />

            <span className="product-select-details">
              <strong>{product.name}</strong>
              <small>{product.category}</small>
            </span>
          </button>

          {selected && (
            <div className="product-quantity">
              <button
                type="button"
                onClick={() =>
                  updateProductQuantity(product.id, -1)
                }
                aria-label={`Decrease ${product.name} quantity`}
              >
                −
              </button>

              <span>{selected.quantity}</span>

              <button
                type="button"
                onClick={() =>
                  updateProductQuantity(product.id, 1)
                }
                aria-label={`Increase ${product.name} quantity`}
              >
                +
              </button>
            </div>
          )}
        </div>
      );
    })}
  </div>
</div>

                  {error && <div className="form-error">{error}</div>}

                  <form onSubmit={handleLaunchSubmit}>
                    <input name="name" value={formData.name} onChange={handleInputChange} placeholder="Full name" required />
                    <input type="email" name="email" value={formData.email} onChange={handleInputChange} placeholder="Email address" required />
                    <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} placeholder="Contact number" required />
                    <textarea
  name="address"
  value={formData.address}
  onChange={handleInputChange}
  placeholder="Address (optional)"
  rows="3"
/>

                    <label className="consent">
                      <input
                        type="checkbox"
                        checked={dataConsent}
                        onChange={(e) => setDataConsent(e.target.checked)}
                      />
                      <span>
                        I agree that Grip Hill may use these details to notify me
                        about product availability and launch updates.
                      </span>
                    </label>

                    <button
                      className="button button-dark full-width"
                      disabled={loading || selectedProducts.length === 0}
                      type="submit"
                    >
                      {loading ? "Submitting..." : "Notify me"} <ArrowRight size={17} />
                    </button>
                  </form>

                  {selectedProducts.length === 0 && (
                    <p className="select-hint">Select at least one product to continue.</p>
                  )}
                </>
              )}
            </div>
          </div>
        </section>

        <section className="newsletter section">
          <div>
            <p className="eyebrow">STAY IN THE LOOP</p>
            <h2>Good things are worth waiting for.</h2>
          </div>
          <div className="newsletter-copy">
            <p>
              Follow Grip Hill for product previews, launch announcements and
              stories from the road.
            </p>
            <a className="text-link" href="#notify">
              Get product updates <ArrowRight size={16} />
            </a>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="footer-top">
          <div className="footer-brand">
            <a className="brand footer-logo" href="#top">
              <img src="/Glogo.png" alt="Grip Hill" />
              <span>GRIP HILL</span>
            </a>
            <p>Carry With Confidence.</p>
          </div>

          <div className="footer-column">
            <h4>Collection</h4>
            <a href="#new">Coming soon</a>
            {/* <a href="#collections">All bags</a> */}
            <a href="#lifestyle">Lifestyle</a>
            {/* <a href="#lifestyle">Lifestyle</a> */}
          </div>

          <div className="footer-column">
            <h4>About</h4>
            <a href="#story">Discover our bags</a>
            <a href="#craft">Craft</a>
            <a href="#journal">Journal</a>
            <a href="#notify">Notify me</a>
          </div>

          <div className="footer-column">
            <h4>Help</h4>
            <button onClick={() => setActiveModal("shipping")}>Shipping</button>
            <button onClick={() => setActiveModal("returns")}>Returns</button>
            <button onClick={() => setActiveModal("privacy")}>Privacy</button>
            <button onClick={() => setActiveModal("terms")}>Terms & Conditions</button>
          </div>
        </div>

        <div className="footer-bottom">
          <span>© 2026 Grip Hill. All rights reserved.</span>
          <span>Products coming soon.</span>
        </div>
      </footer>

      {searchOpen && (
        <div className="modal-backdrop" onClick={() => setSearchOpen(false)}>
          <div className="search-modal" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setSearchOpen(false)}>
              <X size={22} />
            </button>
            <p className="eyebrow">SEARCH GRIP HILL</p>
            <input autoFocus placeholder="Search bags, collections..." />
            <div className="search-suggestions">
              <a href="#new" onClick={() => setSearchOpen(false)}>New arrivals</a>
              <a href="#collections" onClick={() => setSearchOpen(false)}>Backpacks</a>
              <a href="#collections" onClick={() => setSearchOpen(false)}>Travel</a>
              <a href="#collections" onClick={() => setSearchOpen(false)}>Accessories</a>
            </div>
          </div>
        </div>
      )}

      {activeModal && (
        <div className="modal-backdrop" onClick={() => setActiveModal(null)}>
          <div className="info-modal" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setActiveModal(null)}>
              <X size={22} />
            </button>

            {activeModal?.name ? (
              <>
                <p className="eyebrow">{activeModal.category}</p>
                <h2>{activeModal.name}</h2>

                <div className="modal-product-image-wrap">
                  <ImageCard
                    src={activeModal.selectedColor?.image || activeModal.colors?.[0]?.image}
                    alt={`${activeModal.name} - ${activeModal.selectedColor?.name || activeModal.colors?.[0]?.name || ""}`}
                    className="modal-product-img"
                    fallback={activeModal.name}
                  />
                </div>

                <p>{activeModal.description}</p>

                <div className="modal-colours">
                  <span>Available colours</span>
                  <div className="color-swatches">
                    {activeModal.colors.map((color) => (
                      <button
                        key={color.name}
                        type="button"
                        className={`color-swatch ${activeModal.selectedColor?.name === color.name ? "selected" : ""}`}
                        style={{ backgroundColor: color.hex }}
                        title={color.name}
                        aria-label={color.name}
                        onClick={() => setActiveModal({ ...activeModal, selectedColor: color })}
                      />
                    ))}
                  </div>
                  <small>{activeModal.colors.map((color) => color.name).join(" • ")}</small>
                </div>

                <div className="coming-soon-modal-note">
                  <Sparkles size={17} /> Coming soon — orders are not open yet.
                </div>

                <button
                  className="button button-dark full-width"
                  type="button"
                  onClick={() => {
                    setActiveModal(null);
                    goToNotifyForm(activeModal, activeModal.selectedColor || activeModal.colors[0]);
                  }}
                >
                  Notify me when available <ArrowRight size={17} />
                </button>
              </>
            ) : (<>
                <p className="eyebrow">GRIP HILL</p>
                <h2>
                  {activeModal === "shipping" && "Shipping"}
                  {activeModal === "returns" && "Returns"}
                  {activeModal === "privacy" && "Privacy"}
                  {activeModal === "terms" && "Terms & Conditions"}
                </h2>
                
                <div className="modal-body-content" style={{ maxHeight: "60vh", overflowY: "auto", textAlign: "left", margin: "1rem 0", paddingRight: "0.5rem" }}>
                  {activeModal === "shipping" && (
                    <>
                      <p><strong>Shipping Information & Delivery</strong></p>
                      <p>We are committed to delivering your premium backpack safely and promptly.</p>
                      <p>• <strong>Order Processing:</strong> Orders are typically processed and shipped within 1 to 2 business days (excluding weekends and public holidays).</p>
                      <p>• <strong>Shipping Rates & Timelines:</strong> Standard shipping rates and estimated delivery times are calculated at checkout based on your delivery address.</p>
                      <p>• <strong>Order Tracking:</strong> Once dispatched, you will receive a confirmation email containing your tracking details.</p>
                    </>
                  )}

                  {activeModal === "returns" && (
                    <>
                      <p><strong>Returns & Exchanges</strong></p>
                      <p>We want you to be completely satisfied with your purchase. If something isn't quite right, we're here to help.</p>
                      <p>• <strong>Eligibility:</strong> You may request a return or exchange within 14 days of receiving your order, provided the item is unused and in its original packaging.</p>
                      <p>• <strong>How to Initiate:</strong> Contact our customer support team with your order number to start a return.</p>
                      <p>• <strong>Refunds:</strong> Approved refunds will be processed back to your original method of payment.</p>
                    </>
                  )}

                  {activeModal === "privacy" && (
                    <>
                      <p><strong>Privacy Statement</strong></p>
                      <p>Your privacy is important to us. This policy outlines how we collect, use, and protect your information.</p>
                      <p>• <strong>Information We Collect:</strong> Personal details provided directly during checkout or account creation (name, email, shipping address).</p>
                      <p>• <strong>Use of Information:</strong> Used exclusively to process transactions, fulfill orders, and communicate regarding purchases.</p>
                      <p>• <strong>Data Security:</strong> We implement standard security measures to safeguard your data from unauthorized access.</p>
                    </>
                  )}

                  {activeModal === "terms" && (
                    <>
                      <p><strong>Terms & Conditions</strong></p>
                      <p>By accessing our website and purchasing our products, you agree to the following terms.</p>
                      <p>• <strong>Use of Site:</strong> You agree to use our website only for lawful, non-infringing purposes.</p>
                      <p>• <strong>Product Accuracy:</strong> We display product details, dimensions, and colors as accurately as possible.</p>
                      <p>• <strong>Intellectual Property:</strong> All website content, branding, logos, and imagery remain our exclusive property.</p>
                    </>
                  )}
                </div>

                <button className="button button-dark" onClick={() => setActiveModal(null)}>
                  Close <X size={17} />
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
