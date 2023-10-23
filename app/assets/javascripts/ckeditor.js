//= require upload-adapter

function onBodyLoaded() {
  DecoupledDocumentEditor
    .create(document.querySelector('#editor'), {
      extraPlugins: [this.uploader],
      toolbar: [ "alignment:left", "alignment:right", "alignment:center", "alignment:justify", "undo", "redo", "blockQuote", "bold", "link", "ckfinder", "selectAll", "fontBackgroundColor", "fontColor", "fontFamily", "fontSize", "heading", "imageTextAlternative", "toggleImageCaption",  "imageInsert",  "imageResize", "imageStyle:wrapText", "imageStyle:breakText", "indent", "outdent", "italic", "numberedList", "bulletedList", "mediaEmbed", "strikethrough", "insertTable", "tableColumn", "tableRow", "mergeTableCells", "tableCellProperties", "tableProperties", "todoList", "underline" ]
    })
    .then(editor => {
      const toolbarContainer = document.querySelector('.toolbar-container');
      if (toolbarContainer) {
        toolbarContainer.prepend(editor.ui.view.toolbar.element);
      }
      window.editor = editor;
      if (location.pathname == "/") {
        window.editor.isReadOnly = true;
      }
      $.ajax({
        url: getRootPath() + '/show',
        success: function (html) {
          window.editor.setData(html)
        }
      });
    })
    .catch(err => {
      console.error(err.stack);
    });
}


function save() {
  $.ajax({
    url: getRootPath() + '/save',
    data: {
      html: editor.getData()
    },
    method: 'POST',
  });
}

function getRootPath() {
  return window.location.protocol + "//" + window.location.hostname + ((window.location.hostname == 'localhost') ? ":" + window.location.port : '')
}

function uploader(editor) {
  editor.plugins.get("FileRepository").createUploadAdapter = (loader) => {
    return new UploadAdapter(loader, editor.config._config.api, editor.config._config.post_id);
  };
}
