import java.io.BufferedReader;
import java.io.FileReader;
import java.util.Map;
import java.util.TreeMap;

public class StreamPracticeTest {

    private static void testWordCount() throws Exception {
        var reader = new BufferedReader(new FileReader("word_count_input.txt"));
        var actual = StreamPractice.wordCountByLength(reader);
        var expected = Map.of(1, 2L, 2, 8L, 3, 7L, 4, 5L, 6, 3L, 7, 1L, 9, 1L, 13, 1L);
        assert actual.equals(expected);
    }

    private static void testBattingAverage() throws Exception {
        var reader = new BufferedReader(new FileReader("batting_average_input.txt"));
        var actual = StreamPractice.bestBatterByTeam(reader);
        assert actual.size() == 3;
        StreamPractice.Batter soxBatter = actual.get("Sox").orElse(null);
        assert soxBatter.name.equals("Bhekisisa") && soxBatter.average == 0.25;
        StreamPractice.Batter lionsBatter = actual.get("Lions").orElse(null);
        assert lionsBatter.name.equals("Ciara") && lionsBatter.average == 0.903125;
        StreamPractice.Batter tigersBatter = actual.get("Tigers").orElse(null);
        assert tigersBatter.name.equals("Eimi") && tigersBatter.average == 0.29;
    }

    public static void main(String[] args) throws Exception {
        testWordCount();
        testBattingAverage();
    }
}
