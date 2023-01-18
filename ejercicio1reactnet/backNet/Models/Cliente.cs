namespace backNet.Models
{
    public class Cliente
    {
        public int Id { get; set; }
        public string Nombre { get; set; }
        public string email { get; set; }

        public Cliente(int Id, string Nombre, string email)
        {
            this.Id = Id;
            this.Nombre = Nombre;
            this.email = email;
        }
    }
}
