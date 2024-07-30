using SyncPDFViewerInterop.Models;

namespace SyncPDFViewerInterop.Interfaces
{
    public interface IPDFViewerInterop
    {


        /// <summary>
        /// Configures The PDFViewer component - loading in the required JS library and setting it up
        /// </summary>
        /// <returns></returns>
        Task Configure();

        /// <summary>
        /// Programatically load a PDF Document into the PDFViewer component
        /// </summary>
        /// <param name="sourceUrl"></param>
        /// <returns></returns>
        Task LoadPDF(string sourceUrl);

        /// <summary>
        /// Programatically load a PDF Document into the PDFViewer component
        /// </summary>
        /// <param name="fileBytes"></param>
        /// <param name="documentType"></param> <example>documentType="application/pdf"</example>
        /// <returns></returns>
        Task LoadPDF(byte[] fileBytes, string documentType);
        /// <summary>
        /// Add Signature Field Form for the PDF Viewer
        /// </summary>
        /// <returns></returns>
        Task AddSignatureField();
        /// <summary>
        /// Add Text Box Field for the PDF Viewer
        /// </summary>
        /// <returns></returns>
        Task AddTextBoxField();
       /// <summary>
       /// Add Checkbox Field for the PDF Viewer
       /// </summary>
       /// <returns></returns>
        Task AddCheckBoxField();
        /// <summary>
        /// Add Radiobox Field for the PDF Viewer
        /// </summary>
        /// <returns></returns>
        Task AddRadioBoxField();
        /// <summary>
        /// Add Dropdown Field for the PDF Viewer
        /// </summary>
        /// <returns></returns>
        Task AddDropdownField();
        /// <summary>
        /// Add Initial Field for the PDF Viewer
        /// </summary>
        /// <returns></returns>

        Task AddInitialField();
        /// <summary>
        /// Add ListBox Field for th PDF Viewer
        /// </summary>
        /// <returns></returns>
        Task AddListBoxField();
        /// <summary>
        /// Change the PDF viewer From Designer to Reader Mode or vise versa
        /// </summary>
        /// <param name="isEditMode"></param>
        /// <returns></returns>
        Task SetFormFieldMode(bool isEditMode);
        /// <summary>
        /// Update Field
        /// </summary>
        /// <returns></returns>
        Task UpdateField(string id, string name, bool isReadOnly, bool visibility, bool isRequired, bool isPrint, string tooltip);

        /// <summary>
        /// Triggers when form field is added
        /// </summary>
        event EventHandler<FormFieldArgs>? FormFieldAdded;
        ValueTask DisposeAsync();
    }
}