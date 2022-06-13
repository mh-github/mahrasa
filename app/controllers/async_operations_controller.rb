class AsyncOperationsController < ApplicationController
  def index
    @asyncops = AsyncOperation.all
  end

  def status
    puts "In status action..."
    @id = params[:id]
    @ao = AsyncOperation.find(@id)
    @op_type = @ao.op_type
    @status  = @ao.status
  end
end
