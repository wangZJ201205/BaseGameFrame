require 'os'
require 'engine'
require 'convert'

-- handle basic info sheet
local of_file = io.open("..\\entity_data.json", "w")
if not of_file then
	print("Failed to open output file: entity_data.json")
else
	of_file:write([[
]])
end

-- 数据
local gdentity = {}

function handle_entity(o)
	local d = {}

	d.id = tonumber(o.a) or 0
	if d.id == 0 then
		return
	end

	d.name = o.b
	d.path = o.c

	d.skillid = tonumber(o.d) or 0
	d.bloom = tonumber(o.e) or 0
	d.collision = tonumber(o.f)
	d.collRect = o.g
	d.collGroup = o.h
	d.dropItem = o.i
	gdentity[tostring(d.id)] = d
end

function handle_player(o)
	local d = {}

	d.id = tonumber(o.a) or 0
	if d.id == 0 then
		return
	end

	d.name = o.b
	d.path = o.c

	d.skillid = tonumber(o.d) or 0
	d.bloom = tonumber(o.e) or 0
	d.collision = tonumber(o.f)
	d.collRect = o.g
	d.collGroup = o.h
	d.defense = tonumber(o.i)
	d.pickRange = tonumber(o.j)
	gdentity[tostring(d.id)] = d
end


export_csv("..\\design\\对象表.xlsx")
handle_file("tmp\\对象.csv", handle_entity)
handle_file("tmp\\玩家.csv", handle_player)
clear_csv()

output_table_json(gdentity, of_file, nil, true, weight_tbl,true)

