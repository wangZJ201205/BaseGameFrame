require 'os'
require 'engine'
require 'convert'

-- handle basic info sheet
local of_file = io.open("..\\equip_data.json", "w")
if not of_file then
	print("Failed to open output file: map_data.json")
else
	of_file:write([[
]])
end

-- 数据
local gdequip = {}

function handle_equip(o)
	local d = {}

	d.id = tonumber(o.a) or 0
	-- if d.id == 0 then
	-- 	return
	-- end

	d.resource = o.b


	gdequip[tostring(d.id)] = d
end


export_csv("..\\design\\装备表.xlsx")
handle_file("tmp\\装备.csv", handle_equip)
clear_csv()

output_table_json(gdequip, of_file, nil, true, weight_tbl,true)

