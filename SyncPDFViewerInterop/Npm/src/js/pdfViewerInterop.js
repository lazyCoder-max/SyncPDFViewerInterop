import { PdfViewer, Toolbar, Magnification, Navigation, Annotation, LinkAnnotation, ThumbnailView, BookmarkView, TextSelection, TextSearch, FormFields, FormDesigner } from '@syncfusion/ej2-pdfviewer';

let configured = false;
let pdfviewer;
function getErrorResponse(e) {
    let response = {
        result: null,
        error: e.reason ?? e.message ?? e,
        success: false
    }
    return JSON.stringify(response);
}
function getSuccessResponse(result) {
    let response = {
        result: result,
        error: null,
        success: true
    };
    return JSON.stringify(response);
}

export async function configure(dotNetInterop)
{
    if (configured) {
        return;
    }
    try {
        PdfViewer.Inject(Toolbar, Magnification, Navigation, Annotation, LinkAnnotation, ThumbnailView,
            BookmarkView, TextSelection, TextSearch, FormFields, FormDesigner, PageOrganizer);

        pdfviewer = new PdfViewer();
        configured = true;
    } catch (e) {
        console.log(e.message);
    }
}

export async function loadPDF(sourceUrl) {
    pdfviewer.serviceUrl = '';
    pdfviewer.documentPath = sourceUrl;
    pdfviewer.dataBind()
    pdfviewer.load(pdfviewer.documentPath, null);
    pdfviewer.appendTo('#pdfViewer');
}