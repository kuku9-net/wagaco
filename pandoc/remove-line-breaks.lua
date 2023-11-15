function Para(para)
   for i = #(para.content)-1, 1, -1 do
      local element = para.content[i];
      if (element.t == "SoftBreak") then
         para.content:remove(i);
      elseif (element.t == "LineBreak") then
         local html = pandoc.RawInline("html", '<span class="gap"> </span>');
         para.content:insert(i + 1, html);
      end
   end
   return para;
end
