using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace PartyTymeParser
{
    [Flags]
    public enum SongPart
    {
        Artist = 1,
        Song = 2,
        Code = 4
    }

    public enum ConfigKey
    {
        ArtistSplit = 101,
        ArtistSplit2 = 102,
        ArtistSplit3 = 103,
        ArtistSplit4 = 104,
        ArtistSplit5 = 105,
        ArtistSplit6 = 106, // 3 line artist
        ArtistSplit7 = 107, // Messed up parsing
        SongSplit = 201,
        SongSplit2 = 202,
        SongSplit3 = 203,
        SongSplit4 = 204,
        SongSplit5 = 205, // Messed up parsing
        SongArtistSplit = 300,
        SongArtistSplit2 = 301,
        SongArtistSplit3 = 302,
        ArtistSongBunch = 400,
        SongCodeBunch = 500,
        ArtistSongBunch2 = 600,

    }

    public static class Constants
    {
        public static Regex CodeRegex = new Regex("(PH|PC)[0-9]+$");

        /// <summary>
        /// COnfig indexes we are skipping processing for now
        /// </summary>
        public static Dictionary<ConfigKey, bool> SkipNums = new Dictionary<ConfigKey, bool>()
        {
            [ConfigKey.ArtistSplit] = false,
            [ConfigKey.ArtistSplit2] = false,
            [ConfigKey.ArtistSplit3] = true,
            [ConfigKey.ArtistSplit4] = true,
            [ConfigKey.ArtistSplit5] = true,
            [ConfigKey.ArtistSplit6] = false,
            [ConfigKey.ArtistSplit7] = true,
            [ConfigKey.SongSplit] = false,
            [ConfigKey.SongSplit2] = false,
            [ConfigKey.SongSplit3] = true,
            [ConfigKey.SongSplit4] = true,
            [ConfigKey.SongSplit5] = true,
            [ConfigKey.SongArtistSplit] = false,
            [ConfigKey.SongArtistSplit2] = false,
            [ConfigKey.SongArtistSplit3] = true,
            [ConfigKey.ArtistSongBunch] = true,
            [ConfigKey.SongCodeBunch] = true,
            [ConfigKey.ArtistSongBunch2] = true
        };

        public static Dictionary<ConfigKey, ConfigKey?> OnlyIfNextIsNot = new Dictionary<ConfigKey, ConfigKey?>()
        {
            // Only grab split 5 if the next has no match
            // Example: 3719 & 3720
            [ConfigKey.ArtistSplit5] = null,
            [ConfigKey.ArtistSplit7] = null,
        };

        public static Dictionary<ConfigKey, SongPart?[][]> ParserConfigs = new Dictionary<ConfigKey, SongPart?[][]>()
        {
            // Case 1 (3-line):
            // Examples: 1035->1037
            //    Artist is split into two lines, causing entry to cover three lines
            //    Line 1: [artist, null, null
            //    Line 2: [null, song, code]
            //    Line 3: [artist pt. 2, null, null]
            [ConfigKey.ArtistSplit] = new[]
            {
                new SongPart?[] { SongPart.Artist, null, null },
                new SongPart?[] { null, SongPart.Song, SongPart.Code },
                new SongPart?[] { SongPart.Artist, null, null },
            },

            // Case 2 (3-line):
            //    Artist Name is plit into 2 lines, causing entry to cover four lines
            //    Exmaples: 1433 -> 1435
            //    Line 1: [Artist, null, null]
            //    Line 2: [song, null, code]
            //    Line 3: [artist pt. 2, null, null]
            [ConfigKey.ArtistSplit2] = new[]
            {
                new SongPart?[] { SongPart.Artist, null, null },
                new SongPart?[] { SongPart.Song, null, SongPart.Code },
                new SongPart?[] { SongPart.Artist, null, null },
            },

            // (3-line):
            //    Artist Name is plit into 2 lines, after broken parsing, causing entry to cover three lines
            //    Exmaples: 375 -> 377
            //    Line 1: [Artist, null, null]
            //    Line 2: [song, code, null]
            //    Line 3: [artist pt. 2, null, null]
            [ConfigKey.ArtistSplit3] = new[]
            {
                new SongPart?[] { SongPart.Artist, null, null },
                new SongPart?[] { SongPart.Song, SongPart.Code, null },
                new SongPart?[] { SongPart.Artist, null, null },
            },

            // (3-line):
            //    Artist Name is split into 2 lines, after broken parsing, causing entry to cover three lines
            //    Exmaples: 842 -> 844
            //    Line 1: [Artist, null, null]
            //    Line 2: [null, song code, null]
            //    Line 3: [artist pt. 2, null, null]
            [ConfigKey.ArtistSplit4] = new[]
            {
                new SongPart?[] { SongPart.Artist, null, null },
                new SongPart?[] { null, SongPart.Song | SongPart.Code, null },
                new SongPart?[] { SongPart.Artist, null, null },
            },

            // CAUSES MATCH CONFLICT with ArtistSongBunch2
            // (2-line):
            //    Artist Name is split into 2 lines, after broken parsing, causing entry to cover two lines
            //    Exmaples: 842 -> 844
            //    Line 1: [ArtistSong, null, code]
            //    Line 3: [artist pt. 2, null, null]
            [ConfigKey.ArtistSplit5] = new[]
            {
                new SongPart?[] { SongPart.Artist | SongPart.Song, null, SongPart.Code },
                new SongPart?[] { SongPart.Artist, null, null },
            },

            // (2-line):
            //    Artist Name is split into 2 lines, and song name was bunched up too close
            //    Exmaples: 5905 -> 5906
            //    Line 1: [ArtistSong, code, null]
            //    Line 3: [artist pt. 2, null, null]
            [ConfigKey.ArtistSplit7] = new[]
            {
                new SongPart?[] { SongPart.Artist | SongPart.Song, SongPart.Code, null },
                new SongPart?[] { SongPart.Artist, null, null },
            },

            // (4-line):
            //    Song Name is plit into 2 lines, causing entry to cover four lines
            //    Line 1: [Artist, null, null]
            //    Line 2: [null, song, null
            //    Line 3: [null, null, code]
            //    Line 4: [null, song pt.2, null]
            [ConfigKey.SongSplit] = new[]
            {
                new SongPart?[] { SongPart.Artist, null, null },
                new SongPart?[] { null, SongPart.Song, null },
                new SongPart?[] { null, null, SongPart.Code },
                new SongPart?[] { null, SongPart.Song, null },
            },

            // (4-line):
            // Example: 864 -> 867
            //    Song Name is plit into 2 lines, causing entry to cover four lines
            //    Line 1: [Artist, null, null]
            //    Line 2: [null, song, null
            //    Line 3: [null, code, null]
            //    Line 4: [null, song pt.2, null]
            [ConfigKey.SongSplit2] = new[]
            {
                new SongPart?[] { SongPart.Artist, null, null },
                new SongPart?[] { null, SongPart.Song, null },
                new SongPart?[] { null, SongPart.Code, null },
                new SongPart?[] { null, SongPart.Song, null },
            },

            // (2-line):
            // Example: 864 -> 867
            //    Song Name is plit into 2 lines, and after broken parsing
            //    Line 1: [Artist, song code, null]
            //    Line 2: [null, song, null
            [ConfigKey.SongSplit3] = new[]
            {
                new SongPart?[] { SongPart.Artist, SongPart.Song | SongPart.Code, null },
                new SongPart?[] { null, SongPart.Song, null },
            },

            // (4-line):
            // Example: 3720 -> 3723
            //    Song Name is plit into 2 lines, and after broken parsing, causing 4 lines
            //    Line 1: [Artist, null, null]
            //    Line 2: [Song, null, null]
            //    Line 3: [null, null, code]
            //    Line 4: [song, null, null
            [ConfigKey.SongSplit4] = new[]
            {
                new SongPart?[] { SongPart.Artist, null, null },
                new SongPart?[] { SongPart.Song, null, null },
                new SongPart?[] { null, null, SongPart.Code },
                new SongPart?[] { SongPart.Song, null, null },
            },


            // (4-line):
            // Example: 6240 -> 6243
            //    Song Name is plit into 2 lines, and after broken parsing, causing 4 lines
            //    Line 1: [Artist, null, null]
            //    Line 2: [Song, null, null]
            //    Line 3: [null, code, null]
            //    Line 4: [song, null, null
            [ConfigKey.SongSplit5] = new[]
            {
                new SongPart?[] { SongPart.Artist, null, null },
                new SongPart?[] { SongPart.Song, null, null },
                new SongPart?[] { null, SongPart.Code, null },
                new SongPart?[] { SongPart.Song, null, null },
            },

            // (3-line):
            //    Song Name & Artist Name is plit into 2 lines, causing entry to cover three lines
            //    Examples: 1981->1983
            //    Line 1: [Artist, song, null]
            //    Line 2: [null, null, code
            //    Line 3: [artist pt. 2, song pt.2, null]
            [ConfigKey.SongArtistSplit] = new[]
            {
                new SongPart?[] { SongPart.Artist, SongPart.Song, null },
                new SongPart?[] { null, null, SongPart.Code },
                new SongPart?[] { SongPart.Artist, SongPart.Song, null },
            },

            // (3-line):
            //    Song Name & Artist Name is split into 2 lines, causing entry to cover 3 lines
            //    Examples: 7074 -> 7076
            //    Line 1: [Artist, song, null]
            //    Line 2: [null, code, null]
            //    Line 3: [artist pt. 2, song pt.2, null]
            [ConfigKey.SongArtistSplit2] = new[]
            {
                new SongPart?[] { SongPart.Artist, SongPart.Song, null },
                new SongPart?[] { null, SongPart.Code, null },
                new SongPart?[] { SongPart.Artist, SongPart.Song, null },
            },

            // (3-line): (SKIP)
            //    Song Name & Artist Name is split into 2 lines, causing entry to cover 3 lines
            //    Examples: 7658 -> 7660
            //    Line 1: [Artist Song, null, null]
            //    Line 2: [null, null, code]
            //    Line 3: [artist pt. 2, null, null]
            [ConfigKey.SongArtistSplit3] = new[]
            {
                new SongPart?[] { SongPart.Artist | SongPart.Song, null, null },
                new SongPart?[] { null, null, SongPart.Code },
                new SongPart?[] { SongPart.Artist, null, null },
            },

            // Case 5 (1-line): (Solve Heuristically)
            //    Artist name was too long, and song name got bunched together with artist
            //    Line 1: [ArtistSong, code, null]
            [ConfigKey.ArtistSongBunch] = new[]
            {
                new SongPart?[] { SongPart.Artist | SongPart.Song, SongPart.Code, null },
            },

            // Case 6 (1-line): (Solve Heuristically)
            //    Song & Code buched together
            //    Line 1: [Artist, SongCode, null]
            [ConfigKey.SongCodeBunch] = new[]
            {
                new SongPart?[] { SongPart.Artist, SongPart.Song | SongPart.Code, null },
            },

            // Case 7 (1-line): (Solve Heuristically)
            // (Example: CSV Line 1410->1432, 845 -> 892, 1226->1270)
            //    Table parsing got messed up, song name & artist name bunched
            //    Correct by looking for known artist name, and split first column there
            //    Line 1: [ArtistSong, null, code]
            [ConfigKey.ArtistSongBunch2] = new[]
            {
                new SongPart?[] { SongPart.Artist | SongPart.Song, null, SongPart.Code },
            },

            // MOVED TO END, CAUSES BAD MATCHES
            // (3-line):
            //    Artist Name is split into 4 lines, after broken parsing, causing entry to cover three lines
            //    Exmaples: 
            //    Line 1: [Artist, null, null]
            //    Line 2: [Artist pt2, song, code]
            //    Line 3: [artist pt3, null, null]
            [ConfigKey.ArtistSplit6] = new[]
            {
                new SongPart?[] { SongPart.Artist, null, null },
                new SongPart?[] { SongPart.Artist, SongPart.Song, SongPart.Code },
                new SongPart?[] { SongPart.Artist, null, null },
            },
        };
    }
}
