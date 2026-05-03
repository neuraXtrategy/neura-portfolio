import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ContactServiceHttp } from '../../services/contact-http';
import { FormBuilder, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';

interface ContactFormFields {
  company: FormControl<string | null>;
  email: FormControl<string>;
  name: FormControl<string>;
  phone: FormControl<string | null>;
  projectDescription: FormControl<string>;
  service: FormControl<string | null>;
}

@Component({
  selector: 'app-contact-form',
  imports: [ReactiveFormsModule],
  templateUrl: './contact-form.html',
  styles: ``,
  host: {
    class: 'md:col-span-3 space-y-4',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactForm {
  private readonly contactHttpService = inject(ContactServiceHttp);
  private readonly fb = inject(FormBuilder);

  contactForm = this.fb.group<ContactFormFields>({
    company: new FormControl<string | null>(null),
    email: new FormControl<string>('', { nonNullable: true, validators: [Validators.email] }),
    name: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(2)],
    }),
    phone: new FormControl<string | null>(null),
    projectDescription: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(10)],
    }),
    service: new FormControl<string | null>(null),
  });

  onSubmit() {
    this.contactForm.markAllAsTouched();
    
    if (this.contactForm.valid) {
      this.contactHttpService.saveContactForm(this.contactForm.getRawValue()).subscribe({
        next: () => {
          alert('Formulario enviado exitosamente. Nos pondremos en contacto contigo pronto.');
        },
        error: (error) => {
          alert('Error enviando formulario. El equipo de soporte ha sido notificado.');
          console.error('Error enviando formulario', error);
        }
      });
    }
  }


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
}
