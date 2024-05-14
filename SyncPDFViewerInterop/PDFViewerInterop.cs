using Microsoft.JSInterop;
using SyncPDFViewerInterop.Interfaces;
using System.Text.Json;

namespace SyncPDFViewerInterop
{
    public class PDFViewerInterop : IAsyncDisposable, IPDFViewerInterop
    {
        private readonly Lazy<Task<IJSObjectReference>> _moduleTask;
        private readonly DotNetObjectReference<PDFViewerInterop> _jsRef;
        private bool _configured;

        public PDFViewerInterop(IJSRuntime jsRuntime)
        {
            _moduleTask = new(() => jsRuntime.InvokeAsync<IJSObjectReference>("import",
               "./_content/SyncPDFViewerInterop/js/pdfViewerInterop.bundle.js").AsTask());
            _jsRef = DotNetObjectReference.Create(this);
        }

        public async Task Configure()
        {
            if (!_configured)
            {
                var module = await _moduleTask.Value;
                await module.InvokeVoidAsync("configure", _jsRef);
                _configured = true;
            }
        }
        public async Task LoadPDF(string sourceUrl)
        {
            if (_configured)
            {
                var module = await _moduleTask.Value;
                await module.InvokeVoidAsync("loadPDF", sourceUrl);
            }
        }
        public async ValueTask DisposeAsync()
        {
            if (_moduleTask.IsValueCreated)
            {
                var module = await _moduleTask.Value;
                await module.DisposeAsync();
            }
        }
    }
}
