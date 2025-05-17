class BlogTable extends HTMLElement {
  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: "open" });

    this.data = [];
    try {
      this.data = JSON.parse(this.getAttribute("data"));
    } catch (error) {
      console.error("Error parsing data:", error);
    }

    function renderRow(row) {
      return `
        <tr>
          <td>
            <a href="/blog/${row.slug}">
              <img src="${row.image}" class="image" alt="${row.title}" />
            </a>
          </td>

          <td>
            <h3><a href="/blog/${row.slug}">${row.title}</a></h3>
          </td>

          <td>
            <span>${row.category}</span>
          </td>

          <td>
            <time>${row.readTime}</time>
          </td>

          <td>
            <span>${row.views}</span>
          </td>

          <td>
            <div class="status ${row.published ? "published" : "draft"}">
              ${row.status}: ${row.published ? row.publishedAt : row.createdAt}
              <div class="status-icon"></div>
            </div>
          </td>
        </tr>
      `;
    }

    this.shadowRoot.innerHTML = `
      <style>
        table {
          width: 100%;
          border-collapse: collapse;
          border-color: var(--smoke-200);
        }

        thead tr {
          background-color: var(--smoke-50);
        }

        th {
          padding: 0.5rem;
          text-align: left;
          border: none;
        }

        td {
          padding: 0.5rem;
          border: none;
        }

        td:first-child {
          padding: 0;
        }

        .image {
          width: 6rem;
          object-fit: cover;
          aspect-ratio: 16 / 9;
        }

        h3 {
          font-size: 1rem;
          font-weight: 500;
        }

        h3 a {
          text-decoration: none;
          color: var(--gopher-500);
        }

        h3 a:hover {
          text-decoration: underline;
          color: var(--gopher-600);
        }

        span {
          font-size: 0.875rem;
          display: flex;
          align-items: center;
        }

        .date {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          text-align: right;
        }

        .status {
          width: fit-content;
          margin-left: auto;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.25rem;
          border-radius: 0.5rem;
          padding: 0.25rem 0.5rem;
          font-size: 0.875rem;
          font-weight: 500;
        }

        .published {
          background-color: rgba(0, 128, 0, 0.1);
          color: rgb(0, 128, 0);
        }

        .draft {
          background-color: rgba(255, 0, 0, 0.1);
          color: rgb(255, 0, 0);
        }

        .status-icon {
          width: 0.5rem;
          height: 0.5rem;
          border-radius: 50%;
          border: 0.125rem solid;
        }

        .status-icon {
          border-color: currentColor;
        }

        @media (prefers-color-scheme: dark) {
          thead tr {
            background-color: var(--smoke-950);
          }
          table {
            border-color: var(--smoke-800);
          }
        }
      </style>

      <table border="1">
        <thead>
          <tr>
            <th width="6rem">Image</th>
            <th>Title</th>
            <th>Category</th>
            <th>Read Time</th>
            <th>Views</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          ${this.data.map(renderRow).join("")}
        </tbody>
      </table>
    `;
  }
}
customElements.define("blog-table", BlogTable);
