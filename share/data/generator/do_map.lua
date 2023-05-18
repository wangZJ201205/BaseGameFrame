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
local gdmapRule = {}
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
		gd10001[tostring(info.time)] = info
	end

	
end


export_csv("..\\design\\地图信息.xlsx")
handle_file_ex("tmp\\地图.csv", handle_map,2, 4)
handle_file_ex("tmp\\10001.csv", handle_map_10001,2, 100)
clear_csv()

output_table_json(gdmap, of_file, nil, true, weight_tbl,true)

output_table_json(gd10001, of_file, nil, true, weight_tbl,true)