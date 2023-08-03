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

local MoveType = {}
MoveType["走路"] = 1
MoveType["飞行"] = 2

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
	d.defense = tonumber(o.f)
	d.collision = tonumber(o.g)
	d.collRect = o.h
	d.collGroup = o.i
	d.dropItem = o.j
	d.moveSpeed = tonumber(o.k)
	d.moveType = MoveType[o.l]
	d.boss = tonumber(o.m) or 0
	d.shapeshift = tonumber(o.n) or 0
	d.bloomEffect = o.o
	d.mindistance = tonumber(o.p) or 0
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
	d.defense = tonumber(o.f)
	d.collision = tonumber(o.g)
	d.collRect = o.h
	d.collGroup = o.i
	d.defense = tonumber(o.j)
	d.pickRange = tonumber(o.k)
	d.moveSpeed = tonumber(o.l)
	d.headIcon = o.m
	d.desc = o.n
	gdentity[tostring(d.id)] = d
end


export_csv("..\\design\\对象表.xlsx")
handle_file("tmp\\对象.csv", handle_entity)
handle_file("tmp\\玩家.csv", handle_player)
handle_file("tmp\\场景对象.csv", handle_entity)
clear_csv()

output_table_json(gdentity, of_file, nil, true, weight_tbl,true)

