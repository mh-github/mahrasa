drop table if exists "temp_table";
create table "temp_table" ("date" TEXT, "place" TEXT, "confirmed" INTEGER, "deaths" INTEGER, "recovered" INTEGER);
.mode csv
.import /mnt/d/Code/Ruby/Rails/mahrasa/app/jobs/global_daily_cumulative.csv "temp_table"
insert into global_daily_cumulative("date", "place", "confirmed", "deaths", "recovered") SELECT date, place, confirmed, deaths, recovered FROM temp_table;
drop table "temp_table";