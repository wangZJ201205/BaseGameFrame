require 'os'
require 'engine'
require 'convert'

-- handle basic info sheet
local of_file = io.open("..\\skill_data.json", "w")
if not of_file then
	print("Failed to open output file: skill_data.json")
else
	of_file:write([[
]])
end

-- 数据
local gdskill = {}

function handle_skill(o)
	local d = {}

	d.id = tonumber(o.a) or 0
	if d.id == 0 then
		return
	end

	d.name = o.b
	d.attackValue = o.c
	d.src = o.d
	d.mid = o.e ~= "0" and o.e or nil
	d.over = o.f ~= "0" and o.f or nil
	d.cooldown = o.g ~= "0" and tonumber(o.g) or nil
	d.delaytime = o.h ~= "0" and tonumber(o.h) or nil
	d.collision = o.i ~= "0" and tonumber(o.i) or nil
	d.collRect = o.j 
	d.speed = o.k ~= "0" and tonumber(o.k) or nil
	d.range = o.l ~= "0" and tonumber(o.l) or nil
	d.count = o.m ~= "0" and tonumber(o.m) or nil
	d.animation = o.n ~= "0" and tonumber(o.n) or nil
	d.buffer = o.o ~= "0" and tonumber(o.o) or nil
	d.icon = o.p
	d.sustaintime = o.q ~= "0" and tonumber(o.q) or nil
	d.particle = o.r ~= "0" and o.r or nil
    d.motionStreak = o.s ~= "0" and o.s or nil
	d.sceneSkill = o.t ~= "0" and o.t or nil
	d.desc = o.u
	gdskill[tostring(d.id)] = d
end

function handle_scene_skill(o)
	local d = {}

	d.id = tonumber(o.a) or 0
	if d.id == 0 then
		return
	end

	d.name = o.b
	d.attackValue = o.c
	d.src = o.d
	d.mid = o.e ~= "0" and o.r or nil
	d.over = o.f ~= "0" and o.r or nil
	d.cooldown = o.g ~= "0" and tonumber(o.g) or nil
	d.delaytime = o.h ~= "0" and tonumber(o.h) or nil
	d.collision = o.i ~= "0" and tonumber(o.i) or nil
	d.collRect = o.j
	d.speed = o.k ~= "0" and tonumber(o.k) or nil
	d.range = o.l ~= "0" and tonumber(o.l) or nil
	d.count = o.m ~= "0" and tonumber(o.m) or nil
	d.animation = o.n ~= "0" and tonumber(o.n) or nil
	d.buffer = o.o ~= "0" and tonumber(o.o) or nil
	d.icon = o.p
	d.sustaintime = tonumber(o.q)
	d.particle = o.r ~= "0" and o.r or nil
    d.motionStreak = o.s ~= "0" and o.s or nil
	d.desc = o.t
	gdskill[tostring(d.id)] = d
end


export_csv("..\\design\\技能.xlsx")
handle_file("tmp\\技能.csv", handle_skill)
handle_file("tmp\\场景技能.csv", handle_scene_skill)
clear_csv()

output_table_json(gdskill, of_file, nil, true, weight_tbl,true)

