function onBodyLoaded() {
  DecoupledEditor
    .create(document.querySelector('#editor'), {
      // toolbar: [ 'heading', '|', 'bold', 'italic', 'link' ]
    })
    .then(editor => {
      const toolbarContainer = document.querySelector('.toolbar-container');
      if (toolbarContainer) {
        toolbarContainer.prepend(editor.ui.view.toolbar.element);
      }
      window.editor = editor;

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
  console.log(editor.getData());
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