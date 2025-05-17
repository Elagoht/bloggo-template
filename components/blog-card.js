export class BlogCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.title = this.getAttribute("title");
    this.slug = this.getAttribute("slug");
    this.image = this.getAttribute("image");
    this.publishedAt = this.getAttribute("publishedAt");
    this.createdAt = this.getAttribute("createdAt");
    this.category = this.getAttribute("category");
    this.views = this.getAttribute("views");
    this.readTime = this.getAttribute("readTime");

    function formatDate(date) {
      const options = { year: "numeric", month: "long", day: "numeric" };
      return new Date(date).toLocaleDateString("en-US", options);
    }

    this.shadowRoot.innerHTML = `
      <style>
        a {
          display: flex;
          flex-direction: column;
          overflow: hidden;
          border-radius: 0.5rem;
          background-color: var(--smoke-50);
          text-decoration: none;
          color: inherit;
          transition: all 0.2s ease-in-out;
        }

        figure {
          position: relative;
          aspect-ratio: 16 / 9;
          margin: 0;
          overflow: hidden;
        }

        figcaption {
          position: absolute;
          bottom: 0;
          right: 0;
          border-top-left-radius: 0.5rem;
          opacity: 0.8;
          padding: 0.25rem 0.5rem;
          background-color: var(--gopher-900);
          color: var(--gopher-50);
          font-size: 0.875rem;
        }

        span {
          position: absolute;
          bottom: 0;
          left: 0;
          border-top-right-radius: 0.5rem;
          background-color: var(--gopher-900);
          color: var(--gopher-50);
          font-size: 0.875rem;
          padding: 0.25rem 0.5rem;
          display: flex;
          align-items: center;
          gap: 0.25rem;
          opacity: 0.8;
        }

        img {
          width: 100%;
          transition: all 0.2s ease-in-out;
        }

        div {
          padding: 0.5rem;
        }

        p {
          margin: 0;
          color: var(--smoke-500);
        }

        time {
          color: var(--smoke-500);
          font-size: 0.875rem;
        }

        div:has(time) {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        a:hover img {
          transform: scale(1.05);
        }

        @media (prefers-color-scheme: dark) {
          a {
            background-color: var(--smoke-950);
            color: var(--smoke-100);
          }
        }
      </style>

      <a href="/blogs/edit/${this.slug}">
        <figure>
          <img src="${this.image}" alt="${this.title}" />

          <figcaption>${this.category}</figcaption>

          <span><icon-eye></icon-eye>${this.views}</span>
        </figure>

        <div>
          <strong>${this.title}</strong>
        </div>

        <div>
          <time>${formatDate(this.publishedAt || this.createdAt)}</time>

          <time>${this.readTime}</time>
        </div>
      </a>
    `;
  }
}

customElements.define("blog-card", BlogCard);
