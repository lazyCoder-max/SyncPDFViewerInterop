import { PdfViewer, Toolbar, Magnification, Navigation, Annotation, LinkAnnotation, ThumbnailView, BookmarkView, TextSelection, TextSearch, FormFields, FormDesigner } from '@syncfusion/ej2-pdfviewer';

// Assuming PageOrganizer is a valid import from '@syncfusion/ej2-pdfviewer'
import { PageOrganizer } from '@syncfusion/ej2-pdfviewer';

let configured = false;
let pdfviewer;
function getErrorResponse(e) {
    let response = {
        result: null,
        error: e.reason ?? e.message ?? e,
        success: false
    };
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

export async function configure(dotNetInterop) {
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
    try {
        const element = document.getElementById('pdfViewer');
        if (!element) {
            console.error('pdfViewer element not found');
            return;
        }
        pdfviewer.resourceUrl = 'https://cdn.syncfusion.com/ej2/25.2.3/dist/ej2-pdfviewer-lib';
        pdfviewer.documentPath = sourceUrl;
        pdfviewer.dataBind();
        pdfviewer.appendTo(element);
    } catch (e) {
        console.log(e.message);
    }
}
document.addEventListener('DOMContentLoaded', (event) => {
    configure().then(() => {
        loadPDF('https://cdn.syncfusion.com/content/pdf/pdf-succinctly.pdf');
    });
});
