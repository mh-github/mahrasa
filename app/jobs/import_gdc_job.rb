require 'csv'

class ImportGdcJob < ApplicationJob
	queue_as :default

	def perform(*args)
		puts "\nRunning ImportGdcJob..."
		starting = Process.clock_gettime(Process::CLOCK_MONOTONIC)
		CSV.foreach("#{Rails.root}/app/jobs/global_daily_cumulative.csv", headers: false) do |row|
			Gdc.create({ :date => row[0], :place => row[1], :confirmed => row[2], :deaths => row[3], :recovered => row[4] })
		end
		ending = Process.clock_gettime(Process::CLOCK_MONOTONIC)
		puts "Finished inserting data into global_daily_cumulative. Time taken = #{(ending - starting).round(2)} seconds."
	end
end
