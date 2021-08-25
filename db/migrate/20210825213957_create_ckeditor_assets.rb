# frozen_string_literal: true

class CreateCkeditorAssets < ActiveRecord::Migration[5.2]
  def up
    create_table :ckeditor_contents do |t|
      t.string  :html, null: false

      t.timestamps null: false
    end
  end
end
