:{
    let parseEither :: Char -> Either String Int
        parseEither c
          | isDigit c = Right (>= 0)
          | otherwise = Left "parse error"
:}
