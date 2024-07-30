namespace SyncPDFViewerInterop.Models
{

    public class FormFieldArgs
    {
        public string? name { get; set; }
        public Field? field { get; set; }
        public int pageIndex { get; set; }
    }

    public class Field
    {
        public string? name { get; set; }
        public string? id { get; set; }
        public string? value { get; set; }
        public string? fontFamily { get; set; }
        public int? fontSize { get; set; }
        public string? fontStyle { get; set; }
        public string? color { get; set; }
        public string? backgroundColor { get; set; }
        public string? alignment { get; set; }
        public bool isReadonly { get; set; }
        public string? visibility { get; set; }
        public int? maxLength { get; set; }
        public bool isRequired { get; set; }
        public bool isPrint { get; set; }
        public int? rotation { get; set; }
        public string? tooltip { get; set; }
        public string? borderColor { get; set; }
        public int thickness { get; set; }
        public string? options { get; set; }
        public int? pageNumber { get; set; }
        public bool isChecked { get; set; }
        public bool isSelected { get; set; }
    }

}
