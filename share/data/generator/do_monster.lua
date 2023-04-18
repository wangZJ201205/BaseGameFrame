require 'os'
require 'engine'
require 'convert'

-- handle basic info sheet
local of_file = io.open("..\\monster_data.json", "w")
if not of_file then
	print("Failed to open output file: monster_data.json")
else
	of_file:write([[
]])
end

-- 数据
local gdmonster = {}

function handle_monster(o)
	local d = {}

	d.id = tonumber(o.a) or 0
	if d.id == 0 then
		return
	end

	d.name = o.b
	d.path = o.c

	gdmonster[tostring(d.id)] = d
end


export_csv("..\\design\\怪物表.xlsx")
handle_file("tmp\\怪物.csv", handle_monster)
clear_csv()

output_table_json(gdmonster, of_file, nil, true, weight_tbl,true)

