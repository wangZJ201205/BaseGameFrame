require 'os'
require 'engine'
require 'convert'

-- handle basic info sheet
local of_file = io.open("..\\bullet_data.json", "w")
if not of_file then
	print("Failed to open output file: bullet_data.json")
else
	of_file:write([[
]])
end

local collision_type = {}
collision_type["方形"] = 1
collision_type["圆形"] = 2
collision_type["无"] = 0

local attackMoveType = {}
attackMoveType["走路"] = 1
attackMoveType["全攻击"] = 2

local zorderIndexType = {}
zorderIndexType["高"] = 1
zorderIndexType["低"] = 2

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
	d.delayDamage = o.h ~= "0" and tonumber(o.h) or nil
	d.particle = o.i ~= "0" and o.i or nil
	d.motionStreak = o.j ~= "0" and tonumber(o.j) or nil
	d.strike = o.k ~= "0" and tonumber(o.k) or nil
	d.sound = o.l
	d.preftab = o.m
	d.atlas = o.n
	d.attackMoveType = attackMoveType[o.o]
	d.zorder = zorderIndexType[o.p]
	d.nextBullet = o.q ~= "0" and tonumber(o.q) or nil
	d.scriptID = o.r ~= "0" and tonumber(o.r) or nil
	d.gene = o.s ~= "0" and tonumber(o.s) or nil
	
	gdSkillEffect[d.id..""] = d
end



export_csv("..\\design\\技能.xlsx")
handle_file("tmp\\技能效果.csv", handle_skill_effect)
clear_csv()

output_table_json(gdSkillEffect, of_file, nil, true, weight_tbl,true)

