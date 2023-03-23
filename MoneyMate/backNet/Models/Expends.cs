using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace backNet.Models
{
    public class Expends
    {

        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public string Type { get; set; }
        public int Amount { get; set; }
        public string? Date { get; set; } //Campo que puede quedar vacío y llevar nulos, los otros 3 son obligatorios.

        //private string User {get; set;} ->  Habría que mirar de hacer un login
    }
}
