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
        ValueTask DisposeAsync();
    }
}