namespace backNet.Models
{
    public class Expends
    {
        public int Id { get; set; }

        public int Expend { get; set; }

        public string Type { get; set; }

        public string? Comment { get; set; } //Campo que puede quedar vacío y llevar nulos, los otros 3 son obligatorios.

        //private string User {get; set;} ->  Habría que mirar de hacer un login
    }
}
