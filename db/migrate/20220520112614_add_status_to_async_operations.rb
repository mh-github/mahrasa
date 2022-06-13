class AddStatusToAsyncOperations < ActiveRecord::Migration[7.0]
  def change
    add_column :async_operations, :status, :string
  end
end
