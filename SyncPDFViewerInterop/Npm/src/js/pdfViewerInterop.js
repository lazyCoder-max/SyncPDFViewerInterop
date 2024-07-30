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
        pdfviewer = new PdfViewer({
            formFieldAdd: function (args) {
                dotNetInterop.invokeMethodAsync('OnFormFieldAdded', args);
            }
        });
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
export async function loadStream(base64String,documentType) {
    try {
        const element = document.getElementById('pdfViewer');
        if (!element) {
            console.error('pdfViewer element not found');
            return;
        }
        pdfviewer.resourceUrl = 'https://cdn.syncfusion.com/ej2/25.2.3/dist/ej2-pdfviewer-lib';
        pdfviewer.documentPath = 'data:' + documentType +';base64,' + base64String;
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
            
            if (signatureFormElement != null) {
                signatureFormElement.click();
                const signatureDialog = document.getElementById('pdfViewer_formfield_signature-popup');
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
            
            if (initialFormElement != null) {
                initialFormElement.click();
                const initialDialog = document.getElementById('pdfViewer_formfield_signature-popup');
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
export async function addCheckBoxField() {
    try {
        if (pdfviewer != null) {
            const checkbox = document.getElementById('pdfViewer_formdesigner_checkbox');
            if (checkbox != null) {
                checkbox.click();
            }
        }

    } catch (e) {
        console.error(e.message);
    }
}
export async function addRadioBoxField() {
    try {
        if (pdfviewer != null) {
            const radiobox = document.getElementById('pdfViewer_formdesigner_radiobutton');
            if (radiobox != null) {
                radiobox.click();
            }
        }

    } catch (e) {
        console.error(e.message);
    }
}
export async function addDropdownField() {
    try {
        if (pdfviewer != null) {
            const dropdown = document.getElementById('pdfViewer_formdesigner_dropdown');
            if (dropdown != null) {
                dropdown.click();
            }
        }

    } catch (e) {
        console.error(e.message);
    }
}
export async function addListboxField() {
    try {
        if (pdfviewer != null) {
            const listbox = document.getElementById('pdfViewer_formdesigner_listbox');
            if (listbox != null) {
                listbox.click();
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
                if (isDesignerMode == false && mode == true) {
                    pdfviewer.enableFormDesigner = true;
                    isDesignerMode = true;
                    addEditFormFieldButton.click();
                }
                else if (isDesignerMode == true && mode == false) {
                    addEditFormFieldButton.click();
                    isDesignerMode = false;
                }
            }
            
        }
    } catch (e) {

    }
}
export async function updateField(id, _name, _isReadOnly, _visibility, _isRequired, _isPrint, _tooltip) {
    try {
        if (pdfviewer != null) {
            var formField = pdfviewer.getFormFieldByID(id);
            pdfviewer.formDesignerModule.updateFormField(formField, {
                name: _name,
                isReadOnly: _isReadOnly,
                visibility: _visibility,
                isRequired: _isRequired,
                isPrint: _isPrint,
                tooltip: _tooltip,
                thickness: 1
            });
        }
    } catch (e) {

    }
    
}
document.addEventListener('DOMContentLoaded', (event) => {
    configure().then(() => {
        loadPDF('https://cdn.syncfusion.com/content/pdf/pdf-succinctly.pdf');
    });
});
