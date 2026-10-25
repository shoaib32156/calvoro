import { Link, useParams } from "react-router-dom";
import SEO, { SITE_URL } from "../SEO";
import ArticleCard from "../components/editorial/ArticleCard.jsx";
import Breadcrumbs from "../components/editorial/Breadcrumbs.jsx";
import RichText from "../components/editorial/RichText.jsx";
import {
  ArticleFaq,
  ArticleSections,
  ArticleToc,
} from "../components/editorial/ArticleContent.jsx";
import {
  articles,
  formatArticleDate,
  getArticle,
  getArticleNeighbors,
  getReadTime,
  getRelatedArticles,
} from "../content/articles/index.js";

function buildArticleSchema(article) {
  const url = `${SITE_URL}/blog/${article.slug}`;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        headline: article.title,
        description: article.excerpt,
        datePublished: article.date,
        dateModified: article.date,
        mainEntityOfPage: { "@type": "WebPage", "@id": url },
        url,
        articleSection: article.category,
        inLanguage: "en",
        author: { "@type": "Organization", name: "CALVORO Editorial" },
        publisher: { "@type": "Organization", name: "CALVORO" },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: SITE_URL,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Journal",
            item: `${SITE_URL}/blog`,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: article.title,
            item: url,
          },
        ],
      },
      {
        "@type": "FAQPage",
        mainEntity: article.faq.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: item.answer,
          },
        })),
      },
    ],
  };
}

export default function BlogArticle() {
  const { slug } = useParams();
  const post = getArticle(slug);

  if (!post) {
    return (
      <div className="calvoro-journal-page">
        <SEO
          title="Article not found | CALVORO"
          description="The requested CALVORO Journal article could not be found."
          noindex
        />
        <section className="calvoro-journal-hero">
          <div className="calvoro-journal-container">
            <Breadcrumbs
              tone="dark"
              items={[{ label: "Home", to: "/" }, { label: "Journal", to: "/blog" }, { label: "Not found" }]}
            />
            <span className="calvoro-journal-kicker">404</span>
            <h1>That guide could not be found.</h1>
            <p>
              The address may be out of date. Browse the journal or use the
              tool directory to find the calculator you need.
            </p>
            <div className="calvoro-journal-404-actions">
              <Link to="/blog" className="calvoro-journal-primary-link">
                Browse the journal
              </Link>
              <Link to="/tools" className="calvoro-journal-secondary-link">
                All tools
              </Link>
            </div>
          </div>
        </section>
      </div>
    );
  }

  const relatedArticles = getRelatedArticles(post, 3);
  const neighbors = getArticleNeighbors(post.slug);
  return (
    <div className="calvoro-journal-page">
      <SEO
        title={`${post.title} | CALVORO Journal`}
        description={post.excerpt}
        type="article"
        jsonLd={buildArticleSchema(post)}
      />

      <header className="calvoro-article-hero">
        <div className="calvoro-journal-container">
          <Breadcrumbs
            tone="dark"
            items={[
              { label: "Home", to: "/" },
              { label: "Journal", to: "/blog" },
              { label: post.category, to: "/blog" },
              { label: post.title },
            ]}
          />

          <span className="calvoro-article-category">{post.category}</span>
          <h1>{post.title}</h1>
          <p className="calvoro-article-deck">{post.excerpt}</p>

          <div className="calvoro-article-meta">
            <span>By CALVORO Editorial</span>
            <span>{formatArticleDate(post.date)}</span>
            <span>{getReadTime(post)}</span>
          </div>
        </div>
      </header>

      <main className="calvoro-journal-main">
        <div className="calvoro-journal-container">
          <div className="calvoro-article-layout">
            <article className="calvoro-article-body">
              <section
                className="calvoro-article-takeaways"
                aria-labelledby="takeaways-heading"
              >
                <span className="calvoro-article-section-kicker">
                  The short version
                </span>
                <h2 id="takeaways-heading">Key takeaways</h2>
                <ul>
                  {post.takeaways.map((item) => (
                    <li key={item}>
                      <RichText text={item} />
                    </li>
                  ))}
                </ul>
              </section>

              <ArticleToc sections={post.sections} />
              <ArticleSections article={post} />
              <ArticleFaq faq={post.faq} />

              <div className="calvoro-article-tool-cta">
                <span className="calvoro-article-section-kicker">
                  Put the guide to work
                </span>
                <h2>{post.tool.name}</h2>
                <p>
                  {post.tool.description ||
                    "Enter your own values in the CALVORO calculator and see the result without creating an account."}
                </p>
                <Link to={post.tool.path}>
                  Open {post.tool.name} <span aria-hidden="true">→</span>
                </Link>
              </div>

              <div className="calvoro-article-disclosure">
                <strong>About this guide</strong>
                <p>
                  This article explains a general calculation or workflow for
                  educational purposes. It is not financial, medical, academic,
                  or legal advice. Results from the linked calculator depend on
                  the values you enter and the assumptions described on that
                  tool's page.
                </p>
              </div>
            </article>

            <aside className="calvoro-article-sidebar" aria-label="Article sidebar">
              <section className="calvoro-journal-side-card">
                <span className="calvoro-journal-kicker">Related tool</span>
                <h2>{post.tool.name}</h2>
                <p>
                  {post.tool.description ||
                    "Apply the calculation from this guide with your own numbers."}
                </p>
                <Link
                  to={post.tool.path}
                  className="calvoro-article-side-button"
                >
                  Open tool <span aria-hidden="true">→</span>
                </Link>
              </section>

              <section className="calvoro-journal-side-card">
                <span className="calvoro-journal-kicker">Keep reading</span>
                <h2>Related guides</h2>
                <div className="calvoro-article-related-list">
                  {relatedArticles.map((article) => (
                    <Link
                      key={article.slug}
                      to={`/blog/${article.slug}`}
                      className="calvoro-article-related-link"
                    >
                      <span>{article.category}</span>
                      <strong>{article.title}</strong>
                      <small>{getReadTime(article)}</small>
                    </Link>
                  ))}
                </div>
              </section>

              <section className="calvoro-journal-side-card calvoro-journal-side-note">
                <h2>Browse the journal</h2>
                <p>
                  {articles.length} guides covering finance, math, health,
                  education, everyday planning, business, productivity, and
                  browser tools.
                </p>
                <Link to="/blog">All guides →</Link>
              </section>
            </aside>
          </div>

          {relatedArticles.length > 0 && (
            <section
              className="calvoro-article-more"
              aria-labelledby="more-guides-heading"
            >
              <div className="calvoro-journal-heading-row">
                <div>
                  <span className="calvoro-journal-kicker">Continue learning</span>
                  <h2 id="more-guides-heading">More guides like this one</h2>
                </div>
                <Link to="/blog" className="calvoro-journal-text-link">
                  View all guides →
                </Link>
              </div>
              <div className="calvoro-editorial-grid calvoro-editorial-grid-3">
                {relatedArticles.map((article) => (
                  <ArticleCard key={article.slug} article={article} />
                ))}
              </div>
            </section>
          )}

          <nav className="calvoro-article-pagination" aria-label="Article navigation">
            {neighbors.previous ? (
              <Link to={`/blog/${neighbors.previous.slug}`}>
                <span>Previous guide</span>
                <strong>{neighbors.previous.title}</strong>
              </Link>
            ) : (
              <span />
            )}
            {neighbors.next ? (
              <Link to={`/blog/${neighbors.next.slug}`} className="is-next">
                <span>Next guide</span>
                <strong>{neighbors.next.title}</strong>
              </Link>
            ) : (
              <span />
            )}
          </nav>
        </div>
      </main>
    </div>
  );
}
