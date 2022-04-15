using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace PartyTymeParser
{

    public class Parser
    {


        private Dictionary<ConfigKey, int> counts = new Dictionary<ConfigKey, int>();

        public void Parse()
        {
            List<SongEntry> parsedSongs = new List<SongEntry>();
            SongEntry[] rawSongs = GetRawSongEntries();

            for(int i = 0; i < rawSongs.Length; i++)
            {
                SongState state = new SongState(rawSongs[i]);

                // TODO: ensure this checks for valid code
                if (state.Valid)
                {
                    if (!counts.ContainsKey(default))
                    {
                        counts.Add(default, 0);
                    }

                    counts[default]++;

                    continue;
                }

                ConfigKey? key = GetConfigKeyForIndex(rawSongs, i);

                if(key != null)
                {
                    i += Constants.ParserConfigs[key.Value].Length - 1;

                    if (!counts.ContainsKey(key.Value))
                    {
                        counts.Add(key.Value, 0);
                    }

                    counts[key.Value]++;
                }            
            }
        }

        /// <summary>
        /// Gets the config key match for the provided index point
        /// </summary>
        private ConfigKey? GetConfigKeyForIndex(SongEntry[] songs, int index, bool ignoreMissing = false, int nextDepth = 0)
        {
            ConfigKey? configMatch = null;

            var testPrev = songs[Math.Max(0, index - 1)];
            var testSong = songs[index];
            var testNext = songs[Math.Min(songs.Length - 1, index + 1)];

            // Skipping these too hard
            // 7966
            if (index == 7966)
            {
                //return null;
            }

            foreach (var (key, config) in Constants.ParserConfigs)
            {
                // Avoid overflow
                if (songs.Length < index + config.Length) continue;

                // If we have exclusions, check these
                if (Constants.OnlyIfNextIsNot.ContainsKey(key) && nextDepth < 1)
                {
                    var excludeKey = Constants.OnlyIfNextIsNot[key];
                    ConfigKey? nextKey = GetConfigKeyForIndex(songs, index + 1, true, nextDepth + 1);

                    // null key means we must have a null nextKey to skip
                    if (excludeKey is null && nextKey != null) continue;

                    // Non ull key means we only match the exact match to skip
                    if (excludeKey != null && nextKey == Constants.OnlyIfNextIsNot[key]) continue;
                }

                bool configMatches = true;
                for (int i = 0; i < config.Length; i++)
                {
                    SongState state = new SongState(songs[index + i]);
                    var line = config[i];

                    if (!state.MatchesLine(line))
                    {
                        configMatches = false;
                        break;
                    }
                }

                // If the configMatches was not marked as false, then all checks passed and we found the config
                if (configMatches)
                {
                    configMatch = key;
                    break;
                }
            }

            if (configMatch == null && !ignoreMissing)
            {
                // break here
                
            }

            return configMatch;
        }

        /// <summary>
        /// Gets the line indexes till the next valid song
        /// </summary>
        /// <param name="songs"></param>
        /// <param name="index"></param>
        /// <returns></returns>
        private int[] GetIndexesTillNextSong(SongEntry[] songs, int index)
        {
            List<int> indexes = new List<int>();

            bool foundCode = false;
            for(int i = index; i < songs.Length; i++)
            {
                var state = new SongState(songs[i]);

                // If not empty, break
                if(state.Valid)
                {
                    break;
                }

                // If we have previously found a code, that means we have moved onto the next song?
                if (state.HasCode && foundCode)
                {
                    break;
                }

                if (state.HasCode)
                {
                    foundCode = true;
                }

                indexes.Add(i);
            }

            return indexes.ToArray();
        }

        private SongEntry[] GetRawSongEntries()
        {
            string rawJson = GetJsonString();
            var songs = JsonConvert.DeserializeObject<SongEntry[]>(rawJson);

            return songs;
        }

        private string GetJsonString()
        {
            string path = "PartyTyme Karaoke Song List.json";
            path = Path.Combine(Environment.CurrentDirectory, path);

            if (!File.Exists(path))
            {
                throw new FileNotFoundException("Failed to load JSOn data", path);
            }
            
            return File.ReadAllText(path);
        }
    }
}
