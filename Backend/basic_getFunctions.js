const fs = require('fs')
const SpotifyWebApi = require('spotify-web-api-node');
const axios = require('axios');
const spotifyApi = new SpotifyWebApi();

//GET TOKEN
function getToken() {
    const token = "BQDT9VKkXzg1OYTerjDLh6Y-wAhQx4q9zCpNDcUg6B2_35SxwG3Z6d7pk1FKcj1wdxbZxGJZgCMrs0oTnoZ1TECi65uJaV2hiVNBAigebGVQ9lwaqQ3CkTKS4WDXmLPBsfK-yBfvqQyjaPdiLf_bNXj-1Qk-c-q9C7yijp6ZQVddpwlq8f9YOwPEW4Fq445ihmex1MQnTnTZMyplNWrUSh58pnyDSlaCpX0B-8Qj9PZnAS5_0q7yaFjKp0qCiq0FfzfwYzdKvq_a0msp2qNO5oicfIHgMUTCalVl5Ajs6c7wpmzqGzh0-6rAICz53j337PShdRS0-OI_ZXcitvysYMK8Tw";
return token;
}

const token = getToken();
spotifyApi.setAccessToken(token);

//GET MY PROFILE DATA
function getMyData() {
    (async () => {
      const me = await spotifyApi.getMe();
      //console.log(me.body);
      return me.body;
    })().catch(e => {
      console.error(e);
    });
  }

//GET MY LIKED TRACKS
async function getLikedTracks() {
    const data = await spotifyApi. getMySavedTracks();
    //console.log(data.body.href);
    const config = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      };
    const url = 'https://api.spotify.com/v1/me/tracks?offset=0&limit=30';
    const jsonResponse = await axios.get(url, config);
    const jsonData = jsonResponse.data;
    const trackList = jsonData.items
    //console.log(trackList);

    let trackIds = [];
    for (let track_obj of jsonData.items) {
      trackIds.push(track_obj.track.id);
    }
    //console.log(trackIds)

    return trackList;
  }

  
// GET TRACK AUDIO FEAUTURES
  async function getAudioFeautures(trackid) {
    const url1 = 'https://api.spotify.com/v1/audio-features/'+ trackid;
    const config = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      };
    const jsonResponse1 = await axios.get(url1, config);
    const jsonData1 = jsonResponse1.data;
    console.log(jsonData1);
    return jsonData1;
  }

  //GET PLAYLIST TRACKS
  async function getPlaylistTracks(playlistId, playlistName) {

    const data = await spotifyApi.getPlaylistTracks(playlistId, {
      offset: 1,
      limit: 100,
      fields: 'items'
    })

    let tracks = [];
    var lista = [];
  
    for (let track_obj of data.body.items) {
      const track = track_obj.track
      tracks.push(track);
      lista.push([track.name, track.artists[0].name]);
    }
    console.log(lista);
    return lista;
  }
  
//GET USER PLAYLISTS
async function getUserPlaylists(userName) {
  const data = await spotifyApi.getUserPlaylists(userName)
  let playlists = [];
  var lista = [];

  for (let playlist of data.body.items) {
      //console.log(playlist.name + " " + playlist.id) //calls playlists
      lista.push([playlist.name, playlist.id]);
      //break;
  }
  console.log(lista);
  return lista;
}


//FUNCTION CALLS
  //getUserPlaylists();
  //getPlaylistTracks('357Q0F7H8iK0nB23o5MZKY');

  getLikedTracks()
  //getAudioFeautures('2lLG56qpLP3UbcLuzMvkWX')