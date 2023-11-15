local dev = false

local count = 0

local figureTemplate = [[<figure class="figure figure-%s">
    <a href="images/%s" data-lightbox data-gallery="gallery%s">
      <img src="%s" />
    </a>
    <figcaption>%s</figcaption>
</figure>]]

local referenceTemplate = [[<div class="reference">
<div class="reference-image">
  <a href="images/%s"
     data-lightbox
     data-gallery="gallery%s">
    <img src="%s" />
  </a>
</div>
<div class="reference-content">
  <div class="reference-title">%s</div>
    <div>
      <span class="reference-year">%s</span>
      <span class="reference-country">%s</span>
    </div>
    <div class="reference-author">%s</div>
    <div class="reference-from">%s</div>
    <div class="reference-comment">%s</div>
  </div>
</div>]];

local function split(str, delimiter)
    local result = {}
    local pattern = string.format("([^%s]+)", delimiter)
    str:gsub(pattern, function(token)
        table.insert(result, token)
    end)
    return result
end

function readTextFile(filename)
  local file = io.open(filename, "r")
  if file then
    local content = file:read("*all")
    file:close()
    return content
  else
    return ""
  end
end

local function readThumbnail(path)
   if dev then
      return "images/" .. path
   else
      return readTextFile("manuscripts/thumbnails/" .. path)
   end
end

local function buildReference(text)
   local xs = split(text, "\n");
   local thumbnail = readThumbnail(xs[1]);
   count = count + 1;
   local html = referenceTemplate:format(xs[1], count, thumbnail, xs[2], xs[3], xs[4], xs[5], xs[6], xs[7]);
   return pandoc.RawInline("html", html);
end

local function buildFigure(text)
   local xs = split(text, "\n");
   local thumbnail = readThumbnail(xs[2]);
   count = count + 1;
   local html = figureTemplate:format(xs[1], xs[2], count, thumbnail, xs[3]);
   return pandoc.RawInline("html", html);
end

local functionTable = {
   ["figure"] = buildFigure,
   ["reference"] = buildReference
}

function CodeBlock(block)
   local func = functionTable[block.classes[1]];
   if(func ~= nil) then
      return func(block.text);
   else
      return block;
   end
end
