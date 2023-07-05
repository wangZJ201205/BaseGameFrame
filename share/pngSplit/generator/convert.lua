require 'os'
require 'engine'

weight_tbl =
{
		icon = -200,
		cate = -199, --1:equipment, 2:stone, 3:function item, 4:materials
		type = -198,

		desc = -100,
		price = -99,
		bind_type = -98,
		max_stack = -97,
}



function _G_Trans(str)
	for k, v in ipairs(gdTrans) do
		if v.trans == str then
			return v.orgin
		end
	end
	
	return str
end

function parse_attributes(attr_string, typeid, scope)
	local color = nil
	-- if attr_string and type(attr_string)=="string" and string.find(attr_string,"%a")==1 then
		-- color = string.sub(attr_string, 1, 1)
		-- attr_string = string.sub(attr_string, 2, -1)
	-- elseif typeid and type(typeid)=="string" and string.find(typeid,"%a")==1 then
		-- color = string.sub(typeid, 1, 1)
		-- typeid = string.sub(typeid, 2, -1)
	-- end
	if typeid then
		if type(typeid) == "string" then
			typeid = attr_name_to_type[_G_Trans(typeid)] or 0
		end

		if typeid<=0 then
			return nil
		end
	end
	if not attr_string then
		return nil
	end
	if attr_string==0 then
		return nil
	end
	if attr_string=="0" then
		return nil
	end
	attr_string = tostring(attr_string)
	local attr = nil

	if typeid and typeid>0 then
		attr = {}
		attr.type = typeid
		--print(attr_string)
		local _, _, c, d = attr_string:find("(%d+)[-:](%d+)")
		local toint = 1
		if (typeid < COMBAT_PROP_NORMAL_END * 2 and typeid > COMBAT_PROP_NORMAL_END) then
			toint = COMBAT_PERCENT_TO_INT
		end
		if c then
			attr.min = tonumber(c) * toint
			attr.max = tonumber(d) * toint
		else
			--print(attr_string,toint)
			if tonumber(attr_string) then
				attr.data = (tonumber(attr_string) or 0) * toint
			else
				local _,_, a,e= attr_string:find("([%d-:%.]+)(%%?)")
				if (e == "%") then
					--   检查%数据是加法还是乘法属性 把小数点后的值转成整数
					if attr.type == ENTITY_PROP_ATTACK_MONSTER_EX or attr.type >= COMBAT_PROP_HP_MAX and attr.type < COMBAT_PROP_NORMAL_END then
						if (attr_percent_plus[attr.type] == nil) then
							attr.type = attr.type + COMBAT_PROP_NORMAL_END
						end
					end
					toint = COMBAT_PERCENT_TO_INT

					attr.data = tonumber(a) * toint
				else
					attr.data = tonumber(a)
				end
			end
		end
	else
		local _,_, a, b, e= attr_string:find("(.-)[-+$ ]?([%d-:%.]+)(%%?)")
		if a then
			--print(attr_string)
			--print(a,b,e)
			attr = {}
			attr.type = attr_name_to_type[_G_Trans(a)] or 0
			if (attr.type == 0) then
				attr.type = nil
				--attr.immunity = attr_Immunity_data[_G_Trans(a)]
				if attr.immunity then
					--print("========免疫 :"..a,b)
					attr.data = tonumber(b)
					return attr
				end
				print("=======无效的属性类型=======".. attr_string)
			else
				local toint = 1
				if attr.type == ENTITY_PROP_ATTACK_MONSTER_EX or attr.type <  COMBAT_PROP_NORMAL_END * 2 or
				   attr.type == ENTITY_PROP_WEIZHUAN18_ATTACK_UP or
				   attr.type == ENTITY_PROP_WEIZHUAN18_DEFEND_UP or
				   attr.type == ENTITY_PROP_POJIA or
				   attr.type == ENTITY_PROP_POJIA_IMMUNE then
					if (e == "%") then
					--   检查%数据是加法还是乘法属性 把小数点后的值转成整数
						if attr.type >= COMBAT_PROP_HP_MAX and attr.type < COMBAT_PROP_NORMAL_END then
							if (attr_percent_plus[attr.type] == nil) then
								attr.type = attr.type + COMBAT_PROP_NORMAL_END
							end
						end

						toint = COMBAT_PERCENT_TO_INT
					end
				end
				local _, _, c, d = b:find("(%d+)[-:](%d+)")
				if c then
					--print(c,d)
					attr.min = tonumber(c) * toint
					attr.max = tonumber(d) * toint
					--print(attr.min,attr.max)
				else
					--print(b)
					attr.data = tonumber(b) * toint
					--print(attr.data)
				end
			end

		end
	end
	--if attr and attr.min and attr.max<attr.min then
	--	attr.max, attr.min = attr.min, attr.max
	--end
	if scope and attr.data then
		attr.min = attr.data
		attr.max = attr.data
		attr.data = nil
	end
	if attr then
		attr.color = color
	end
	return attr
end

function parse_attributes_into_table(attr_string, tbl, typeid)
	if not tbl or type(tbl)~="table" then
		return
	end

	local attr = parse_attributes(attr_string, typeid)
	if attr then
		tbl[attr.type] = attr
	end
end

pa = parse_attributes


function parse_text(txt)
	if not txt then
		return nil
	end

	txt = tostring(txt)

	txt = txt:gsub("！", "@")
	txt = txt:gsub("，", "#")
	txt = txt:gsub("\\n", "&")

	local ttbl = {}
	local breakline = ""

	for v in txt:gfind("[^@#&]+[@#&]?") do
		v = v:gsub("@", "！")
		v = v:gsub("#", "，")
		v = v:gsub("&", "\\n")

		if v=="\\n" then
			breakline = "\\n"
		else
			if v:find("%[") then
				for h,c in v:gfind("([^%[%]]+)([%[%]]?)") do
					if h=="\\n" then
						breakline = "\\n"
					elseif h~="" then
						local attr = {}
						if c==']' then
							attr.color = h:sub(1, 1)
							attr.content = breakline .. h:sub(2, -1)
							breakline = ""
						else
							attr.color = 'w'
							attr.content = breakline .. h
							breakline = ""
						end
						table.insert(ttbl, attr)
					end
				end
			else
				local attr = {}
				attr.color="w"
				attr.content=breakline .. v
				breakline = ""
				table.insert(ttbl, attr)
			end
		end
	end

	return ttbl
end

--字符串分割
function split(s, sep)
    if string.len(s) == 0 then
        return {}
    end

    local t = {}
    local pos1 = 1
    while true do
        local pos2 = string.find(s, sep, pos1);
        if pos2 == nil then
            table.insert(t, string.sub(s, pos1))
            break
        end

        if pos2 == pos1 then
            table.insert(t, "")
        else
            table.insert(t, string.sub(s, pos1, pos2 - 1))
        end

        pos1 = pos2 + 1
    end

    return t
end
