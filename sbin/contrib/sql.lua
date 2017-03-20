--PreparedStatement
Query = {
    Stm = "",
};

function Query:New (Stm)
    self.Stm = Stm;
end


function Query:SetString (V)
    self.Stm = self.Stm:gsub ("?", "'"..tostring(V).."'", 1);
end


function Query:SetNumber (V)
    self.Stm = self.Stm:gsub ("?", tostring(V), 1);
end


Conf = {
        host = "127.0.0.1",
        port = "5432",
        database = "unixjs",
        user = "unixjs",
        password = "K3J9 8LMN 02F3 B3LW"
};


return {Query = Query, Conf = Conf}