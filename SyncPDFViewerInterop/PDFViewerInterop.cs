using Microsoft.JSInterop;
using SyncPDFViewerInterop.Interfaces;
using SyncPDFViewerInterop.Models;
using System.Text.Json;

namespace SyncPDFViewerInterop
{
    public class PDFViewerInterop : IAsyncDisposable, IPDFViewerInterop
    {
        private readonly Lazy<Task<IJSObjectReference>> _moduleTask;
        private readonly DotNetObjectReference<PDFViewerInterop> _jsRef;
        private bool _configured;
        public event EventHandler<FormFieldArgs>? FormFieldAdded;
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
        public async Task LoadPDF(byte[] fileBytes,string documentType)
        {
            if (_configured)
            {
                var module = await _moduleTask.Value;
                var stream =  Convert.ToBase64String(fileBytes);
                await module.InvokeVoidAsync("loadStream", stream, documentType);
            }
        }
        public async Task AddSignatureField()
        {
            try
            {
                if (_configured)
                {
                    var module = await _moduleTask.Value;
                    await SetFormFieldMode(true);
                    await module.InvokeVoidAsync("addSignatureField", null);
                }
            }
            catch (Exception ex)
            {

                throw;
            }
        }
        public async Task AddInitialField()
        {
            try
            {
                if (_configured)
                {
                    var module = await _moduleTask.Value;
                    await SetFormFieldMode(true);
                    await module.InvokeVoidAsync("addInitialField", null);
                }
            }
            catch (Exception ex)
            {

                throw;
            }
        }
        public async Task AddTextBoxField()
        {
            try
            {
                if (_configured)
                {
                    var module = await _moduleTask.Value;
                    await SetFormFieldMode(true);
                    await module.InvokeVoidAsync("addTextBoxField", null);
                }
            }
            catch (Exception ex)
            {

                throw;
            }
        }
        public async Task AddCheckBoxField()
        {
            try
            {
                if (_configured)
                {
                    var module = await _moduleTask.Value;
                    await SetFormFieldMode(true);
                    await module.InvokeVoidAsync("addCheckBoxField", null);
                }
            }
            catch (Exception ex)
            {

                throw;
            }
        }
        public async Task AddRadioBoxField()
        {
            try
            {
                if (_configured)
                {
                    var module = await _moduleTask.Value;
                    await SetFormFieldMode(true);
                    await module.InvokeVoidAsync("addRadioBoxField", null);
                }
            }
            catch (Exception ex)
            {

                throw;
            }
        }
        public async Task AddDropdownField()
        {
            try
            {
                if (_configured)
                {
                    var module = await _moduleTask.Value;
                    await SetFormFieldMode(true);
                    await module.InvokeVoidAsync("addDropdownField", null);
                }
            }
            catch (Exception ex)
            {

                throw;
            }
        }
        public async Task AddListBoxField()
        {
            try
            {
                if (_configured)
                {
                    var module = await _moduleTask.Value;
                    await SetFormFieldMode(true);
                    await module.InvokeVoidAsync("addListboxField", null);
                }
            }
            catch (Exception ex)
            {

                throw;
            }
        }
        public async Task SetFormFieldMode(bool isEditMode)
        {
            try
            {
                if (_configured)
                {
                    var module = await _moduleTask.Value;
                    await module.InvokeVoidAsync("setFormFieldMode", isEditMode);
                }
            }
            catch (Exception ex)
            {

                throw;
            }
        }
        public async Task UpdateField(string id, string name, bool isReadOnly, bool visibility, bool isRequired, bool isPrint, string tooltip)
        {
            try
            {
                if (_configured)
                {
                    var module = await _moduleTask.Value;
                    await module.InvokeVoidAsync("updateField", id,name, isReadOnly, visibility, isRequired, isPrint, tooltip);
                }
            }
            catch (Exception ex)
            {

                throw;
            }
        }

        [JSInvokable]
        public  Task OnFormFieldAdded(object args)
        {
            var result  = JsonSerializer.Deserialize<FormFieldArgs>(args.ToString()!);
            return Task.CompletedTask;
        }
        private void RaiseFormFieldAdded(FormFieldArgs args)
        {
            FormFieldAdded?.Invoke(this, args);
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
