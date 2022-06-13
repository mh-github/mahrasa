require 'csv'

class ImportGdcJob3 < ApplicationJob
	queue_as :default

	def perform(*args)
		puts "\nRunning ImportGdcJob3..."

		columns = [:date, :place, :confirmed, :deaths, :recovered]
		rows = []
		starting = Process.clock_gettime(Process::CLOCK_MONOTONIC)
		CSV.foreach("#{Rails.root}/app/jobs/global_daily_cumulative.csv", headers: false) do |row|
			rows << [row[0], row[1], row[2], row[3], row[4]]
		end
		ending = Process.clock_gettime(Process::CLOCK_MONOTONIC)
		puts "Finished reading CSV file into rows array. Time taken = #{(ending - starting).round(2)} seconds."

		starting = Process.clock_gettime(Process::CLOCK_MONOTONIC)
		Gdc.import columns, rows, validate: false
		ending   = Process.clock_gettime(Process::CLOCK_MONOTONIC)
		puts "Finished inserting data into global_daily_cumulative table. Time taken = #{(ending - starting).round(2)} seconds."
	end
end
