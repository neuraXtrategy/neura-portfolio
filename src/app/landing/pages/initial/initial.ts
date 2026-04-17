import { Component, signal, HostListener, computed, afterNextRender } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-initial',
  imports: [CommonModule],
  templateUrl: './initial.html',
  styleUrl: './initial.css',
})
export class Initial {
  isScrolled = signal(false);
  activeSection = signal('hero');
  mobileMenuOpen = signal(false);
  formSent = signal(false);
  currentYear = new Date().getFullYear();

  navItems = [
    { id: 'servicios', label: 'Servicios' },
    { id: 'proceso', label: 'Proceso' },
    { id: 'proyectos', label: 'Proyectos' },
    { id: 'referencias', label: 'Referencias' },
  ];

  stats = [
    { value: '+50', label: 'Proyectos entregados' },
    { value: '98%', label: 'Satisfacción de clientes' },
    { value: '+5', label: 'Años de experiencia' },
    { value: '24h', label: 'Tiempo de respuesta' },
  ];

  services = [
    {
      title: 'Desarrollo Web a Medida',
      description:
        'Aplicaciones web de alto rendimiento con arquitecturas modernas, escalables y orientadas a resultados de negocio.',
      icon: `<svg width="32" height="32" fill="none" stroke="#F97316" stroke-width="1.5" viewBox="0 0 24 24"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/><path d="M7 8l3 3-3 3" stroke-linecap="round" stroke-linejoin="round"/><path d="M13 14h3" stroke-linecap="round"/></svg>`,
      tags: ['React', 'Angular', 'Next.js', 'Node.js'],
    },
    {
      title: 'Aplicaciones Móviles',
      description:
        'Apps nativas e híbridas para iOS y Android con experiencias de usuario excepcionales y rendimiento nativo.',
      icon: `<svg width="32" height="32" fill="none" stroke="#F97316" stroke-width="1.5" viewBox="0 0 24 24"><rect x="5" y="2" width="14" height="20" rx="2"/><path d="M12 18h.01" stroke-linecap="round" stroke-linejoin="round"/><path d="M9 6h6" stroke-linecap="round"/></svg>`,
      tags: ['React Native', 'Flutter', 'iOS', 'Android'],
    },
    {
      title: 'Backend & APIs',
      description:
        'Arquitecturas de microservicios, APIs RESTful y GraphQL robustas que soportan millones de transacciones.',
      icon: `<svg width="32" height="32" fill="none" stroke="#F97316" stroke-width="1.5" viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7" stroke-linecap="round" stroke-linejoin="round"/><circle cx="12" cy="12" r="10"/></svg>`,
      tags: ['Node.js', 'Python', 'PostgreSQL', 'Docker'],
    },
    {
      title: 'Cloud & DevOps',
      description:
        'Infraestructura cloud resiliente, pipelines CI/CD automatizadas y monitorización continua para entregas ágiles.',
      icon: `<svg width="32" height="32" fill="none" stroke="#F97316" stroke-width="1.5" viewBox="0 0 24 24"><path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
      tags: ['AWS', 'GCP', 'Kubernetes', 'Terraform'],
    },
    {
      title: 'Inteligencia Artificial',
      description:
        'Integración de modelos de IA, chatbots conversacionales, automatización inteligente y análisis predictivo.',
      icon: `<svg width="32" height="32" fill="none" stroke="#F97316" stroke-width="1.5" viewBox="0 0 24 24"><path d="M12 2a5 5 0 0 1 5 5v3a5 5 0 0 1-10 0V7a5 5 0 0 1 5-5z" stroke-linecap="round"/><path d="M12 15v7M8 18h8" stroke-linecap="round"/><path d="M7 10H5a2 2 0 0 0-2 2v1a2 2 0 0 0 2 2h2M17 10h2a2 2 0 0 1 2 2v1a2 2 0 0 1-2 2h-2" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
      tags: ['OpenAI', 'LangChain', 'TensorFlow', 'LLMs'],
    },
    {
      title: 'Consultoría Técnica',
      description:
        'Auditoría de código, definición de arquitectura, revisión de performance y roadmap tecnológico estratégico.',
      icon: `<svg width="32" height="32" fill="none" stroke="#F97316" stroke-width="1.5" viewBox="0 0 24 24"><path d="M9 12l2 2 4-4" stroke-linecap="round" stroke-linejoin="round"/><path d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0z"/></svg>`,
      tags: ['Auditoría', 'Arquitectura', 'Performance', 'Roadmap'],
    },
  ];

  processSteps = [
    {
      number: '01',
      title: 'Descubrimiento',
      description:
        'Analizamos tu negocio, objetivos y requerimientos técnicos para definir la solución óptima.',
      icon: `<svg width="28" height="28" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35" stroke-linecap="round"/></svg>`,
    },
    {
      number: '02',
      title: 'Diseño & Planificación',
      description:
        'Arquitectura del sistema, wireframes y plan de desarrollo con hitos claros y entregables definidos.',
      icon: `<svg width="28" height="28" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path d="M12 20h9M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
    },
    {
      number: '03',
      title: 'Desarrollo',
      description:
        'Sprints ágiles con entregas incrementales, revisiones constantes y comunicación transparente.',
      icon: `<svg width="28" height="28" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path d="M16 18l2-2-2-2M8 18l-2-2 2-2M10 9l4 6" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
    },
    {
      number: '04',
      title: 'Lanzamiento & Soporte',
      description:
        'Deploy en producción, monitoreo activo, optimización continua y soporte post-lanzamiento.',
      icon: `<svg width="28" height="28" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
    },
  ];

  projects = [
    {
      title: 'EcoPlatform SaaS',
      category: 'SaaS',
      description:
        'Plataforma de gestión de sostenibilidad con dashboards en tiempo real, reportes automáticos y análisis de huella de carbono.',
      emoji: '🌿',
      gradient: 'linear-gradient(135deg, #064e3b 0%, #065f46 100%)',
      tech: ['Next.js', 'Node.js', 'PostgreSQL', 'AWS'],
    },
    {
      title: 'FinTrack Pro',
      category: 'Fintech',
      description:
        'App de gestión financiera empresarial con IA para predicciones de flujo de caja, alertas inteligentes y reportes regulatorios.',
      emoji: '📈',
      gradient: 'linear-gradient(135deg, #1e3a5f 0%, #1e40af 100%)',
      tech: ['React Native', 'Python', 'ML', 'Firebase'],
    },
    {
      title: 'MediConnect',
      category: 'HealthTech',
      description:
        'Sistema de telemedicina con videoconsultas, gestión de citas, historia clínica digital y recetas electrónicas.',
      emoji: '🏥',
      gradient: 'linear-gradient(135deg, #4c0519 0%, #881337 100%)',
      tech: ['Angular', 'WebRTC', 'Django', 'GCP'],
    },
    {
      title: 'LogisticAI',
      category: 'Logística',
      description:
        'Optimización de rutas con IA, tracking en tiempo real de flota, gestión de inventario y predicción de demanda.',
      emoji: '🚛',
      gradient: 'linear-gradient(135deg, #431407 0%, #9a3412 100%)',
      tech: ['Vue.js', 'FastAPI', 'TensorFlow', 'Docker'],
    },
    {
      title: 'Eduverse LMS',
      category: 'EdTech',
      description:
        'Plataforma de aprendizaje con cursos interactivos, gamificación, seguimiento de progreso y certificados blockchain.',
      emoji: '🎓',
      gradient: 'linear-gradient(135deg, #3b0764 0%, #6d28d9 100%)',
      tech: ['React', 'Strapi', 'Solidity', 'Redis'],
    },
    {
      title: 'RetailOS',
      category: 'E-commerce',
      description:
        'Sistema POS omnicanal con inventory management, CRM integrado, analytics avanzados y marketplace propio.',
      emoji: '🛍️',
      gradient: 'linear-gradient(135deg, #172554 0%, #1d4ed8 100%)',
      tech: ['Angular', 'Microservicios', 'Kafka', 'K8s'],
    },
  ];

  allTechs = [
    { name: 'Angular', emoji: '🅰️' },
    { name: 'React', emoji: '⚛️' },
    { name: 'Next.js', emoji: '▲' },
    { name: 'Vue.js', emoji: '💚' },
    { name: 'Node.js', emoji: '🟩' },
    { name: 'Python', emoji: '🐍' },
    { name: 'TypeScript', emoji: '🔷' },
    { name: 'PostgreSQL', emoji: '🐘' },
    { name: 'MongoDB', emoji: '🍃' },
    { name: 'Docker', emoji: '🐳' },
    { name: 'Kubernetes', emoji: '☸️' },
    { name: 'AWS', emoji: '☁️' },
    { name: 'GCP', emoji: '🌐' },
    { name: 'TensorFlow', emoji: '🧠' },
    { name: 'Flutter', emoji: '🦋' },
    { name: 'Redis', emoji: '🔴' },
  ];

  testimonials = [
    {
      quote:
        'NeuraXtrategy transformó completamente nuestra operación. Entregaron una plataforma SaaS robusta y escalable en tiempo récord. El nivel técnico del equipo es excepcional.',
      author: 'Carlos Mendoza',
      role: 'CTO — EcoPlatform',
      initials: 'CM',
      avatarGradient: 'linear-gradient(135deg, #f97316, #ea580c)',
    },
    {
      quote:
        'La comunicación fue impecable durante todo el proyecto. Superaron nuestras expectativas tanto en calidad como en los tiempos de entrega. Los recomiendo 100%.',
      author: 'Ana Rodríguez',
      role: 'CEO — MediConnect',
      initials: 'AR',
      avatarGradient: 'linear-gradient(135deg, #8b5cf6, #6d28d9)',
    },
    {
      quote:
        'Tienen una capacidad única de entender el negocio y traducirlo en código. La integración de IA en nuestro sistema de logística fue una decisión que nos diferenció del mercado.',
      author: 'Roberto Vega',
      role: 'Director de Ops — LogisticAI',
      initials: 'RV',
      avatarGradient: 'linear-gradient(135deg, #06b6d4, #0891b2)',
    },
  ];

  contactInfo = [
    {
      label: 'Email',
      value: 'info@neuraxstrategy.com',
      icon: `<svg width="20" height="20" fill="none" stroke="#F97316" stroke-width="1.5" viewBox="0 0 24 24"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" stroke-linecap="round" stroke-linejoin="round"/><polyline points="22,6 12,13 2,6" stroke-linecap="round"/></svg>`,
    },
    {
      label: 'WhatsApp',
      value: '+595 300 000 0000',
      icon: `<svg width="20" height="20" fill="none" stroke="#F97316" stroke-width="1.5" viewBox="0 0 24 24"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.41 2 2 0 0 1 3.6 1.24h3a2 2 0 0 1 2 1.72 13 13 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 8.77a16 16 0 0 0 7.32 7.32l.95-.97a2 2 0 0 1 2.11-.45 13 13 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
    },
    {
      label: 'Ubicación',
      value: 'Ecuador · Trabajo Remoto Global',
      icon: `<svg width="20" height="20" fill="none" stroke="#F97316" stroke-width="1.5" viewBox="0 0 24 24"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" stroke-linecap="round" stroke-linejoin="round"/><circle cx="12" cy="10" r="3"/></svg>`,
    },
  ];

  socials = [
    {
      name: 'LinkedIn',
      url: 'https://linkedin.com',
      icon: `<svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>`,
    },
    {
      name: 'GitHub',
      url: 'https://github.com',
      icon: `<svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0a12 12 0 0 0-3.794 23.394c.6.111.82-.26.82-.577v-2.234c-3.338.726-4.042-1.61-4.042-1.61-.546-1.385-1.333-1.754-1.333-1.754-1.089-.744.083-.729.083-.729 1.204.085 1.838 1.236 1.838 1.236 1.07 1.835 2.807 1.305 3.492.998.108-.775.418-1.305.762-1.605-2.665-.303-5.467-1.333-5.467-5.931 0-1.31.469-2.381 1.236-3.221-.124-.304-.536-1.524.117-3.176 0 0 1.008-.322 3.302 1.23a11.51 11.51 0 0 1 3.004-.404c1.02.005 2.047.138 3.004.404 2.29-1.552 3.297-1.23 3.297-1.23.655 1.652.243 2.872.12 3.176.77.84 1.233 1.911 1.233 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .32.216.694.824.576A12.001 12.001 0 0 0 12 0z"/></svg>`,
    },
    {
      name: 'Instagram',
      url: 'https://instagram.com',
      icon: `<svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/></svg>`,
    },
  ];

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.isScrolled.set(window.scrollY > 50);
    this.updateActiveSection();
  }

  private updateActiveSection() {
    const sectionIds = ['hero', 'servicios', 'proceso', 'proyectos', 'referencias', 'contacto'];
    for (const id of [...sectionIds].reverse()) {
      const el = document.getElementById(id);
      if (el && el.getBoundingClientRect().top <= 100) {
        this.activeSection.set(id);
        return;
      }
    }
    this.activeSection.set('hero');
  }

  scrollTo(id: string, event: Event) {
    event.preventDefault();
    this.mobileMenuOpen.set(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  toggleMobileMenu() {
    this.mobileMenuOpen.update((v) => !v);
  }

  onSubmit(event: Event) {
    event.preventDefault();
    this.formSent.set(true);
    setTimeout(() => this.formSent.set(false), 4000);
  }
}
