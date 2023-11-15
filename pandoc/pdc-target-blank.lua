local function add_target_blank (link)
    if string.match(link.target, '^http') then
        link.attributes.target = '_blank'
    end
    return link
end

return {
    { Link = add_target_blank }
}

