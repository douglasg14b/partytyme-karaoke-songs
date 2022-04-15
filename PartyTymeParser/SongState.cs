using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PartyTymeParser
{
    public class SongState
    {
        public SongState(SongEntry song)
        {
            Entry = song;
            HasArtist = !String.IsNullOrEmpty(song.Artist);
            HasSong = !String.IsNullOrEmpty(song.Song);
            HasCode = !String.IsNullOrEmpty(song.Code);
        }

        public SongEntry Entry { get; private set; }

        public bool HasArtist { get; private set; }
        public bool HasSong { get; private set; }
        public bool HasCode { get; private set; }

        public bool Valid => HasArtist && HasSong && HasCode;

        public string? Get(SongPart part) => Entry.Get(part);


        public bool MatchesLine(SongPart?[] line)
        {
            if (!Matches(SongPart.Artist, line[0])) return false;
            if (!Matches(SongPart.Song, line[1])) return false;
            if (!Matches(SongPart.Code, line[2])) return false;

            return true;
        }

        /// <summary>
        /// Matching this entry to the specific config line part
        /// </summary>
        /// <param name="entryPart">The entry value to check. Author, Song, Code</param>
        /// <param name="configPrt">The config part from the config we are looking for</param>
        /// <param name="entry">The entry to check</param>
        public bool Matches(SongPart entryPart, SongPart? configPart)
        {
            string? value = Get(entryPart);
            
            // If part is null, early match
            if (configPart is null)
            {
                // If value is null, true, else false
                return String.IsNullOrEmpty(value);
            }

            // config part is not null, and value is, no match
            if (String.IsNullOrEmpty(value)) return false;

            // Config is code or has code, but value does not
            if (configPart.Value.HasFlag(SongPart.Code))
            {
                // If value has code, true, otherwise false
                return ValueHasCode(value);
            }

            // Value is not null, config is not null, config is not coe, true match (for now)
            return true;
        }

        private bool ValueHasCode(string value)
        {
            return Constants.CodeRegex.IsMatch(value);
        }
    }
}
