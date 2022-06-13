class CreateAsyncOperations < ActiveRecord::Migration[7.0]
  def change
    create_table :async_operations do |t|
      t.string :op_type
      t.string :filename
      t.timestamps
    end
  end
end
