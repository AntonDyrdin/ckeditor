Rails.application.routes.draw do
  root to: "ckeditor#index"

  get "editor", to: "ckeditor#editor"

  post "save", to: "api#save"
  get "show", to: "api#show"

  post 'ckeditor/attachment', to: 'ckeditor#save_attachment'
  get 'ckeditor/attachment', to: 'ckeditor#get_attachment'
end
