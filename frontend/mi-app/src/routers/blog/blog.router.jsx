import { useCallback, useContext } from "react";
import { ContextJsonLoadContext } from "../../context/context_json_load/context_json_load";
import { useNavigate, Outlet, useParams } from "react-router-dom";

// ------------------------------
// 📂 SEO y Meta
import SEOHelmet from "../../components/seo/SEOHelmet/SEOHelmet";

// ------------------------------
// 📂 Layout
import Header from "../../components/layout/header/header";

// ------------------------------
// 📂 Styles
import "./blog.router.scss";

const Blog = () => {
  const { id } = useParams(); // si estoy en /blog/:id
  const navigate = useNavigate();
  const { blogs } = useContext(ContextJsonLoadContext);

  console.log("Blogs cargados:", blogs);
  const handleOpenBlog = useCallback(
    (e, item) => {
      e.preventDefault();
      if (!item?.id) return;
      navigate(`/blog/${item.id}`);
    },
    [navigate]
  );

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString("es-ES", options);
  };

  const truncateText = (text, maxLength) => {
    if (!text) return "";
    return text.length <= maxLength ? text : text.substr(0, maxLength).trim() + "...";
  };

  return (
    <div className="blog__container">
      <SEOHelmet
        title="Blog"
        description="Simplify Your Focus"
        keywords="tecnología, software, negocios, soluciones digitales, emprendimientos"
        author="Neyen Frandino"
        url="https://miempresa.com"
        image="https://miempresa.com/default-image.jpg"
      />

      {/* Si NO hay id => estoy en /blog => muestro listado */}
      {!id ? (
        <>
          <Header>
            <div className="blog--header__container">
              <div className="blog--header__img">
                <img src="/img/no_comprimirda.jpg" alt="blog" />
              </div>

              <div className="blog--header__content">
                <div className="blog--header__content--title">
                  <h1>
                    <span>NUESTRO BLOG</span>
                  </h1>
                </div>
                <div className="blog--header__content--subtitle">
                  <p>
                    Blog sobre novedades e información, tips y consejos para mejorar tu vida y el planeta.
                  </p>
                </div>
              </div>

              <div className="scroll-indicator">
                <div className="mouse"></div>
              </div>
            </div>
          </Header>

          <div className="blog__content">
            <div className="blog__content--grid">
              {blogs?.blogs && blogs.blogs.length > 0 ? (
                blogs.blogs.map((item) => (
                  <article
                    key={item.id}
                    className="blog__content--card"
                    onClick={(e) => handleOpenBlog(e, item)}
                    role="article"
                    tabIndex={0}
                    aria-label={`Leer más sobre ${item.title}`}
                    style={{ cursor: "pointer" }}
                  >
                    {/* Badge de categoría */}
                    {item.category && <span className="card-category">{item.category}</span>}

                    {/* Imagen */}
                    <div className="blog__content--card-image">
                      <img
                        src={item.card?.image || "/img/placeholder-blog.jpg"}
                        alt={item.title}
                        loading="lazy"
                        onError={(e) => {
                          e.target.src = "/img/placeholder-blog.jpg";
                        }}
                      />
                    </div>

                    {/* Contenido */}
                    <div className="blog__content--card-content">
                      <h3>{truncateText(item.title, 60)}</h3>
                      <p>{truncateText(item.card?.description, 120)}</p>

                      <div className="card-meta">
                        {item.date && <span className="meta-date">{formatDate(item.date)}</span>}
                        <span className="read-more">Leer más</span>
                      </div>
                    </div>
                  </article>
                ))
              ) : (
                <div className="blog__content--empty">
                  <div className="empty-icon">📝</div>
                  <p>No hay blogs disponibles en este momento.</p>
                  <p>¡Vuelve pronto para nuevas publicaciones!</p>
                </div>
              )}
            </div>
          </div>
        </>
      ) : (
        // Si hay id => estoy en /blog/:id => muestro detalle
        <Outlet />
      )}
    </div>
  );
};

export default Blog;
