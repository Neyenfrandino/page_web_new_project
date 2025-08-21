import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Calendar, Clock, Users, BookOpen, Bell, Zap, Star, Eye, ArrowRight } from 'lucide-react';
import './calendar.scss';

const EventCalendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [urgentEvents, setUrgentEvents] = useState([]);
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [animate, setAnimate] = useState(false);

  // Eventos del calendario (datos que vendrían de tu API)
  const [events] = useState({
    '2025-08-21': [
      { id: 1, title: 'Curso React Avanzado', type: 'course', time: '16:00', duration: '3h', participants: 15, priority: 'urgent', instructor: 'Ana García' },
    ],
    '2025-08-22': [
      { id: 2, title: 'Workshop JavaScript ES6+', type: 'course', time: '09:00', duration: '4h', participants: 25, priority: 'high', instructor: 'Carlos López' },
      { id: 3, title: 'Reunión Estratégica Q4', type: 'event', time: '15:00', duration: '2h', participants: 12, priority: 'medium', location: 'Sala Ejecutiva' }
    ],
    '2025-08-23': [
      { id: 4, title: 'Masterclass UI/UX Design', type: 'course', time: '10:00', duration: '5h', participants: 30, priority: 'high', instructor: 'María Rodríguez' }
    ],
    '2025-08-24': [
      { id: 7, title: 'Taller de Marketing Digital', type: 'course', time: '14:00', duration: '3h', participants: 18, priority: 'medium', instructor: 'Pedro Sánchez' }
    ],
    '2025-08-25': [
      { id: 5, title: 'Networking Tech Meetup', type: 'event', time: '18:00', duration: '3h', participants: 50, priority: 'high', location: 'Auditorio Principal' }
    ],
    '2025-08-26': [
      { id: 8, title: 'Curso Python para Data Science', type: 'course', time: '09:30', duration: '6h', participants: 20, priority: 'urgent', instructor: 'Luis Martín' }
    ],
    '2025-08-28': [
      { id: 6, title: 'Conferencia Anual Tech 2025', type: 'event', time: '09:00', duration: '8h', participants: 200, priority: 'urgent', location: 'Centro de Convenciones' }
    ],
    '2025-08-30': [
      { id: 9, title: 'Workshop DevOps & Cloud', type: 'course', time: '11:00', duration: '4h', participants: 15, priority: 'high', instructor: 'Sofia Torres' }
    ]
  });

  const months = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ];

  const daysOfWeek = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];

  // Calcular eventos urgentes y próximos
  useEffect(() => {
    const now = new Date();
    const urgent = [];
    const upcoming = [];
    
    Object.entries(events).forEach(([dateStr, dayEvents]) => {
      const eventDate = new Date(dateStr);
      const diffTime = eventDate.getTime() - now.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      
      dayEvents.forEach(event => {
        const eventWithDate = {
          ...event,
          date: eventDate,
          daysUntil: diffDays,
          dateStr: dateStr
        };

        // Eventos urgentes (próximos 3 días o marcados como urgentes)
        if (diffDays <= 3 || event.priority === 'urgent') {
          urgent.push(eventWithDate);
        }
        
        // Próximos eventos (próximos 14 días)
        if (diffDays >= 0 && diffDays <= 14) {
          upcoming.push(eventWithDate);
        }
      });
    });
    
    urgent.sort((a, b) => {
      // Primero por días hasta el evento, luego por prioridad
      if (a.daysUntil !== b.daysUntil) return a.daysUntil - b.daysUntil;
      const priorityOrder = { urgent: 0, high: 1, medium: 2, low: 3 };
      return priorityOrder[a.priority] - priorityOrder[b.priority];
    });
    
    upcoming.sort((a, b) => a.daysUntil - b.daysUntil);
    
    setUrgentEvents(urgent.slice(0, 4));
    setUpcomingEvents(upcoming.slice(0, 8));
  }, [events]);

  // Animación de pulso para eventos urgentes
  useEffect(() => {
    const interval = setInterval(() => {
      setAnimate(prev => !prev);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];
    
    for (let i = startingDayOfWeek - 1; i >= 0; i--) {
      const prevDate = new Date(year, month, -i);
      days.push({
        date: prevDate,
        isCurrentMonth: false,
        day: prevDate.getDate()
      });
    }

    for (let day = 1; day <= daysInMonth; day++) {
      days.push({
        date: new Date(year, month, day),
        isCurrentMonth: true,
        day: day
      });
    }

    const remainingDays = 42 - days.length;
    for (let day = 1; day <= remainingDays; day++) {
      const nextDate = new Date(year, month + 1, day);
      days.push({
        date: nextDate,
        isCurrentMonth: false,
        day: nextDate.getDate()
      });
    }

    return days;
  };

  const formatDateKey = (date) => {
    return date.toISOString().split('T')[0];
  };

  const navigateMonth = (direction) => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      newDate.setMonth(prev.getMonth() + direction);
      return newDate;
    });
  };

  const handleDateClick = (date) => {
    if (!date.isCurrentMonth) return;
    const dayEvents = getEventsForDate(date.date);
    if (dayEvents.length > 0) {
      setSelectedDate(date.date);
      setShowModal(true);
    }
  };

  const getEventsForDate = (date) => {
    const dateKey = formatDateKey(date);
    return events[dateKey] || [];
  };

  const isToday = (date) => {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  const getPriorityIcon = (priority) => {
    switch (priority) {
      case 'urgent': return <Zap size={12} />;
      case 'high': return <Bell size={12} />;
      default: return null;
    }
  };

  const getDaysUntilText = (daysUntil) => {
    if (daysUntil < 0) return 'Evento finalizado';
    if (daysUntil === 0) return '¡HOY!';
    if (daysUntil === 1) return 'MAÑANA';
    return `En ${daysUntil} días`;
  };

  const hasUrgentEvents = (date) => {
    const dayEvents = getEventsForDate(date);
    return dayEvents.some(event => event.priority === 'urgent');
  };

  const hasAnyEvents = (date) => {
    return getEventsForDate(date).length > 0;
  };

  const getPriorityText = (priority) => {
    switch (priority) {
      case 'urgent': return '🔴 URGENTE';
      case 'high': return '🟠 ALTA';
      case 'medium': return '🟡 MEDIA';
      case 'low': return '🟢 BAJA';
      default: return '🟢 MEDIA';
    }
  };

  const days = getDaysInMonth(currentDate);

  return (
    <div className="calendar-container">
      {/* Header Premium */}
      <div className="calendar-container__header">
        <div className="calendar-container__header-info">
          <div className="calendar-container__header-info-icon">
            <Eye size={32} color="#063B2C" />
          </div>
          <div className="calendar-container__header-info-text">
            <h1>Calendario de Eventos</h1>
            <p>Vista completa de eventos y cursos programados</p>
          </div>
        </div>
        
        <div className="calendar-container__header-navigation">
          <button
            onClick={() => navigateMonth(-1)}
            className="calendar-container__header-navigation-button"
          >
            <ChevronLeft size={20} />
          </button>
          <div className="calendar-container__header-navigation-month">
            <span>
              {months[currentDate.getMonth()]} {currentDate.getFullYear()}
            </span>
          </div>
          <button
            onClick={() => navigateMonth(1)}
            className="calendar-container__header-navigation-button"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      <div className="calendar-container__main">
        {/* Calendario Principal */}
        <div className="calendar-container__calendar">
          {/* Days of week header */}
          <div className="calendar-container__calendar-header">
            {daysOfWeek.map((day) => (
              <div key={day} className="calendar-container__calendar-header-day">
                {day}
              </div>
            ))}
          </div>

          {/* Calendar days */}
          <div className="calendar-container__calendar-grid">
            {days.map((dayInfo, index) => {
              const dayEvents = getEventsForDate(dayInfo.date);
              const isCurrentDay = isToday(dayInfo.date);
              const hasUrgent = hasUrgentEvents(dayInfo.date);
              const hasEvents = hasAnyEvents(dayInfo.date);
              
              return (
                <div
                  key={index}
                  onClick={() => handleDateClick(dayInfo)}
                  className={`
                    calendar-container__calendar-day
                    ${!dayInfo.isCurrentMonth ? 'calendar-container__calendar-day--inactive' : ''}
                    ${isCurrentDay ? 'calendar-container__calendar-day--today' : ''}
                    ${hasUrgent ? 'calendar-container__calendar-day--urgent' : ''}
                    ${hasEvents ? 'calendar-container__calendar-day--has-events' : ''}
                    ${hasUrgent && animate ? 'pulse' : ''}
                  `}
                  style={{
                    cursor: hasEvents && dayInfo.isCurrentMonth ? 'pointer' : 'default'
                  }}
                >
                  <div className={`
                    calendar-container__calendar-day-number
                    ${isCurrentDay ? 'calendar-container__calendar-day-number--today' : ''}
                    ${!dayInfo.isCurrentMonth ? 'calendar-container__calendar-day-number--inactive' : ''}
                  `}>
                    <span>{dayInfo.day}</span>
                    {hasUrgent && (
                      <div className={`
                        calendar-container__calendar-day-urgent-indicator
                        ${animate ? 'animate' : ''}
                      `} />
                    )}
                  </div>
                  
                  {dayEvents.slice(0, 3).map((event) => (
                    <div
                      key={event.id}
                      className={`
                        calendar-container__calendar-day-event
                        calendar-container__calendar-day-event--${event.type}
                        calendar-container__calendar-day-event--${event.priority}
                      `}
                    >
                      {getPriorityIcon(event.priority)}
                      <span>{event.title}</span>
                    </div>
                  ))}
                  
                  {dayEvents.length > 3 && (
                    <div className="calendar-container__calendar-day-more">
                      +{dayEvents.length - 3} eventos más
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Panel Lateral de Eventos */}
        <div className="calendar-container__sidebar">
          {/* Eventos Urgentes */}
          <div className="calendar-container__urgent">
            <div className="calendar-container__urgent-header">
              <Bell size={24} />
              <h3>¡Eventos Próximos!</h3>
            </div>

            {urgentEvents.length > 0 ? urgentEvents.map((event) => (
              <div
                key={event.id}
                className={`
                  calendar-container__urgent-event
                  ${animate && event.daysUntil <= 1 ? 'pulse' : ''}
                `}
              >
                <div className="calendar-container__urgent-event-title">
                  {event.type === 'course' ? <BookOpen size={16} /> : <Calendar size={16} />}
                  <span>{event.title}</span>
                </div>
                <div className="calendar-container__urgent-event-date">
                  📅 {event.date.toLocaleDateString('es-ES', { weekday: 'short', month: 'short', day: 'numeric' })} • {event.time}
                </div>
                <div className="calendar-container__urgent-event-details">
                  <span>👥 {event.participants} personas</span>
                  {event.instructor && <span>👨‍🏫 {event.instructor}</span>}
                  {event.location && <span>📍 {event.location}</span>}
                </div>
                <div className={`
                  calendar-container__urgent-event-countdown
                  ${event.daysUntil <= 1 ? 'calendar-container__urgent-event-countdown--critical' : ''}
                `}>
                  {getDaysUntilText(event.daysUntil)}
                </div>
              </div>
            )) : (
              <div className="calendar-container__urgent-empty">
                No hay eventos urgentes próximos
              </div>
            )}
          </div>

          {/* Próximos Eventos */}
          <div className="calendar-container__upcoming">
            <div className="calendar-container__upcoming-header">
              <ArrowRight size={24} />
              <h3>Próximos 14 días</h3>
            </div>
            
            <div className="calendar-container__upcoming-list">
              {upcomingEvents.slice(0, 6).map((event) => (
                <div key={event.id} className="calendar-container__upcoming-item">
                  <div className="calendar-container__upcoming-item-date">
                    <span className="calendar-container__upcoming-item-day">
                      {event.date.getDate()}
                    </span>
                    <span className="calendar-container__upcoming-item-month">
                      {event.date.toLocaleDateString('es-ES', { month: 'short' })}
                    </span>
                  </div>
                  <div className="calendar-container__upcoming-item-info">
                    <div className="calendar-container__upcoming-item-title">
                      {event.type === 'course' ? '📚' : '📅'} {event.title}
                    </div>
                    <div className="calendar-container__upcoming-item-time">
                      🕒 {event.time} • {event.duration}
                    </div>
                  </div>
                  <div className={`
                    calendar-container__upcoming-item-priority
                    calendar-container__upcoming-item-priority--${event.priority}
                  `}>
                    {event.priority === 'urgent' ? '🔴' : 
                     event.priority === 'high' ? '🟠' : '🟡'}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Estadísticas */}
          <div className="calendar-container__stats">
            <div className="calendar-container__stats-header">
              <Star size={24} />
              <h3>Estadísticas</h3>
            </div>
            
            <div className="calendar-container__stats-grid">
              <div className="calendar-container__stats-item">
                <span className="calendar-container__stats-item-label">Total Eventos</span>
                <span className="calendar-container__stats-item-value">
                  {Object.values(events).flat().length}
                </span>
              </div>
              
              <div className="calendar-container__stats-item">
                <span className="calendar-container__stats-item-label">Cursos</span>
                <span className="calendar-container__stats-item-value">
                  {Object.values(events).flat().filter(e => e.type === 'course').length}
                </span>
              </div>
              
              <div className="calendar-container__stats-item">
                <span className="calendar-container__stats-item-label">Participantes</span>
                <span className="calendar-container__stats-item-value">
                  {Object.values(events).flat().reduce((sum, e) => sum + e.participants, 0)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal de Detalles del Día */}
      {showModal && selectedDate && (
        <div className="calendar-container__modal">
          <div className="calendar-container__modal-content">
            <div className="calendar-container__modal-header">
              <h3>
                📅 {selectedDate.toLocaleDateString('es-ES', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </h3>
              <button
                onClick={() => setShowModal(false)}
                className="calendar-container__modal-close"
              >
                ×
              </button>
            </div>

            <div className="calendar-container__modal-events">
              <h4 className="calendar-container__modal-events-title">
                <Eye size={20} />
                Eventos programados ({getEventsForDate(selectedDate).length})
              </h4>
              {getEventsForDate(selectedDate).map((event) => (
                <div
                  key={event.id}
                  className={`
                    calendar-container__modal-events-item
                    calendar-container__modal-events-item--${event.priority}
                  `}
                >
                  <div className="calendar-container__modal-events-item-header">
                    <div 
                      className="calendar-container__modal-events-item-header-icon"
                      style={{ 
                        backgroundColor: event.priority === 'urgent' ? '#FF4757' : 
                                        event.priority === 'high' ? '#FF6B35' : 
                                        event.priority === 'medium' ? '#48514A' : '#7B7A70'
                      }}
                    >
                      {event.type === 'course' ? 
                        <BookOpen size={16} color="white" /> : 
                        <Calendar size={16} color="white" />
                      }
                    </div>
                    <div className="calendar-container__modal-events-item-header-info">
                      <span className="calendar-container__modal-events-item-header-info-title">
                        {event.title}
                      </span>
                      <div className={`
                        calendar-container__modal-events-item-header-info-priority
                        calendar-container__modal-events-item-header-info-priority--${event.priority}
                      `}>
                        {getPriorityText(event.priority)}
                      </div>
                    </div>
                  </div>
                  <div className="calendar-container__modal-events-item-details">
                    <div className="calendar-container__modal-events-item-details-item">
                      <Clock size={14} />
                      <span>{event.time} • Duración: {event.duration}</span>
                    </div>
                    <div className="calendar-container__modal-events-item-details-item">
                      <Users size={14} />
                      <span>{event.participants} participantes confirmados</span>
                    </div>
                    {event.instructor && (
                      <div className="calendar-container__modal-events-item-details-item">
                        <BookOpen size={14} />
                        <span>Instructor: {event.instructor}</span>
                      </div>
                    )}
                    {event.location && (
                      <div className="calendar-container__modal-events-item-details-item">
                        <Calendar size={14} />
                        <span>Ubicación: {event.location}</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EventCalendar;