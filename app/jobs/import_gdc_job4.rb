require 'csv'

class ImportGdcJob4 < ApplicationJob
	queue_as :default

	after_perform do |job|
		AsyncOperation.where(id: job.arguments.first[:id]).update(:status => "processed")
	end

	def perform(*args)
		puts "\nRunning ImportGdcJob4..."

		starting = Process.clock_gettime(Process::CLOCK_MONOTONIC)
		system("sqlite3 #{Rails.root}/db/development.sqlite3 < #{Rails.root}/app/jobs/sqlite_import.sh")
		ending   = Process.clock_gettime(Process::CLOCK_MONOTONIC)
		puts "Finished inserting data into global_daily_cumulative table. Time taken = #{(ending- starting).round(2)} seconds."
	end
end
