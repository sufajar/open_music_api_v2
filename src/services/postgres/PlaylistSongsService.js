const { Pool } = require('pg');
const { nanoid } = require('nanoid');
const InvariantError = require('../../exceptions/InvariantError');
const NotFoundError = require('../../exceptions/NotFoundError');
const AuthorizationError = require('../../exceptions/AuthorizationError');
const { mapDBToPlaylistSongs } = require('../../utils');

class PlaylistSongsService {
  constructor() {
    this._pool = new Pool();
  }

  async addPlaylistSong({ songId, playlistid }) {
    const id = `playlist-${nanoid(16)}`;
    const query = {
      text: 'INSERT INTO playlistsongs VALUES($1, $2, $3) RETURNING id',
      values: [id, songId, playlistid],
    };
    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new InvariantError('Lagu gagal ditambahkan ke playlist');
    }
    return result.rows[0].id;
  }

  async deletePlaylistSongById(playlistId) {
    const query = {
      text: 'DELETE FROM playlistsongs WHERE playlist_id = $1 RETURNING id',
      values: [playlistId],
    };

    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new NotFoundError('Lagu gagal dihapus. SongId tidak ditemukan');
    }
  }

  async getPlaylistSongs(playlistid) {
    const query = {
      text: 'SELECT p.id, s.title, s.performer FROM playlistsongs p LEFT JOIN songs s ON p.song_id = s.id WHERE p.playlist_id = $1 ',
      values: [playlistid],
    };
    const result = await this._pool.query(query);

    //  if (!result.rows.length) {
    //   throw new InvariantError('Playlist gagal diverifikasi');
    // }
    // return result.rows;
    return result.rows.map(mapDBToPlaylistSongs);
  }

  async verifyPlaylistSongsOwner(playlistid, owner) {
    const query = {
      text: 'SELECT p.id, p.playlist_id, p.song_id, y.owner  FROM playlistsongs p LEFT JOIN playlists y ON  p.playlist_id = y.id WHERE p.id = $1',
      values: [playlistid],
    };
    const result = await this._pool.query(query);
    if (!result.rows.length) {
      throw new NotFoundError('Playlist tidak ditemukan');
    }
    const playlistsong = result.rows[0];
    if (playlistsong.owner !== owner) {
      throw new AuthorizationError('Anda tidak berhak mengakses resource ini');
    }
  }
}
module.exports = PlaylistSongsService;
