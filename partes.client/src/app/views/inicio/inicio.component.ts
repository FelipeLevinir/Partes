import { LayoutService } from '@/layout/service/layout.service';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FechaPipe } from '@/helpers/pipes/fecha.pipe';
import { ModalService } from '@/helpers/modal/service/modal.service';
import { ModalCuentaBancariaComponent } from './modal-cuenta-bancaria/modal-cuenta-bancaria.component';
import { ModalInformacionImportanteComponent } from './modal-informacion-importante/modal-informacion-importante.component';
import { EventoService, Evento } from '@/services/evento.service';
@Component({
  selector: 'app-inicio',
  imports: [CommonModule, FechaPipe],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.scss'
})
export class InicioComponent {

  fechaMatrimonio: Date = new Date('2026-02-21T00:00:00');
  
  noviaNombre: string = 'Angelina';
  novioNombre: string = 'Felipe';
   
  fraseInicio: string = '"Amar no es mirarse el uno al otro, es mirar juntos en la misma dirección."';
  
  fraseIntroductoria: string = 'Después de 8 maravillosos años juntos, hoy celebramos con alegría y emoción el próximo paso en nuestra historia. ¡Nos casamos!';

  meses: number = 0;
  dias: number = 0;
  horas: number = 0;
  minutos: number = 0;
  segundos: number = 0;

  private intervalo!: any;

  ceremoniaLugar: string = 'Santuario de Schoenstatt';
  ceremoniaDireccion: string = 'Zorobabel Rodríguez 300, Quillota, Valparaíso';
  recepcionLugar: string = 'Casona el Hechizo';
  recepcionDireccion: string = 'Cam. La Rinconada 2200, Villa Alemana, Valparaíso';

  horaLLegada : string = '16:00 hrs';
  horaCeremonia : string = '17:00 hrs';
  horaRecepcion : string = '18:00 hrs';
  horaCena : string = '20:00 hrs';
  horaFiesta : string = '22:00 hrs';
  terminoFiesta : string = '02:00 hrs';

  textoHistoria : string = `Nuestra historia comenzó hace más de 8 años, cuando nos conocimos en una fonda durante las fiestas patrias gracias a unos amigos en común. Desde ese momento, nuestras vidas se entrelazaron y descubrimos una conexión especial que nos llevó a compartir momentos inolvidables juntos. A lo largo de los años, hemos crecido como pareja, enfrentando desafíos y celebrando triunfos, siempre apoyándonos mutuamente. Hoy, estamos emocionados de dar el siguiente paso en nuestra historia y celebrar nuestro amor con todos ustedes.`;

  elementos = [
    {
      descripcion: 'Tu sonrisa es mi lugar favorito y tu abrazo, mi paz',
      imagen: 'assets/layout/images/1.jpeg',
      alt: 'Dress code',
      mostrar: false
    },
    {
      descripcion: 'Contigo, hasta lo más profundo se vuelve hermoso. Porque incluso entre peces y océanos, tú eres mi mundo.',
      imagen: 'assets/layout/images/2.jpeg',
      alt: 'Advertencia',
      mostrar: false
    },
    {
      descripcion: '"En cada rincón del mundo, mi sol eres tú. Y aún bajo el cielo más claro, tu amor es lo que más brilla.',
      imagen: 'assets/layout/images/3.jpeg',
      alt: 'Horario',
      mostrar: false
    },
    {
      descripcion: 'Nuestro amor es un brindis a la vida, a los sueños compartidos y a cada momento juntos.',
      imagen: 'assets/layout/images/4.jpeg',
      alt: 'Brindis en pareja',
      mostrar: false
    },
    {
      descripcion: 'Tus besos son promesas de aventuras, tu compañía el hogar más bonito.',
      imagen: 'assets/layout/images/5.jpeg',
      alt: 'Besito bajo el sol',
      mostrar: false
    },
    {
      descripcion: 'Entre palmeras y carcajadas, siempre encuentro mi felicidad en ti.',
      imagen: 'assets/layout/images/6.jpeg',
      alt: 'Diversión tropical',
      mostrar: false
    },
    {
      descripcion: 'Juntos, formamos el equipo perfecto. Y nuestro amor, el motor que mueve todo.',
      imagen: 'assets/layout/images/7.jpeg',
      alt: 'En la piscina con nuestro perrito',
      mostrar: false
    },
    {
      descripcion: 'El amor florece cuando estamos juntos, incluso en las alturas.',
      imagen: 'assets/layout/images/8.jpeg',
      alt: 'Mirador de flores',
      mostrar: false
    },
    {
      descripcion: 'Vestidos de elegancia, pero con el corazón repleto de amor y complicidad.',
      imagen: 'assets/layout/images/9.jpeg',
      alt: 'Elegancia en ascensor',
      mostrar: false
    },
    {
      descripcion: 'Un brindis por nosotros, por los momentos simples que se convierten en recuerdos eternos.',
      imagen: 'assets/layout/images/10.jpeg',
      alt: 'Brindando cerveza',
      mostrar: false
    },
    {
      descripcion: 'Bajo el sol y rodeados de naturaleza, nuestro amor sigue creciendo con cada aventura.',
      imagen: 'assets/layout/images/11.jpeg',
      alt: 'Día al aire libre',
      mostrar: false
    },
    {
      descripcion: 'Ese instante en que dijiste “sí” será por siempre mi favorito.',
      imagen: 'assets/layout/images/12.jpeg',
      alt: 'Compromiso en la playa',
      mostrar: false
    },
    {
      descripcion: 'El mar puede estar agitado, pero contigo todo es calma.',
      imagen: 'assets/layout/images/13.jpeg',
      alt: 'Paseo costero',
      mostrar: false
    },
    {
      descripcion: 'En cada beso, sellamos una historia que solo tú y yo entendemos.',
      imagen: 'assets/layout/images/14.jpeg',
      alt: 'Beso en la playa',
      mostrar: false
    },
    {
      descripcion: 'Tu abrazo es mi refugio, incluso bajo el cielo estrellado.',
      imagen: 'assets/layout/images/15.jpeg',
      alt: 'Piscina nocturna',
      mostrar: false
    },
    {
      descripcion: 'Contigo, hasta el universo nos queda chico. ¡Somos cósmicamente perfectos!',
      imagen: 'assets/layout/images/16.jpeg',
      alt: 'Aliens enamorados',
      mostrar: false
    },
    {
      descripcion: 'No importa el lugar, si estoy contigo, estoy en casa.',
      imagen: 'assets/layout/images/17.jpeg',
      alt: 'Atardecer en la plaza',
      mostrar: false
    }
  ];
    
  eventos: Evento[] | undefined;

  constructor(private readonly modalService: ModalService, private readonly layoutService: LayoutService, private readonly eventoService: EventoService) {}

  ngOnInit() {

    this.eventoService.getEvento().subscribe(data => {
      this.eventos = data;
      console.log('Datos desde la API:', this.eventos);
    });

    this.iniciarCuentaRegresiva();
  }

  ngOnDestroy(): void {
    clearInterval(this.intervalo); 
  }

  iniciarCuentaRegresiva(): void {
    this.actualizarTiempoRestante(); 

    this.intervalo = setInterval(() => {
      this.actualizarTiempoRestante();
    }, 1000);
  }

  private actualizarTiempoRestante(): void {
    const ahora = new Date().getTime();
    const destino = this.fechaMatrimonio.getTime();
    let diferencia = destino - ahora;

    if (diferencia <= 0) {
      this.meses = this.dias = this.horas = this.minutos = this.segundos = 0;
      clearInterval(this.intervalo);
      return;
    }

    const segundosTotales = Math.floor(diferencia / 1000);
    const minutosTotales = Math.floor(segundosTotales / 60);
    const horasTotales = Math.floor(minutosTotales / 60);
    const diasTotales = Math.floor(horasTotales / 24);
    const mesesAproximados = Math.floor(diasTotales / 30); 

    this.meses = mesesAproximados;
    this.dias = diasTotales % 30;
    this.horas = horasTotales % 24;
    this.minutos = minutosTotales % 60;
    this.segundos = segundosTotales % 60;
  }

  OpenWaze(direccion: string) {
    const url = `https://waze.com/ul?q=${encodeURIComponent(direccion)}&navigate=yes`;
    window.open(url, '_blank');
  }
  
  OpenGoogleMaps(direccion: string) {
    const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(direccion)}`;
    window.open(url, '_blank');
  }

  abrirPlaylist() {
    const url = 'https://open.spotify.com/playlist/19wzpyFd3a6ySZNeWmhrs1?si=0vbH9JMaRfSZ2W8zgTJl5w&pi=G8bls_8iRKqos&pt=375df977013cffa7f499eca04c84a8e3';
    window.open(url, '_blank');
  }
  
  OpenCuentaBancaria() {
    this.modalService.show(ModalCuentaBancariaComponent, '', 'modal h-[500px]', (result) => {  })
  }

  OpenInformacionImportante() {
    this.modalService.show(ModalInformacionImportanteComponent, '', 'modal h-[500px]', (result) => {  })
  }

  NavegarListaRegalos() {
  }

  NavegarListaAsistentes() {
    const url = 'https://forms.gle/u26arbNjtzweHr7c6';
    window.open(url, '_blank');
  }

  toggleTexto(index: number, event: Event): void {
    event.preventDefault();
    event.stopPropagation();
    
    this.elementos = this.elementos.map((item, i) => ({
      ...item,
      mostrar: i === index ? !item.mostrar : false
    }));
  }
  
}
