class CkeditorController < ApplicationController
  def index
  end

  def editor
  end
  
  def save_attachment
    CkeditorContent.last.attachments.attach([params[:file]])
    render json: { url: '/ckeditor/attachment?id=' + CkeditorContent.last.attachments.last.id.to_s }
  end

  def get_attachment
    redirect_to rails_blob_url( CkeditorContent.last.attachments.find(params[:id]))
  end
end
