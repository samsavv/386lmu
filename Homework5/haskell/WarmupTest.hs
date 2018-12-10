import Data.List
import Warmup

is_approx :: Double -> Double -> Bool
x `is_approx` y = abs (x - y) < 0.0000001

fixture :: [(String, Bool)]
fixture =
    [ ( "change works for 0", change 0 == Right (0, 0, 0, 0) )
    , ( "change works for 219", change 219 == Right (8, 1, 1, 4) )
    , ( "change works for 97", change 97 == Right (3, 2, 0, 2) )
    , ( "change works for 1000000000", change 1000000000 == Right (40000000, 0, 0, 0) )
    , ( "change detects negatives", change (-50) == Left "amount cannot be negative" )
    , ( "stripQuotes works for empty", stripQuotes "" ==  "" )
    , ( "stripQuotes works for no quotes", stripQuotes "dog" == "dog" )
    , ( "stripQuotes removes stuff", stripQuotes "''\"\"a'''" == "a" )
    , ( "stripQuotes does not remove backslashes", stripQuotes "a\\b" == "a\\b" )
    , ( "firstUppercasedOverLengthFive returns nothing on empty"
      , firstUppercasedOverLengthFive [] == Nothing
      )
    , ( "firstUppercasedOverLengthFive returns nothing if none"
      , firstUppercasedOverLengthFive ["a", "bcdef"] == Nothing
      )
    , ( "firstUppercasedOverLengthFive works"
      , firstUppercasedOverLengthFive ["a", "abcdef", "g"] == Just "ABCDEF"
      )
    , ( "powers of 2", take 10 (powers 2) == [1,2,4,8,16,32,64,128,256,512])
    , ( "powers of 3", take 5 (powers 3) == [1,3,9,27,81])
    , ( "powers of 1000000", (powers 1000000 !! 9) == 10^54)
    , ( "powers of -1", take 10 (powers (-1)) == [1,-1,1,-1,1,-1,1,-1,1,-1])
    , ( "powers of 0.5", take 5 (powers (0.5)) == [1,0.5,0.25,0.125,0.0625])
    , ( "socoo works for empty", sumOfCubesOfOdds [] == 0)
    , ( "socoo works for single even", sumOfCubesOfOdds [8] == 0)
    , ( "socoo works for single odd", sumOfCubesOfOdds [3] == 27)
    , ( "socoo works for a mixed list", sumOfCubesOfOdds [-3, 2, -8, 5, -1] == 97)
    , ( "adjacent swapping for empty", swapAdjacents ([]::[Int]) == ([]::[Int]))
    , ( "adjacent swapping for single element", swapAdjacents [8] == [8])
    , ( "adjacent swapping for two elements", swapAdjacents [False, True] == [True, False])
    , ( "adjacent swapping for six elements", swapAdjacents [1..6] == [2,1,4,3,6,5])
    , ( "adjacent swapping for seven elements", swapAdjacents [1..7] == [2,1,4,3,6,5,7])
    , ( "volume of sphere radius 1", volume (Sphere 1) `is_approx` (4 * pi / 3))
    , ( "volume of sphere radius 2", volume (Sphere 2) `is_approx` (32 * pi / 3))
    , ( "surfaceArea of sphere radius 1", surfaceArea (Sphere 1) `is_approx` (4 * pi))
    , ( "surfaceArea of sphere radius 2", surfaceArea (Sphere 2) `is_approx` (16 * pi))
    , ( "box volume", volume (Box 1.5 3 20) == 90)
    , ( "box surfaceArea", surfaceArea (Box 1.5 3 20) == 189)
    , ( "spheres are equalable", (Sphere 6.28) == (Sphere 6.28))
    , ( "boxes are equalable", (Box 2 10 3) == (Box 2 10 3))
    , ( "spheres can be shown", (show $ Sphere 3) == "Sphere 3.0")
    , ( "boxes can be shown", (show $ Box 3 1 2) == "Box 3.0 1.0 2.0")
    ]

main =
    let results = map test fixture in do
        putStrLn $ unlines $ map fst results
        putStrLn $ show (sum $ map snd results) ++ " failure(s)"
        where test (message, condition) =
                ( message ++ ": " ++ (if condition then "SUCCESS" else "FAIL")
                , if condition then 0 else 1
                )
