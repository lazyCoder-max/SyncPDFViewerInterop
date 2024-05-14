using Microsoft.AspNetCore.Components;

namespace SyncPDFViewerInterop.Components
{
    public partial class PDFViewer
    {
        /// <summary>
        /// Width Percentage Maximum=100
        /// </summary>
        [Parameter]
        public int Width { get; set; } = 100;
        /// <summary>
        /// Height in pixel
        /// </summary>
        [Parameter]
        public int Height { get; set; } = 580;
    }
}
