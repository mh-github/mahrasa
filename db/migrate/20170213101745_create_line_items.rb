class CreateLineItems < ActiveRecord::Migration
  def change
    create_table :line_items do |t|
      t.string  :item
      t.integer :quantity
      t.string  :gift_wrap_type

      t.timestamps null: false
    end
  end
end
