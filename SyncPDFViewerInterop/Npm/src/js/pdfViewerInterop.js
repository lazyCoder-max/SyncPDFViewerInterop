import { PdfViewer, Toolbar, Magnification, Navigation, Annotation, LinkAnnotation, ThumbnailView, BookmarkView, TextSelection, TextSearch, FormFields, FormDesigner } from '@syncfusion/ej2-pdfviewer';

// Assuming PageOrganizer is a valid import from '@syncfusion/ej2-pdfviewer'
import { PageOrganizer } from '@syncfusion/ej2-pdfviewer';

let configured = false;
let pdfviewer;
let isDesignerMode = false;
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
export async function addSignatureField() {
    try {
        if (pdfviewer != null) {
            const signatureFormElement = document.getElementById('pdfViewer_formfield_signature');
            const signatureDialog = document.getElementById('pdfViewer_formfield_signature-popup');
            if (signatureFormElement != null) {
                signatureFormElement.click();
                
                if (signatureDialog != null) {
                    const signatureDrawButton = signatureDialog.firstElementChild.firstElementChild.firstElementChild;
                    if (signatureDrawButton != null) {
                        signatureDrawButton.click();
                    }
                }
            }
        }
        
    } catch (e) {
        console.error(e.message);
    }
}
export async function addInitialField() {
    try {
        if (pdfviewer != null) {
            const initialFormElement = document.getElementById('pdfViewer_formfield_signature');
            const initialDialog = document.getElementById('pdfViewer_formfield_signature-popup');
            if (initialFormElement != null) {
                initialFormElement.click();

                if (initialDialog != null) {
                    const initialDrawButton = initialDialog.lastElementChild.lastElementChild.firstElementChild;
                    if (initialDrawButton != null) {
                        initialDrawButton.click();
                    }
                }
            }
        }

    } catch (e) {
        console.error(e.message);
    }
}
export async function addTextBoxField() {
    try {
        if (pdfviewer != null) {
            const textboxFormButton = document.getElementById('pdfViewer_formdesigner_textbox');
            if (textboxFormButton != null) {
                textboxFormButton.click();
            }
        }

    } catch (e) {
        console.error(e.message);
    }
}
export async function setFormFieldMode(mode) {
    try {
        if (pdfviewer != null) {
            const addEditFormFieldButton = document.getElementById('pdfViewer_formdesigner');
            if (addEditFormFieldButton != null) {
                if (mode) {
                    pdfviewer.enableFormDesigner = true;
                    isDesignerMode = true;
                    addEditFormFieldButton.click();
                }
                else {
                    addEditFormFieldButton.click();
                    isDesignerMode = false;
                }
            }
            
        }
    } catch (e) {

    }
}
document.addEventListener('DOMContentLoaded', (event) => {
    configure().then(() => {
        loadPDF('https://cdn.syncfusion.com/content/pdf/pdf-succinctly.pdf');
    });
});
