require 'os'
require 'engine'
require 'convert'

-- handle basic info sheet
local of_file = io.open("..\\map_rule_data.json", "w")
if not of_file then
	print("Failed to open output file: map_rule_data.json")
else
	of_file:write([[
]])
end

-- 数据
local gdmapRule = {}
gdmapRule["10001"] = {}
function handle_map_10001(o)
	local time = tonumber(o[1].a)
	if not time or time == 0 then
		return
	end

	local d = {}

	for i=1,100 do
		local info= {}
		info.time = tonumber(o[i].a)
		info.monsters = {}
		table.insert(info.monsters, o[i].b)
		table.insert(info.monsters, o[i].c)
		table.insert(info.monsters, o[i].d)
		table.insert(info.monsters, o[i].e)
		table.insert(info.monsters, o[i].f)
		table.insert(info.monsters, o[i].g)
		gdmapRule["10001"][tostring(info.time)] = info
	end

	
end


export_csv("..\\design\\地图规则.xlsx")
handle_file_ex("tmp\\10001.csv", handle_map_10001,2, 100)
clear_csv()

output_table_json(gdmapRule, of_file, nil, true, weight_tbl,true)