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

local collision_type = {}
collision_type["方形"] = 1
collision_type["圆形"] = 2
collision_type["无"] = 0

local gdSkillEffect = {}
function handle_skill_effect(o)
	local d = {}
	d.id = tonumber(o.a) or 0
	if d.id == 0 then
		return
	end

	d.src = o.b
	d.collision = collision_type[o.c]
	d.collRect = o.d 
	d.speed = o.e ~= "0" and tonumber(o.e) or nil
	d.animation = o.f ~= "0" and tonumber(o.f) or nil
	d.sustaintime = o.g ~= "0" and tonumber(o.g) or nil
	d.delayDamage = o.h ~= "0" and tonumber(o.g) or nil
	d.particle = o.i ~= "0" and o.i or nil
	d.motionStreak = o.j ~= "0" and tonumber(o.j) or nil
	d.strike = o.k ~= "0" and tonumber(o.k) or nil
	d.sound = o.l
	d.atlas = o.m

	gdSkillEffect[d.id] = d
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
	d.bullets = {}
	d.bullets["1"] = gdSkillEffect[o.d ~= "0" and tonumber(o.d) or nil]
	d.bullets["2"] = gdSkillEffect[o.e ~= "0" and tonumber(o.e) or nil]
	d.bullets["3"] = gdSkillEffect[o.f ~= "0" and tonumber(o.f) or nil]
	d.cooldown = o.g ~= "0" and tonumber(o.g) or nil
	d.delaytime = o.h ~= "0" and tonumber(o.h) or nil
	d.range = o.i ~= "0" and tonumber(o.i) or nil
	d.count = o.j ~= "0" and tonumber(o.j) or nil
	d.icon = o.k
	d.desc = o.l
	gdskill[tostring(d.id)] = d
end



export_csv("..\\design\\技能.xlsx")
handle_file("tmp\\技能效果.csv", handle_skill_effect)
handle_file("tmp\\技能.csv", handle_skill)
clear_csv()

output_table_json(gdskill, of_file, nil, true, weight_tbl,true)

