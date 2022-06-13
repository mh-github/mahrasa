class CsvController < ApplicationController
    
    def upload

    end

    def import
        # copy uploaded file app/jobs directory
        FileUtils.cp(File.new(params[:csvfile].tempfile),
                     "#{Rails.root}/app/jobs/global_daily_cumulative.csv")

        # insert async_operations row
        @filename = params[:csvfile].original_filename
        @ao       = AsyncOperation.new(:op_type  => 'Import CSV',
                                       :filename => @filename,
                                       :status   => :enqueued)

        # enqueue the job
        if @ao.save
            ImportGdcJob4.perform_later(id: @ao.id)
        end

        render :ack
    end
end
