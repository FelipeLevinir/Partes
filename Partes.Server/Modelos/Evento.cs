namespace Partes.Server.Modelos
{
    public class Evento
    {
        public string Id { get; set; }  // puede ser ObjectId como string
        public string CeremoniaLugar { get; set; }
        public string CeremoniaDireccion { get; set; }
        public string RecepcionLugar { get; set; }
        public string RecepcionDireccion { get; set; }
        public string HoraLlegada { get; set; }
        public string HoraCeremonia { get; set; }
        public string HoraRecepcion { get; set; }
        public string HoraCena { get; set; }
        public string HoraFiesta { get; set; }
        public string TerminoFiesta { get; set; }
    }

}
