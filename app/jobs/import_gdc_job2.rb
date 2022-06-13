require 'csv'

class ImportGdcJob2 < ApplicationJob
	queue_as :default

	def perform(*args)
		puts "\nRunning ImportGdcJob2..."

		puts "Creating temp file"
		starting = Process.clock_gettime(Process::CLOCK_MONOTONIC)
		system("(echo 'date,place,confirmed,deaths,recovered'; cat #{Rails.root}/app/jobs/global_daily_cumulative.csv) > #{Rails.root}/app/jobs/temp.csv")
		ending = Process.clock_gettime(Process::CLOCK_MONOTONIC)
		puts "Finished creating temp file. Time taken = #{(ending - starting).round(2)} seconds."

		starting = Process.clock_gettime(Process::CLOCK_MONOTONIC)
		system("csvsql --db sqlite:///'#{Rails.root}'/db/development.sqlite3 --tables global_daily_cumulative --no-create --insert #{Rails.root}/app/jobs/temp.csv")
		ending   = Process.clock_gettime(Process::CLOCK_MONOTONIC)
		puts "Finished inserting data into global_daily_cumulative table. Time taken = #{(ending - starting).round(2)} seconds."
	end
end
