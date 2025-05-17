class BlogList extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    let data = [];
    try {
      data = JSON.parse(this.getAttribute("data"));
    } catch (err) {
      console.error("Invalid data:", err);
    }

    const style = `
      <style>
        .scrollable {
          overflow-x: auto;
        }

        .container {
          display: flex;
          flex-direction: column;
          min-width: 48rem;
        }

        .header, .row {
          display: grid;
          grid-template-columns: 6rem 4fr 2fr 1fr 1fr 3fr;
          align-items: center;
          gap: 1rem;
          padding: 0.75rem;
          border-radius: 0.5rem;
        }

        .header div {
          white-space: nowrap;
        }

        .header div:last-child {
          text-align: right;
        }

        .header {
          font-weight: bold;
          background: var(--smoke-0);
        }

        .row {
          transition: background 0.2s;
        }

        .row:hover {
          background: var(--smoke-50);
        }

        .row {
          text-decoration: none;
          color: inherit;
        }

        .image {
          width: 6rem;
          aspect-ratio: 16 / 9;
          object-fit: cover;
        }

        .status-container {
          white-space: nowrap;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .status {
          width: fit-content;
          margin-left: auto;
          padding: 0.25rem 0.5rem;
          border-radius: 1rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-weight: 500;
          font-size: 0.875rem;
        }

        .published {
          color: rgb(0, 128, 0);
          background: rgba(0, 128, 0, 0.1);
        }

        .draft {
          color: rgb(255, 0, 0);
          background: rgba(255, 0, 0, 0.1);
        }

        .status-icon {
          flex-shrink: 0;
          width: 0.75rem;
          height: 0.75rem;
          background: currentColor;
          border-radius: 50%;
        }

        @media (prefers-color-scheme: dark) {
          .header {
            background: var(--smoke-950);
          }
          .row {
            border-top-color: var(--smoke-800);
          }
          .row:hover {
            background: var(--smoke-900);
          }
        }
      </style>
    `;

    function renderRow(row) {
      return `<a class="row" href="/blog/edit/${row.slug}">
          <img src="${row.image}" class="image" alt="${row.title}" />
          <div>${row.title}</div>
          <div>${row.category}</div>
          <div>${row.readTime} min</div>
          <div>${row.views}</div>
          <div class="status ${row.published ? "published" : "draft"}">
            <div class="status-container">
              <div class="status-icon"></div>
              ${row.status}: ${row.published ? row.publishedAt : row.createdAt}
            </div>
          </div>
        </a>`;
    }

    this.shadowRoot.innerHTML = `
      ${style}
      <div class="scrollable">
        <div class="container">
          <div class="header">
            <div>Image</div>
            <div>Title</div>
            <div>Category</div>
            <div>Read Time</div>
            <div>Views</div>
          <div>Status</div>
        </div>
        ${data.map(renderRow).join("")}
      </div>
    `;
  }
}

customElements.define("blog-list", BlogList);
