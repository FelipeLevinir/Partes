import { LayoutService } from '@/layout/service/layout.service';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FechaPipe } from '@/helpers/pipes/fecha.pipe';
import { ModalService } from '@/helpers/modal/service/modal.service';
import { ModalCuentaBancariaComponent } from './modal-cuenta-bancaria/modal-cuenta-bancaria.component';
import { ModalInformacionImportanteComponent } from './modal-informacion-importante/modal-informacion-importante.component';

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
      alt: 'Dress code'
    },
    {
      descripcion: 'Contigo, hasta lo más profundo se vuelve hermoso. Porque incluso entre peces y océanos, tú eres mi mundo.',
      imagen: 'assets/layout/images/2.jpeg',
      alt: 'Advertencia'
    },
    {
      descripcion: '"En cada rincón del mundo, mi sol eres tú. Y aún bajo el cielo más claro, tu amor es lo que más brilla.',
      imagen: 'assets/layout/images/3.jpeg',
      alt: 'Horario'
    }
  ];

  constructor(private readonly modalService: ModalService) {
  }

  ngOnInit() {
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

  
}
