using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PartyTymeParser
{
    public class SongEntry
    {
        public string? Artist { get; set; }
        public string? Song { get; set; }
        public string? Code { get; set; }

        public string? Get(SongPart part)
        {
            switch (part)
            {
                case SongPart.Artist:
                    return Artist;
                case SongPart.Song:
                    return Song;
                case SongPart.Code:
                    return Code;
            }

            throw new InvalidOperationException();
        }
    }
}
