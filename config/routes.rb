Rails.application.routes.draw do
  mount Ckeditor::Engine => '/ckeditor'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  root to: "ckeditor#index"

  get "editor", to: "ckeditor#editor"

  post "save", to: "api#save"
  get "show", to: "api#show"
end
