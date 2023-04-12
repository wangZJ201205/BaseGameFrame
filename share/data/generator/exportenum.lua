


function exportenum(source_file_name, enum_name, namespace)
	local tf = io.open(source_file_name,"r")
	if not tf then
		print("failed to parse file : ", source_file_name)
		return
	end
	local source = tf:read("*all")
	tf:close()

	local pattern = "enum%s*"..enum_name.."%s*{(.-)}"

	local a, b, t = source:find(pattern)

	if not a then
		print("failed to find enum : " , enum_name)
		return
	end
	--print("-----------------")
	--print( t)
	--print("-----------------")
	local ns = nil
	if type(namespace)=="string" then
		if not _G[namespace] then
			_G[namespace] = {}
		end
		ns = _G[namespace]
	elseif type(namespace)=="table" then
		ns = namespace
	else
		print("failed to get namespcae : " , namespace)
		return
	end

	t = t:gsub("//.-\n", "XXX")

	local value = -1
	for k, v in t:gfind("([%w_%d]+)%s*=?%s*([-%d]*)%s*,") do
		if v and v~="" then
			value = tonumber(v)
		else
			value = value + 1
		end
		local nsv = {}
		nsv.k = tostring(k)
		nsv.v = value
		table.insert(ns, nsv)
	end
end

function outputenum(file, namespace, name)
	local ns = nil
	if type(namespace)=="string" then
		ns = _G[namespace]
		name = namespace
	elseif type(namespace)=="table" then
		ns = namespace
	else
		print("invalid parameter")
		return
	end

	if not name or not ns then
		print("invalid namespace ", name, " to output")
		return
	end

	file:write("\n\n")
	file:write("--\n")
	file:write("--	for table : ", name, " \n")
	file:write("--\n")

	file:write(name, " = {\n")
	for _, v in ipairs(ns) do
		file:write("	", v.k, " = ", v.v ,",\n")
	end
	file:write("}\n")
end


