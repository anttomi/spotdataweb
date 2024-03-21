const vowels = ['a', 'e', 'i', 'o', 'u'];
const consonants = ['b', 'c', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'm', 'n', 'p', 'q', 'r', 's', 't', 'v', 'w', 'x', 'y', 'z'];

type ExampleStream = {
    ts: string;
    ms_played: number;
    master_metadata_track_name: string;
    master_metadata_album_artist_name: string;
    master_metadata_album_album_name: string;
    spotify_track_uri: string;
}

function generateRandomString(length: number): string {
    let str = '';
    for (let i = 0; i < length; i++) {
        if (i % 2 === 0) {
            str += vowels[Math.floor(Math.random() * vowels.length)];
        } else {
            str += consonants[Math.floor(Math.random() * consonants.length)];
        }
    }
    return str;
}

function toPascalCase(str: string): string {
    return str.split(' ').map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
}

function formArtistData(multiplier: number = 500): { artists: string[], albums: string[], tracks: string[] } {

    const artists: string[] = []
    const albums: string[] = []
    const tracks: string[] = []

    //Different multipliers for each type of data

    for (let i = 0; i < Math.floor(multiplier / 2); i++) {
        artists.push(toPascalCase(`${generateRandomString(5)} ${generateRandomString(5)}`))
    }

    for (let i = 0; i < multiplier * 1.2; i++) {
        albums.push(toPascalCase(`${generateRandomString(5)} ${generateRandomString(5)}`))
    }

    for (let i = 0; i < multiplier * 1.5; i++) {
        tracks.push(toPascalCase(`${generateRandomString(5)} ${generateRandomString(5)}`))
    }

    return { artists: artists, albums: albums, tracks: tracks }

}

export function generateRandomStreams(n: number): ExampleStream[] {

    const streams: ExampleStream[] = []

    const { artists, albums, tracks } = formArtistData();

    for (let i = 0; i < n; i++) {

        //Moving this to a function causes pointless data passing
        
        const randomDate = new Date(+(new Date()) - Math.floor(Math.random() * 10000000000));
        streams.push(
            {
                ts: randomDate.toISOString(),
                ms_played: Math.floor(Math.random() * 100000),
                master_metadata_track_name: tracks[Math.floor(Math.random() * tracks.length)],
                master_metadata_album_artist_name: artists[Math.floor(Math.random() * artists.length)],
                master_metadata_album_album_name: albums[Math.floor(Math.random() * albums.length)],
                spotify_track_uri: "spotify:track:randomuri",
            }
        )
    }

    return streams
}