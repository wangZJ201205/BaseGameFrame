require 'os'
require 'engine'
require 'convert'

-- handle basic info sheet
local of_file = io.open("..\\map_data.json", "w")
if not of_file then
	print("Failed to open output file: map_data.json")
else
	of_file:write([[
]])
end

-- 数据
local gdmap = {}

function handle_map(o)
	local id = tonumber(o[1].a)
	if not id or id == 0 then
		return
	end

	local d = {}

	d.id = id
	d.path = o[1].b
	d.monsters = {}
	for i=1,4 do
		local monsters= {}
		monsters.id = tonumber(o[i].c)
		monsters.delay = tonumber(o[i].d)
		table.insert(d.monsters, monsters)
	end

	gdmap[tostring(d.id)] = d
end


export_csv("..\\design\\地图信息.xlsx")
handle_file_ex("tmp\\地图.csv", handle_map,2, 4)
clear_csv()

output_table_json(gdmap, of_file, nil, true, weight_tbl,true)

