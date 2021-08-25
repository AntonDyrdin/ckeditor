class ApiController < ActionController::API
  rescue_from StandardError do |e|
    render json: {
      error: e,
    }, status: 500
  end

  def save
    if CkeditorContent.last.nil?
      CkeditorContent.create!(html: params[:html])
    else
      CkeditorContent.last.update!(html: params[:html])
    end
  end

  def show
    if CkeditorContent.last.present?
      render plain: CkeditorContent.last.html
    end
  end
end
