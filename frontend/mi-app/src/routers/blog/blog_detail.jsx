import { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate, useLocation, Link } from 'react-router-dom';
import { ContextJsonLoadContext } from '../../context/context_json_load/context_json_load';
import { ArrowLeft, Calendar, User, Clock, Tag, Share2, Heart, BookOpen } from 'lucide-react';
import SEOHelmet from '../../components/seo/SEOHelmet/SEOHelmet';
import './blog_detail.scss';

const BlogDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const { blogs } = useContext(ContextJsonLoadContext);
    
    const [blogPost, setBlogPost] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isLiked, setIsLiked] = useState(false);
    const [readingTime, setReadingTime] = useState(0);

    useEffect(() => {
        // Intentar obtener el blog desde el state primero (más rápido)
        if (location.state?.blogData && location.state.blogData.id === id) {
            setBlogPost(location.state.blogData);
            setIsLoading(false);
        } else if (blogs?.blogs) {
            // Si no hay state, buscar en el contexto
            const foundBlog = blogs.blogs.find(blog => blog.id === id);
            if (foundBlog) {
                setBlogPost(foundBlog);
            } else {
                console.error('Blog no encontrado con ID:', id);
                // Redirigir a la lista de blogs si no se encuentra
                setTimeout(() => {
                    navigate('/blog', { replace: true });
                }, 2000);
            }
            setIsLoading(false);
        }
    }, [id, blogs, location.state, navigate]);

    useEffect(() => {
        // Calcular tiempo de lectura
        if (blogPost?.content) {
            const wordsPerMinute = 200;
            let totalWords = 0;
            
            if (blogPost.content.introduction) {
                totalWords += blogPost.content.introduction.split(' ').length;
            }
            
            if (blogPost.content.sections) {
                blogPost.content.sections.forEach(section => {
                    totalWords += (section.text || '').split(' ').length;
                    totalWords += (section.heading || '').split(' ').length;
                });
            }
            
            if (blogPost.content.conclusion) {
                totalWords += blogPost.content.conclusion.split(' ').length;
            }
            
            setReadingTime(Math.ceil(totalWords / wordsPerMinute));
        }
    }, [blogPost]);

    const handleGoBack = () => {
        navigate('/blog');
    };

    const handleShare = async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: blogPost.title,
                    text: blogPost.subtitle || blogPost.content?.introduction,
                    url: window.location.href,
                });
            } catch (error) {
                console.log('Error al compartir:', error);
            }
        } else {
            // Fallback: copiar al portapapeles
            navigator.clipboard.writeText(window.location.href);
            alert('¡Enlace copiado al portapapeles!');
        }
    };

    const handleLike = () => {
        setIsLiked(!isLiked);
        // Aquí podrías guardar el like en localStorage o enviarlo a una API
        localStorage.setItem(`blog-like-${id}`, (!isLiked).toString());
    };

    useEffect(() => {
        // Verificar si ya tiene like
        const liked = localStorage.getItem(`blog-like-${id}`) === 'true';
        setIsLiked(liked);
    }, [id]);

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('es-ES', options);
    };

    if (isLoading) {
        return (
            <div className="blog-detail__loading">
                <div className="spinner"></div>
                <p>Cargando artículo...</p>
            </div>
        );
    }

    if (!blogPost) {
        return (
            <div className="blog-detail__error">
                <h2>Artículo no encontrado</h2>
                <p>Redirigiendo a la lista de blogs...</p>
            </div>
        );
    }

    return (
        <div className="blog-detail">
            <SEOHelmet 
                title={blogPost.title} 
                description={blogPost.subtitle || blogPost.content?.introduction} 
                keywords={blogPost.category} 
                author={blogPost.author || 'Neyen Frandino'} 
                url={window.location.href} 
                image={blogPost.card?.image} 
            />

            {/* Hero Section con imagen de fondo */}
            <div className="blog-detail__hero" 
                 style={{
                     backgroundImage: blogPost.card?.image ? `url(${blogPost.card.image})` : 'none'
                 }}>
                <div className="hero-overlay"></div>
                
                {/* Barra de navegación superior */}
                <div className="blog-detail__nav">
                    <button onClick={handleGoBack} className="nav-back">
                        <ArrowLeft size={20} />
                        <span>Volver al Blog</span>
                    </button>
                    
                    <div className="nav-actions">
                        <button onClick={handleShare} className="action-btn" aria-label="Compartir">
                            <Share2 size={20} />
                        </button>
                        <button 
                            onClick={handleLike} 
                            className={`action-btn ${isLiked ? 'liked' : ''}`}
                            aria-label="Me gusta"
                        >
                            <Heart size={20} fill={isLiked ? 'currentColor' : 'none'} />
                        </button>
                    </div>
                </div>
                
                {/* Contenido del hero */}
                <div className="hero-content">
                    {blogPost.category && (
                        <span className="hero-category">
                            <Tag size={14} />
                            {blogPost.category}
                        </span>
                    )}
                    
                    <h1 className="hero-title">{blogPost.title}</h1>
                    
                    {blogPost.subtitle && (
                        <p className="hero-subtitle">{blogPost.subtitle}</p>
                    )}
                    
                    <div className="hero-meta">
                        {blogPost.date && (
                            <span className="meta-item">
                                <Calendar size={16} />
                                {formatDate(blogPost.date)}
                            </span>
                        )}
                        
                        {blogPost.author && (
                            <span className="meta-item">
                                <User size={16} />
                                {blogPost.author}
                            </span>
                        )}
                        
                        <span className="meta-item">
                            <Clock size={16} />
                            {readingTime} min de lectura
                        </span>
                    </div>
                </div>
            </div>

            {/* Contenido principal del artículo */}
            <article className="blog-detail__content">
                <div className="content-wrapper">
                    {/* Introducción */}
                    {blogPost.content?.introduction && (
                        <div className="content-introduction">
                            <p>{blogPost.content.introduction}</p>
                        </div>
                    )}
                    
                    {/* Secciones del contenido */}
                    {blogPost.content?.sections && blogPost.content.sections.map((section, index) => (
                        <section key={index} className="content-section">
                            {section.heading && (
                                <h2 className="section-heading">{section.heading}</h2>
                            )}
                            {section.text && (
                                <div className="section-text">
                                    <p>{section.text}</p>
                                </div>
                            )}
                            {section.list && (
                                <ul className="section-list">
                                    {section.list.map((item, idx) => (
                                        <li key={idx}>{item}</li>
                                    ))}
                                </ul>
                            )}
                            {section.quote && (
                                <blockquote className="section-quote">
                                    <p>{section.quote}</p>
                                    {section.quoteAuthor && (
                                        <cite>— {section.quoteAuthor}</cite>
                                    )}
                                </blockquote>
                            )}
                        </section>
                    ))}
                    
                    {/* Conclusión */}
                    {blogPost.content?.conclusion && (
                        <div className="content-conclusion">
                            <h2>Conclusión</h2>
                            <p>{blogPost.content.conclusion}</p>
                        </div>
                    )}
                    
                    {/* Footer del artículo */}
                    <div className="content-footer">
                        <div className="footer-tags">
                            {blogPost.tags && blogPost.tags.map((tag, index) => (
                                <span key={index} className="tag">#{tag}</span>
                            ))}
                        </div>
                        
                        <div className="footer-actions">
                            <button onClick={handleShare} className="share-btn">
                                <Share2 size={18} />
                                Compartir artículo
                            </button>
                            
                            <button 
                                onClick={handleLike} 
                                className={`like-btn ${isLiked ? 'liked' : ''}`}
                            >
                                <Heart size={18} fill={isLiked ? 'currentColor' : 'none'} />
                                {isLiked ? 'Te gusta' : 'Me gusta'}
                            </button>
                        </div>
                    </div>
                </div>
                
                {/* Sidebar con información adicional */}
                <aside className="blog-detail__sidebar">
                    <div className="sidebar-card">
                        <h3>
                            <BookOpen size={18} />
                            Sobre este artículo
                        </h3>
                        <div className="sidebar-info">
                            <p><strong>Categoría:</strong> {blogPost.category || 'General'}</p>
                            <p><strong>Tiempo de lectura:</strong> {readingTime} minutos</p>
                            <p><strong>Publicado:</strong> {blogPost.date ? formatDate(blogPost.date) : 'Sin fecha'}</p>
                            {blogPost.author && <p><strong>Autor:</strong> {blogPost.author}</p>}
                        </div>
                    </div>
                    
                    {/* Enlaces relacionados si existen */}
                    {blogPost.relatedLinks && (
                        <div className="sidebar-card">
                            <h3>Enlaces relacionados</h3>
                            <ul className="related-links">
                                {blogPost.relatedLinks.map((link, index) => (
                                    <li key={index}>
                                        <a href={link.url} target="_blank" rel="noopener noreferrer">
                                            {link.title}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </aside>
            </article>
            
            {/* Navegación a otros posts */}
            <div className="blog-detail__navigation">
                <Link to="/blog" className="nav-all">
                    <ArrowLeft size={20} />
                    Ver todos los artículos
                </Link>
            </div>
        </div>
    );
};

export default BlogDetail;